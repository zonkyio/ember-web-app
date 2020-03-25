'use strict';
const assert = require('assert');
const pristineIndex = require('../../index');

function createIndex() {
  return Object.assign({}, pristineIndex, {
    manifest: {
      configuration: {
        display: 'standalone',
      },
    },
    addonBuildConfig: {},
  });
}

describe('Unit', function () {
  describe('index', function () {
    describe('contentFor()', function () {
      it('returns empty when section is other than "head"', function () {
        let index = createIndex();

        assert.strictEqual(index.contentFor('head-footer'), undefined);
      });

      it('returns apple meta tags', function () {
        let index = createIndex();

        assert.ok(
          index
            .contentFor('head')
            .includes(
              '<meta name="apple-mobile-web-app-capable" content="yes">'
            )
        );
      });

      it('returns apple link tags', function () {
        let index = createIndex();

        index.manifest.configuration = {
          icons: [
            {
              src: '/foo/bar.png',
              sizes: '180x180',
            },
          ],
        };

        assert.ok(
          index
            .contentFor('head')
            .includes(
              '<link rel="apple-touch-icon" href="/foo/bar.png" sizes="180x180">'
            )
        );
      });

      it('returns safari pinned tab link tags', function () {
        let index = createIndex();

        index.manifest.configuration = {
          icons: [
            {
              src: '/foo/bar.svg',
              safariPinnedTabColor: 'red',
              targets: ['safari-pinned-tab'],
            },
          ],
        };

        assert.ok(
          index
            .contentFor('head')
            .includes('<link rel="mask-icon" href="/foo/bar.svg" color="red">')
        );
      });
    });
  });
});
