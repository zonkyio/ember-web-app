'use strict';
const hasTarget = require('../utils/has-target');
const { link } = require('../utils/tag-builder');

module.exports = function favicon(manifest) {
  if (!manifest.icons || !manifest.icons.length) {
    return [];
  }

  return manifest.icons
    .filter((icon) => hasTarget(icon, 'favicon'))
    .map((icon) =>
      link({
        rel: 'icon',
        href: icon.src,
        sizes: icon.sizes,
        type: icon.type,
      })
    );
};
