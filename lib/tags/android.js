'use strict';
const { meta } = require('../utils/tag-builder');

module.exports = function android(manifest) {
  let tags = [];

  if (manifest.theme_color) {
    tags.push(meta({ name: 'theme-color', content: manifest.theme_color }));
  }

  return tags;
};
