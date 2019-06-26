'use strict';
const hasTarget = require('../utils/has-target');
const { link, meta } = require('../utils/tag-builder');

module.exports = function apple(manifest) {
  let tags = [];

  if (manifest.apple === false) {
    return tags;
  }

  return tags.concat(links(manifest), metas(manifest));
};

function links(manifest) {
  let tags = [];

  let precomposed = '';
  if (manifest.apple && manifest.apple.precomposed) {
    precomposed = '-precomposed';
  }

  if (manifest.icons && manifest.icons.length) {
    for (let icon of manifest.icons) {
      if (!icon.targets || hasTarget(icon, 'apple')) {
        tags.push(
          link({
            rel: `apple-touch-icon${precomposed}`,
            href: icon.src,
            sizes: icon.sizes,
          })
        );
      }

      if (hasTarget(icon, 'safari-pinned-tab')) {
        tags.push(
          link({
            rel: 'mask-icon',
            href: icon.src,
            color: icon.safariPinnedTabColor,
          })
        );
      }
    }
  }

  return tags;
}

function metas(manifest) {
  let tags = [];

  let webAppCapable = manifest.apple && manifest.apple.webAppCapable;
  let standalone = ['fullscreen', 'standalone'].includes(manifest.display);

  if ((standalone && webAppCapable !== false) || webAppCapable === true) {
    tags.push(meta({ name: 'apple-mobile-web-app-capable', content: 'yes' }));
  }

  if (manifest.name) {
    tags.push(
      meta({ name: 'apple-mobile-web-app-title', content: manifest.name })
    );
  }

  tags.push(
    meta({
      name: 'apple-mobile-web-app-status-bar-style',
      content:
        manifest.apple && manifest.apple.statusBarStyle
          ? manifest.apple.statusBarStyle
          : 'default',
    })
  );

  if (manifest.apple && manifest.apple.formatDetection) {
    let detection = manifest.apple.formatDetection;
    let content = '';

    if (detection.telephone === false) {
      content += 'telephone=no';
    }

    if (content) {
      tags.push(meta({ name: 'format-detection', content }));
    }
  }

  return tags;
}
