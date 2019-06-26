'use strict';

const path = require('path');
const BroccoliMergeTrees = require('broccoli-merge-trees');
const Manifest = require('./lib/manifest');
const Browserconfig = require('./lib/browserconfig');
const tags = require('./lib/tags');

module.exports = {
  name: require('./package').name,

  shouldIncludeChildAddon(childAddon) {
    if (childAddon.name === 'broccoli-asset-rev') {
      return false;
    }

    return this._super.shouldIncludeChildAddon.apply(this, arguments);
  },

  included(app) {
    this.app = app;
    app.options = app.options || {};
    app.options[this.name] = app.options[this.name] || {};

    this.manifest = new Manifest(app);
    this.browserconfig = new Browserconfig(app);

    this.manifest.configureFingerprint();
    this.browserconfig.configureFingerprint();

    this._super.included.apply(this, arguments);
  },

  treeForPublic() {
    const configPath = path.join(this.app.project.root, 'config');

    const GenerateManifest = require('./lib/broccoli/generate-manifest-json');
    const manifest = new GenerateManifest(configPath, {
      manifest: this.manifest,
      project: this.app.project,
      env: this.app.env,
      ui: this.ui,
    });

    const GenerateBrowserconfig = require('./lib/broccoli/generate-browserconfig-xml');
    const browserconfig = new GenerateBrowserconfig(configPath, {
      browserconfig: this.browserconfig,
      project: this.app.project,
      env: this.app.env,
      ui: this.ui,
    });

    return new BroccoliMergeTrees([manifest, browserconfig]);
  },

  contentFor(section) {
    if (section === 'head') {
      return tags(this.manifest.configuration);
    }
  },
};
