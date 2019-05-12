'use strict';

const path = require('path');
const getManifestConfiguration = require('./lib/get-manifest-configuration');
const BroccoliMergeTrees = require('broccoli-merge-trees');
const Manifest = require('./lib/manifest');
const Browserconfig = require('./lib/browserconfig');

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

    this._configureFingerprint();
    this.manifestConfiguration = getManifestConfiguration(
      this.app.project,
      this.app.env
    );

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

  contentFor(section, config) {
    if (section === 'head') {
      let tags = [];

      tags = tags.concat(
        require('./lib/android-link-tags')(this.manifestConfiguration, config)
      );
      tags = tags.concat(
        require('./lib/apple-link-tags')(this.manifestConfiguration)
      );
      tags = tags.concat(
        require('./lib/safari-pinned-tab-tags')(this.manifestConfiguration)
      );
      tags = tags.concat(
        require('./lib/favicon-link-tags')(this.manifestConfiguration)
      );

      tags = tags.concat(
        require('./lib/android-meta-tags')(this.manifestConfiguration, config)
      );
      tags = tags.concat(
        require('./lib/apple-meta-tags')(this.manifestConfiguration, config)
      );
      tags = tags.concat(
        require('./lib/ms-meta-tags')(this.manifestConfiguration, config)
      );

      return tags.join('\n');
    }
  },

  _configureFingerprint() {
    let configureFingerprint = require('./lib/configure-fingerprint');

    this.app.options.fingerprint = configureFingerprint(
      this.app.options.fingerprint,
      this.manifest.name
    );

    this.app.options.fingerprint = configureFingerprint(
      this.app.options.fingerprint,
      this.browserconfig.name
    );
  },
};
