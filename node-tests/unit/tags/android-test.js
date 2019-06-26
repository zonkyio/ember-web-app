'use strict';
const assert = require('assert');
const android = require('../../../lib/tags/android');

describe('Unit', function() {
  describe('tags', function() {
    describe('android', function() {
      it('returns `theme-color` meta tag when it is defined', function() {
        let manifest = {
          theme_color: '#ff0000',
        };

        assert.deepStrictEqual(android(manifest), [
          '<meta name="theme-color" content="#ff0000">',
        ]);
      });

      it('returns empty array when `theme-color` is not defined', function() {
        let manifest = {};

        assert.deepStrictEqual(android(manifest), []);
      });
    });
  });
});
