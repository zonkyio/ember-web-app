'use strict';

module.exports = safariPinnedTabTags;

const hasTarget = require('./has-target');

function safariPinnedTabTags(manifest) {
  const links = [];

  if (manifest.icons && manifest.icons.length) {
    for (let icon of manifest.icons) {
      if (hasTarget(icon, 'safari-pinned-tab')) {
        let color = '';
        if (icon.safariPinnedTabColor) {
          color = ` color="${icon.safariPinnedTabColor}"`;
        }

        const url = icon.src;

        links.push(`<link rel="mask-icon" href="${url}"${color}>`);
      }
    }
  }

  return links;
}
