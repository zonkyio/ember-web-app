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

  afterInstall() {
    let index = path.join('app', 'index.html');
    let content = `${EOL}    ${Manifest.tag}${EOL}    ${Browserconfig.tag}`;
    let after = `{{content-for "head"}}${EOL}`;

    return this.insertIntoFile(index, content, { after });
  },
};
