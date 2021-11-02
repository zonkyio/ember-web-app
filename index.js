'use strict';
const BroccoliMergeTrees = require('broccoli-merge-trees');
const Manifest = require('./lib/manifest');
const Browserconfig = require('./lib/browserconfig');
const tags = require('./lib/tags');
const pkg = require('./package');

module.exports = {
  name: pkg.name,

  shouldIncludeChildAddon(childAddon) {
    if (childAddon.name === 'broccoli-asset-rev') {
      return false;
    }

    return this._super.shouldIncludeChildAddon.apply(this, arguments);
  },

  included(app) {
    this.app = app;
  },

  treeForPublic() {
    if (!this.manifest) {
      return this._treeForManifest(this.app);
    }
  },

  _treeForManifest(app) {
    app.options = app.options || {};
    app.options[this.name] = app.options[this.name] || {};

    this.manifest = new Manifest(app, { ui: this.ui });
    this.browserconfig = new Browserconfig(app);

    this.manifest.configureFingerprint();
    this.browserconfig.configureFingerprint();

    return new BroccoliMergeTrees([
      this.manifest.toTree(),
      this.browserconfig.toTree(),
    ]);
  },

  contentFor(section) {
    if (this.manifest && section === 'head') {
      return tags(this.manifest.configuration);
    }
  },
};

module.exports.treeForManifest = function treeForManifest(app) {
  return app.project.findAddonByName(pkg.name)._treeForManifest(app);
};
