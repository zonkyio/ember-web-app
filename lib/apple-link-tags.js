'use strict';

module.exports = appleLinkTags;

let hasTarget = require('./has-target');

function appleLinkTags(manifest) {
  if (manifest.apple === false) {
    return [];
  }

  let links = [];
  let sizes;

  let precomposed;

  if (manifest.apple && manifest.apple.precomposed) {
    precomposed = '-precomposed';
  } else {
    precomposed = '';
  }

  if (manifest.icons && manifest.icons.length) {
    for (let icon of manifest.icons) {
      if (!icon.targets || hasTarget(icon, 'apple')) {
        if (icon.sizes) {
          sizes = ` sizes="${icon.sizes}"`;
        } else {
          sizes = '';
        }

        const url = icon.src;

        links.push(
          `<link rel="apple-touch-icon${precomposed}" href="${url}"${sizes}>`
        );
      }
    }
  }

  return links;
}
