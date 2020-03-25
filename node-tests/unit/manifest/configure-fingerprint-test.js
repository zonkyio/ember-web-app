'use strict';
const assert = require('assert');
const Manifest = require('../../../lib/manifest');

class TestManifest extends Manifest {
  constructor(app, required = true) {
    super(app, {});
    this.required = required;
  }

  get isRequired() {
    return this.required;
  }
}

describe('Unit', function () {
  describe('manifest', function () {
    describe('configureFingerprint()', function () {
      it('does nothing when is not required', function () {
        let manifest = new TestManifest({ options: {} }, false);
        manifest.configureFingerprint();

        assert.deepStrictEqual(manifest.app.options.fingerprint, undefined);
      });

      it('does nothing when fingerprinting is disabled', function () {
        let manifest = new TestManifest({ options: { fingerprint: false } });
        manifest.configureFingerprint();

        assert.strictEqual(manifest.app.options.fingerprint, false);
      });

      it('configures when options is undefined', function () {
        let manifest = new TestManifest({
          options: { fingerprint: undefined },
        });
        manifest.configureFingerprint();

        assert.deepStrictEqual(manifest.app.options.fingerprint, {
          replaceExtensions: ['html', 'css', 'js', 'webmanifest'],
        });
      });

      it('updates options', function () {
        let fingerprint = {
          prepend: 'prefix',
          exclude: ['foo', 'bar'],
          replaceExtensions: ['baz'],
        };

        let manifest = new TestManifest({ options: { fingerprint } });
        manifest.configureFingerprint();

        assert.deepStrictEqual(manifest.app.options.fingerprint, {
          prepend: 'prefix',
          exclude: ['foo', 'bar'],
          replaceExtensions: ['baz', 'webmanifest'],
        });
      });

      it('completes missing values using defaults', function () {
        let fingerprint = {
          prepend: 'prefix',
        };

        let manifest = new TestManifest({ options: { fingerprint } });
        manifest.configureFingerprint();

        assert.deepStrictEqual(manifest.app.options.fingerprint, {
          prepend: 'prefix',
          replaceExtensions: ['html', 'css', 'js', 'webmanifest'],
        });
      });
    });
  });
});
