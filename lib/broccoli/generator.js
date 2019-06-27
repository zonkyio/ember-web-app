'use strict';
const CachingWriter = require('broccoli-caching-writer');
const fuzzyPurgeRequireEntry = require('../utils/fuzzy-purge-require-entry');

module.exports = class Generator extends CachingWriter {
  constructor(inputNode, { manifest }) {
    super([inputNode], { annotation: `generate ${manifest.name}` });
    this.manifest = manifest;
  }

  build() {
    fuzzyPurgeRequireEntry(this.manifest.configurationPath);
    this.manifest.build({ directory: this.outputPath });
  }
};
