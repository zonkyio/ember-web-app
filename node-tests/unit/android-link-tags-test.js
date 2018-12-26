'use strict';

const assert = require('assert');
const androidLinkTags = require('../../lib/android-link-tags');

describe('Unit: androidLinkTags()', function() {
  it('returns `manifest` link', function() {
    let config = {};
    let expected = ['<link rel="manifest" href="manifest.webmanifest">'];

    assert.deepStrictEqual(
      androidLinkTags(config, 'manifest.webmanifest'),
      expected
    );
  });

  it('uses rootURL if defined', function() {
    let config = {
      rootURL: '/foo/bar/',
    };
    let expected = [
      '<link rel="manifest" href="/foo/bar/manifest.webmanifest">',
    ];

    assert.deepStrictEqual(
      androidLinkTags(config, 'manifest.webmanifest'),
      expected
    );
  });
});
