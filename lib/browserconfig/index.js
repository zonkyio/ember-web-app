'use strict';
const BaseManifest = require('../base-manifest');

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
};
