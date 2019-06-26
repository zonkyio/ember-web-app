'use strict';
const assert = require('assert');
const Manifest = require('../../../lib/manifest');

class TestManifest extends Manifest {
  constructor(configuration) {
    super({}, { ui: { writeWarnLine() {} } });
    this._configuration = configuration;
  }

  get configuration() {
    return this._configuration;
  }
}

describe('Unit', function() {
  describe('manifest', function() {
    describe('generate()', function() {
      it('filters custom "apple" property', function() {
        let manifest = new TestManifest({
          apple: 'apple',
        });

        assert.strictEqual(manifest.generate(), '{}\n');
      });

      it('filters custom "ms" property', function() {
        let manifest = new TestManifest({
          ms: 'ms',
        });

        assert.strictEqual(manifest.generate(), '{}\n');
      });

      it('returns manifest properties', function() {
        let manifest = new TestManifest({
          foo: 'bar',
        });

        assert.strictEqual(manifest.generate(), '{"foo":"bar"}\n');
      });

      it('includes icons with no target definition', function() {
        let manifest = new TestManifest({
          icons: [
            {
              src: 'foo/bar.png',
              sizes: '120x120',
              type: 'image/png',
            },
          ],
        });

        assert.strictEqual(
          manifest.generate(),
          '{"icons":[{"src":"foo/bar.png","sizes":"120x120","type":"image/png"}]}\n'
        );
      });

      it('filters icons that has a different target than manifest', function() {
        let manifest = new TestManifest({
          icons: [
            {
              src: 'foo/bar.png',
              sizes: '120x120',
              type: 'image/png',
              targets: ['apple'],
            },
            {
              src: 'baz/qux.png',
              sizes: '120x120',
              type: 'image/png',
              targets: ['manifest'],
            },
          ],
        });

        assert.strictEqual(
          manifest.generate(),
          '{"icons":[{"src":"baz/qux.png","sizes":"120x120","type":"image/png"}]}\n'
        );
      });
    });
  });
});
