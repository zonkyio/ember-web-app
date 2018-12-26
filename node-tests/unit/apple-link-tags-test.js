'use strict';

const assert = require('assert');
const appleLinkTags = require('../../lib/apple-link-tags');

describe('Unit: appleLinkTags()', function() {
  it('generates `apple-touch-icon` links from icons with no targets set', function() {
    let config = {
      rootURL: '/qux/',
    };
    let manifest = {
      icons: [
        {
          src: '/foo/bar.png',
          sizes: '180x180',
        },
        {
          src: '/bar/baz.png',
          sizes: '280x280',
        },
      ],
    };

    let expected = [
      '<link rel="apple-touch-icon" href="/qux/foo/bar.png" sizes="180x180">',
      '<link rel="apple-touch-icon" href="/qux/bar/baz.png" sizes="280x280">',
    ];

    assert.deepStrictEqual(appleLinkTags(manifest, config), expected);
  });

  it('excludes icons that are not targeted for apple', function() {
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

    let expected = [
      '<link rel="apple-touch-icon" href="/qux/bar/baz.png" sizes="280x280">',
    ];

    assert.deepStrictEqual(appleLinkTags(manifest, config), expected);
  });

  it('returns empty array when icons is not defined', function() {
    let config = {};
    let manifest = {};
    let expected = [];

    assert.deepStrictEqual(appleLinkTags(manifest, config), expected);
  });

  it('returns empty array when icons is empty', function() {
    let config = {};
    let manifest = {
      icons: [],
    };
    let expected = [];

    assert.deepStrictEqual(appleLinkTags(manifest, config), expected);
  });

  it('does not render sizes attribute when is not defined', function() {
    let config = {
      rootURL: '/',
    };
    let manifest = {
      icons: [
        {
          src: '/foo/bar.png',
        },
      ],
    };

    let expected = ['<link rel="apple-touch-icon" href="/foo/bar.png">'];

    assert.deepStrictEqual(appleLinkTags(manifest, config), expected);
  });

  it('uses an empty string as rootURL if it is undefined', function() {
    let config = {};

    let manifest = {
      icons: [
        {
          src: 'bar.png',
        },
      ],
    };

    let expected = ['<link rel="apple-touch-icon" href="bar.png">'];

    assert.deepStrictEqual(appleLinkTags(manifest, config), expected);
  });

  it('generates icons with precomposed suffix', function() {
    let config = {
      rootURL: '/',
    };

    let manifest = {
      icons: [
        {
          src: '/foo/bar.png',
        },
      ],
      apple: {
        precomposed: true,
      },
    };

    let expected = [
      '<link rel="apple-touch-icon-precomposed" href="/foo/bar.png">',
    ];

    assert.deepStrictEqual(appleLinkTags(manifest, config), expected);
  });

  it('does not generate apple link tags when apple is false', function() {
    let config = {
      rootURL: '/',
    };

    let manifest = {
      icons: [
        {
          src: '/foo/bar.png',
        },
      ],
      apple: false,
    };

    let expected = [];

    assert.deepStrictEqual(appleLinkTags(manifest, config), expected);
  });

  it('respects absolute urls', function() {
    let config = {
      rootURL: '/qux/',
    };
    let manifest = {
      icons: [
        {
          src: 'http://www.example.com/foo/bar.png',
        },
        {
          src: 'https://www.example.com/bar/baz.png',
        },
      ],
    };

    let expected = [
      '<link rel="apple-touch-icon" href="http://www.example.com/foo/bar.png">',
      '<link rel="apple-touch-icon" href="https://www.example.com/bar/baz.png">',
    ];

    assert.deepStrictEqual(appleLinkTags(manifest, config), expected);
  });
});
