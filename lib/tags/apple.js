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

  if (!manifest.icons || !manifest.icons.length) {
    return tags;
  }

  return tags.concat(icons(manifest), mask(manifest));
}

function icons(manifest) {
  let precomposed =
    manifest.apple && manifest.apple.precomposed ? '-precomposed' : '';

  return manifest.icons
    .filter((icon) => !icon.targets || hasTarget(icon, 'apple'))
    .map((icon) =>
      link({
        rel: `apple-touch-icon${precomposed}`,
        href: icon.src,
        sizes: icon.sizes,
      })
    );
}

function mask(manifest) {
  return manifest.icons
    .filter((icon) => hasTarget(icon, 'safari-pinned-tab'))
    .map((icon) =>
      link({
        rel: 'mask-icon',
        href: icon.src,
        color: icon.safariPinnedTabColor,
      })
    );
}

function metas(manifest) {
  let tags = [];

  capability(manifest, tags);
  title(manifest, tags);
  statusBarStyle(manifest, tags);
  formatDetection(manifest, tags);

  return tags;
}

function capability(manifest, tags) {
  let webAppCapable = manifest.apple && manifest.apple.webAppCapable;
  let standalone = ['fullscreen', 'standalone'].includes(manifest.display);

  if ((standalone && webAppCapable !== false) || webAppCapable === true) {
    tags.push(meta({ name: 'apple-mobile-web-app-capable', content: 'yes' }));
  }
}

function title(manifest, tags) {
  if (manifest.name) {
    tags.push(
      meta({ name: 'apple-mobile-web-app-title', content: manifest.name })
    );
  }
}

function statusBarStyle(manifest, tags) {
  tags.push(
    meta({
      name: 'apple-mobile-web-app-status-bar-style',
      content:
        manifest.apple && manifest.apple.statusBarStyle
          ? manifest.apple.statusBarStyle
          : 'default',
    })
  );
}

function formatDetection(manifest, tags) {
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
}
