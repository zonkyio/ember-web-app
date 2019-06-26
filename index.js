'use strict';
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

    this.manifest = new Manifest(app, { ui: this.ui });
    this.browserconfig = new Browserconfig(app);

    this.manifest.configureFingerprint();
    this.browserconfig.configureFingerprint();

    this._super.included.apply(this, arguments);
  },

  treeForPublic() {
    let manifest = this.manifest.toTree();
    let browserconfig = this.browserconfig.toTree();

    return new BroccoliMergeTrees([manifest, browserconfig]);
  },

  contentFor(section) {
    if (section === 'head') {
      return tags(this.manifest.configuration);
    }
  },
};
