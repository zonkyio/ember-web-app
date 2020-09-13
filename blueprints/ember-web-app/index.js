'use strict';
const { EOL } = require('os');
const path = require('path');
const Manifest = require('../../lib/manifest');
const Browserconfig = require('../../lib/browserconfig');

module.exports = {
  description: 'Generates a configuration for web app manifest.',

  normalizeEntityName() {},

  locals(options) {
    return {
      name: options.project.name(),
    };
  },

  fileMapTokens() {
    const absPath = this.project.configPath();
    // Convert to relative path as it's more useful when logged to console
    const configPath = path
      .dirname(absPath)
      .slice(this.project.root.length + 1);

    return {
      __config__() {
        return configPath;
      },
    };
  },

  afterInstall() {
    let index = path.join('app', 'index.html');
    let content = `${EOL}    ${Manifest.tag}${EOL}    ${Browserconfig.tag}`;
    let after = `{{content-for "head"}}${EOL}`;

    return this.insertIntoFile(index, content, { after });
  },
};
