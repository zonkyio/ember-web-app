'use strict';

var assert = require('assert');
var androidLinkTags = require('../../lib/android-link-tags');

describe('Unit: androidLinkTags()', function() {
  it('returns `manifest` link', function() {
    var config = {};
    var expected = [
      '<link rel="manifest" href="manifest.webmanifest">'
    ];

    assert.deepStrictEqual(androidLinkTags(config, 'manifest.webmanifest'), expected);
  });

  it('uses rootURL if defined', function() {
    var config = {
      rootURL: '/foo/bar/'
    };
    var expected = [
      '<link rel="manifest" href="/foo/bar/manifest.webmanifest">'
    ];

    assert.deepStrictEqual(androidLinkTags(config, 'manifest.webmanifest'), expected);
  });
});
