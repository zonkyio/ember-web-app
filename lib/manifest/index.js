'use strict';
const BaseManifest = require('../base-manifest');

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

  constructor(app) {
    super(app, { name: Manifest.name, selector: Manifest.selector });
  }
};
