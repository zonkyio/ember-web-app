'use strict';
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

module.exports = class BaseManifest {
  constructor(app, { name, selector }) {
    this.app = app;
    this.name = name;
    this.selector = selector;
  }

  get indexPath() {
    let configPath = this.app.project.configPath();
    return path.join(configPath, '..', '..', 'app', 'index.html');
  }

  get element() {
    let content = fs.readFileSync(this.indexPath, 'utf8');
    let dom = new JSDOM(content);
    return dom.window.document.querySelector(this.selector);
  }

  get isRequired() {
    return this.element !== null;
  }
};
