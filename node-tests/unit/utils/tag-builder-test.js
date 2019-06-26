'use strict';
const assert = require('assert');
const { link, meta } = require('../../../lib/utils/tag-builder');

describe('Unit', function() {
  describe('utils', function() {
    describe('tag-builder', function() {
      describe('link', function() {
        it('builds empty `link` tag', function() {
          let attributes = {};

          assert.strictEqual(link(attributes), '<link>');
        });

        it('builds `link` tag with attributes', function() {
          let attributes = { rel: 'icon', href: 'foo.png' };

          assert.strictEqual(
            link(attributes),
            '<link rel="icon" href="foo.png">'
          );
        });

        it('builds `link` tag with attributes and skips falsy', function() {
          let attributes = { rel: 'icon', href: 'foo.png', sizes: '' };

          assert.strictEqual(
            link(attributes),
            '<link rel="icon" href="foo.png">'
          );
        });
      });

      describe('meta', function() {
        it('builds empty `meta` tag', function() {
          let attributes = {};

          assert.strictEqual(meta(attributes), '<meta>');
        });

        it('builds `meta` tag with attributes', function() {
          let attributes = { name: 'icon', content: 'foo.png' };

          assert.strictEqual(
            meta(attributes),
            '<meta name="icon" content="foo.png">'
          );
        });

        it('builds `meta` tag with attributes and skips falsy', function() {
          let attributes = { name: 'icon', content: 'foo.png', sizes: '' };

          assert.strictEqual(
            meta(attributes),
            '<meta name="icon" content="foo.png">'
          );
        });
      });
    });
  });
});
