'use strict';

module.exports = faviconLinkTags;

const hasTarget = require('./has-target');

function faviconLinkTags(manifest) {
  const links = [];

  if (manifest.icons && manifest.icons.length) {
    for (let icon of manifest.icons) {
      if (hasTarget(icon, 'favicon')) {
        let sizes = '';
        if (icon.sizes) {
          sizes = ` sizes="${icon.sizes}"`;
        }

        let type = '';
        if (icon.type) {
          type = ` type="${icon.type}"`;
        }

        const url = icon.src;

        links.push(`<link rel="icon" href="${url}"${sizes}${type}>`);
      }
    }
  }

  return links;
}
