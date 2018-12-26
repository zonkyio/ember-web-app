'use strict';

module.exports = androidLinkTags;

function androidLinkTags(config, manifestName) {
  let resolveURL = require('./resolve-url');
  let resolveRootURL = require('./resolve-root-url');

  let rootURL = resolveRootURL(config);
  let url = resolveURL(rootURL, manifestName);

  return [
    `<link rel="manifest" href="${url}">`
  ];
}
