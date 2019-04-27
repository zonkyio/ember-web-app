'use strict';

module.exports = androidLinkTags;

function androidLinkTags(config, addonConfig, manifestName) {
  let resolveURL = require('./resolve-url');
  let resolveRootURL = require('./resolve-root-url');

  let rootURL = resolveRootURL(config);
  let url = resolveURL(rootURL, manifestName);

  let crossorigin = '';
  if (addonConfig.crossorigin) {
    crossorigin = ` crossorigin="${addonConfig.crossorigin}"`;
  }

  return [`<link rel="manifest" href="${url}"${crossorigin}>`];
}
