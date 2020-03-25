'use strict';
const validate = require('web-app-manifest-validator');
const BaseManifest = require('../base-manifest');
const hasTarget = require('../utils/has-target');

module.exports = class Manifest extends BaseManifest {
  static get name() {
    return 'manifest.webmanifest';
  }

  static get selector() {
    return 'link[rel="manifest"]';
  }

  static get tag() {
    return '<link rel="manifest" href="{{rootURL}}manifest.webmanifest">';
  }

  constructor(app, { ui }) {
    super(app, { name: Manifest.name, selector: Manifest.selector });
    this.ui = ui;
  }

  generate() {
    let manifest = {};

    this.copy(manifest, this.configuration);
    this.validate(manifest);

    let content = JSON.stringify(manifest);
    return `${content}\n`;
  }

  copy(manifest, configuration) {
    Object.keys(configuration)
      .filter((key) => key !== 'apple' && key !== 'ms')
      .forEach((key) => {
        if (key === 'icons') {
          this.icons(manifest, configuration);
        } else {
          manifest[key] = configuration[key];
        }
      });
  }

  icons(manifest, configuration) {
    manifest.icons = configuration.icons
      .filter((icon) => !icon.targets || hasTarget(icon, 'manifest'))
      .map((icon) => {
        let copy = Object.assign({}, icon);
        delete copy.targets;
        return copy;
      });
  }

  validate(manifest) {
    validate(manifest).forEach((error) =>
      this.ui.writeWarnLine(`${this.name} validation: ${error}`)
    );
  }
};
