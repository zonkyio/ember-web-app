'use strict';

const assert = require('assert');
const safariPinnedTabTags = require('../../lib/safari-pinned-tab-tags');

describe('Unit: safariPinnedTabs()', function() {
  it('excludes icons that are not targeted for pinned tabs', function() {
    let config = {
      rootURL: '/qux/',
    };
    let manifest = {
      icons: [
        {
          src: '/foo/bar.png',
          sizes: '180x180',
          targets: ['manifest'],
        },
        {
          src: '/bar/baz.png',
          sizes: '280x280',
        },
      ],
    };

    let expected = [];

    assert.deepStrictEqual(safariPinnedTabTags(manifest, config), expected);
  });

  it('returns empty array when icons is not defined', function() {
    let config = {};
    let manifest = {};
    let expected = [];

    assert.deepStrictEqual(safariPinnedTabTags(manifest, config), expected);
  });

  it('returns empty array when icons is empty', function() {
    let config = {};
    let manifest = {
      icons: [],
    };
    let expected = [];

    assert.deepStrictEqual(safariPinnedTabTags(manifest, config), expected);
  });

  it('renders color attribute', function() {
    let config = {
      rootURL: '/',
    };
    let manifest = {
      icons: [
        {
          src: '/foo/bar.svg',
          targets: ['safari-pinned-tab'],
          safariPinnedTabColor: '#abc',
        },
      ],
    };

    let expected = ['<link rel="mask-icon" href="/foo/bar.svg" color="#abc">'];

    assert.deepStrictEqual(safariPinnedTabTags(manifest, config), expected);
  });

  it('uses an empty string as rootURL if it is undefined', function() {
    let config = {};

    let manifest = {
      icons: [
        {
          src: 'bar.svg',
          targets: ['safari-pinned-tab'],
        },
      ],
    };

    let expected = ['<link rel="mask-icon" href="bar.svg">'];

    assert.deepStrictEqual(safariPinnedTabTags(manifest, config), expected);
  });

  it('respects absolute urls', function() {
    let config = {
      rootURL: '/qux/',
    };
    let manifest = {
      icons: [
        {
          src: 'http://www.example.com/foo/bar.svg',
          targets: ['safari-pinned-tab'],
        },
        {
          src: 'https://www.example.com/bar/baz.svg',
          targets: ['safari-pinned-tab'],
        },
      ],
    };

    let expected = [
      '<link rel="mask-icon" href="http://www.example.com/foo/bar.svg">',
      '<link rel="mask-icon" href="https://www.example.com/bar/baz.svg">',
    ];

    assert.deepStrictEqual(safariPinnedTabTags(manifest, config), expected);
  });
});
