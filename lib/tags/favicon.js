'use strict';
const hasTarget = require('../utils/has-target');
const { link } = require('../utils/tag-builder');

module.exports = function favicon(manifest) {
  let tags = [];

  if (manifest.icons && manifest.icons.length) {
    for (let icon of manifest.icons) {
      if (hasTarget(icon, 'favicon')) {
        tags.push(
          link({
            rel: 'icon',
            href: icon.src,
            sizes: icon.sizes,
            type: icon.type,
          })
        );
      }
    }
  }

  return tags;
};
