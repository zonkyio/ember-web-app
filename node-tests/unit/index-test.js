'use strict';

const assert = require('assert');
const pristineIndex = require('../../index');

function createIndex() {
  return Object.assign({}, pristineIndex, {
    manifestConfiguration: {
      display: 'standalone',
    },
    addonBuildConfig: {},
  });
}

describe('Unit: index', function() {
  describe('contentFor()', function() {
    it('returns empty when section is other than "head"', function() {
      let index = createIndex();

      assert.strictEqual(
        index.contentFor('head-footer', { rootURL: '/' }),
        undefined
      );
    });

    it('returns apple meta tags', function() {
      let expected = '<meta name="apple-mobile-web-app-capable" content="yes">';
      let index = createIndex();

      assert.ok(index.contentFor('head', { rootURL: '/' }).includes(expected));
    });

    it('returns apple link tags', function() {
      let expected =
        '<link rel="apple-touch-icon" href="/foo/bar.png" sizes="180x180">';
      let index = createIndex();

      index.manifestConfiguration = {
        icons: [
          {
            src: '/foo/bar.png',
            sizes: '180x180',
          },
        ],
      };

      assert.ok(index.contentFor('head', { rootURL: '/' }).includes(expected));
    });

    it('returns safari pinned tab link tags', function() {
      let expected = '<link rel="mask-icon" href="/foo/bar.svg" color="red">';
      let index = createIndex();

      index.manifestConfiguration = {
        icons: [
          {
            src: '/foo/bar.svg',
            safariPinnedTabColor: 'red',
            targets: ['safari-pinned-tab'],
          },
        ],
      };

      assert.ok(index.contentFor('head', { rootURL: '/' }).includes(expected));
    });
  });
});
