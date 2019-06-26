'use strict';
const assert = require('assert');
const favicon = require('../../../lib/tags/favicon');

describe('Unit', function() {
  describe('tags', function() {
    describe('favicon', function() {
      it('excludes icons that are not targeted for favicon', function() {
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

        assert.deepStrictEqual(favicon(manifest), []);
      });

      it('returns empty array when icons is not defined', function() {
        let manifest = {};

        assert.deepStrictEqual(favicon(manifest), []);
      });

      it('returns empty array when icons is empty', function() {
        let manifest = {
          icons: [],
        };

        assert.deepStrictEqual(favicon(manifest), []);
      });

      it('does not render sizes attribute when is not defined', function() {
        let manifest = {
          icons: [
            {
              src: '/foo/bar.png',
              targets: ['favicon'],
            },
          ],
        };

        assert.deepStrictEqual(favicon(manifest), [
          '<link rel="icon" href="/foo/bar.png">',
        ]);
      });

      it('renders sizes attribute when it is defined', function() {
        let manifest = {
          icons: [
            {
              src: '/foo/bar.png',
              sizes: '16x16',
              targets: ['favicon'],
            },
          ],
        };

        assert.deepStrictEqual(favicon(manifest), [
          '<link rel="icon" href="/foo/bar.png" sizes="16x16">',
        ]);
      });

      it('does not render type attribute when is not defined', function() {
        let manifest = {
          icons: [
            {
              src: '/foo/bar.png',
              targets: ['favicon'],
            },
          ],
        };

        assert.deepStrictEqual(favicon(manifest), [
          '<link rel="icon" href="/foo/bar.png">',
        ]);
      });

      it('renders type attribute when it is defined', function() {
        let manifest = {
          icons: [
            {
              src: '/foo/bar.png',
              type: 'image/png',
              targets: ['favicon'],
            },
          ],
        };

        assert.deepStrictEqual(favicon(manifest), [
          '<link rel="icon" href="/foo/bar.png" type="image/png">',
        ]);
      });
    });
  });
});
