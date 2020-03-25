'use strict';
const xmlbuilder = require('xmlbuilder');
const BaseManifest = require('../base-manifest');
const hasTarget = require('../utils/has-target');

const ALLOWED_ICON_ELEMENTS = [
  'square70x70logo',
  'square150x150logo',
  'wide310x150logo',
  'square310x310logo',
];

module.exports = class Browserconfig extends BaseManifest {
  static get name() {
    return 'browserconfig.xml';
  }

  static get selector() {
    return 'meta[name="msapplication-config"]';
  }

  static get tag() {
    return '<meta name="msapplication-config" content="{{rootURL}}browserconfig.xml">';
  }

  constructor(app) {
    super(app, { name: Browserconfig.name, selector: Browserconfig.selector });
  }

  generate() {
    let manifest = {
      browserconfig: {
        msapplication: {},
      },
    };

    this.tile(manifest, this.configuration);
    return xmlbuilder.create(manifest).end();
  }

  tile(manifest, configuration) {
    if (!configuration.icons) {
      return;
    }

    let icons = configuration.icons.filter((icon) => hasTarget(icon, 'ms'));

    if (!icons.length) {
      return;
    }

    if (!configuration.ms || !configuration.ms.tileColor) {
      throw new Error(
        `Property 'ms.tileColor' missing to generate ${this.name}`
      );
    }

    manifest.browserconfig.msapplication.tile = {};

    this.icons(manifest, icons);
    this.color(manifest, configuration.ms.tileColor);
  }

  icons(manifest, icons) {
    icons.forEach((icon) => {
      if (!ALLOWED_ICON_ELEMENTS.includes(icon.element)) {
        throw new Error(
          `The 'element' property of the icon for ${
            this.name
          } must be one of ${ALLOWED_ICON_ELEMENTS.join(', ')}`
        );
      }

      manifest.browserconfig.msapplication.tile[icon.element] = {
        '@src': icon.src,
      };
    });
  }

  color(manifest, color) {
    manifest.browserconfig.msapplication.tile.TileColor = {
      '#text': color,
    };
  }
};
