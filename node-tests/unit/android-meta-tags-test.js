'use strict';

const assert = require('assert');
const androidMetaTags = require('../../lib/android-meta-tags');

describe('Unit: androidMetaTags()', function() {
  it('returns `theme-color` meta tag when it is defined', function() {
    let manifest = {
      theme_color: '#ff0000',
    };
    let expected = ['<meta name="theme-color" content="#ff0000">'];

    assert.deepStrictEqual(androidMetaTags(manifest), expected);
  });

  it('resturns empty array when `theme-color` is not defined', function() {
    let manifest = {};
    let expected = [];

    assert.deepStrictEqual(androidMetaTags(manifest), expected);
  });
});
