'use strict';

module.exports = appleLinkTags;

let hasTarget = require('./has-target');
let resolveURL = require('./resolve-url');
let resolveRootURL = require('./resolve-root-url');

function appleLinkTags(manifest, config) {
  if (manifest.apple === false) {
    return [];
  }

  let links = [];
  let sizes;
  let rootURL = resolveRootURL(config);

  let precomposed;

  if(manifest.apple && manifest.apple.precomposed) {
    precomposed = '-precomposed';
  } else {
    precomposed = '';
  }

  if (manifest.icons && manifest.icons.length) {
    for(let icon of manifest.icons) {
      if (!icon.targets || hasTarget(icon, 'apple')) {
        if (icon.sizes) {
          sizes = ` sizes="${icon.sizes}"`
        } else {
          sizes = '';
        }

        const url = resolveURL(rootURL, icon.src);

        links.push(`<link rel="apple-touch-icon${precomposed}" href="${url}"${sizes}>`);
      }
    }
  }

  return links;
}
