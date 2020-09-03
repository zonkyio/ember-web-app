'use strict';
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const Generator = require('./broccoli/generator');

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

  get configurationPath() {
    return path.join(
      path.dirname(this.app.project.configPath()),
      'manifest.js'
    );
  }

  get configuration() {
    try {
      let { env, project } = this.app;
      let config = project.config(env);
      return project.require(this.configurationPath)(env, config);
    } catch (e) {
      return {};
    }
  }

  configureFingerprint() {
    if (!this.isRequired || this.app.options.fingerprint === false) {
      return;
    }

    this.app.options.fingerprint = this.app.options.fingerprint || {};

    let defaultOptions = require('broccoli-asset-rev/lib/default-options');
    let replaceExtensions =
      this.app.options.fingerprint.replaceExtensions ||
      defaultOptions.replaceExtensions;
    let extension = path.extname(this.name).substring(1);

    this.app.options.fingerprint.replaceExtensions = replaceExtensions.concat([
      extension,
    ]);
  }

  build({ directory }) {
    if (!this.isRequired) {
      return;
    }

    let outputPath = path.join(directory, this.name);
    let content = this.generate();

    fs.writeFileSync(outputPath, content);
  }

  generate() {
    throw new Error('not implemented');
  }

  toTree() {
    let configPath = path.dirname(this.configurationPath);
    return new Generator(configPath, { manifest: this });
  }
};
