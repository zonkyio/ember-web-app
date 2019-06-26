'use strict';

const assert = require('assert');
const BaseManifest = require('../../lib/base-manifest');

class TestManifest extends BaseManifest {
  constructor(app, required = true) {
    super(app, {
      name: 'manifest.webmanifest',
      selector: 'link[rel="manifest"]',
    });
    this.required = required;
  }

  get isRequired() {
    return this.required;
  }
}

describe('Unit: BaseManifest.configureFingerprint()', function() {
  it('does nothing when is not required', function() {
    let manifest = new TestManifest({ options: {} }, false);
    manifest.configureFingerprint();

    assert.deepStrictEqual(manifest.app.options.fingerprint, undefined);
  });

  it('does nothing when fingerprinting is disabled', function() {
    let manifest = new TestManifest({ options: { fingerprint: false } });
    manifest.configureFingerprint();

    assert.strictEqual(manifest.app.options.fingerprint, false);
  });

  it('configures when options is undefined', function() {
    let expected = {
      replaceExtensions: ['html', 'css', 'js', 'webmanifest'],
    };

    let manifest = new TestManifest({ options: { fingerprint: undefined } });
    manifest.configureFingerprint();

    assert.deepStrictEqual(manifest.app.options.fingerprint, expected);
  });

  it('updates options', function() {
    let fingerprint = {
      prepend: 'prefix',
      exclude: ['foo', 'bar'],
      replaceExtensions: ['baz'],
    };
    let expected = {
      prepend: 'prefix',
      exclude: ['foo', 'bar'],
      replaceExtensions: ['baz', 'webmanifest'],
    };

    let manifest = new TestManifest({ options: { fingerprint } });
    manifest.configureFingerprint();

    assert.deepStrictEqual(manifest.app.options.fingerprint, expected);
  });

  it('completes missing values using defaults', function() {
    let fingerprint = {
      prepend: 'prefix',
    };
    let expected = {
      prepend: 'prefix',
      replaceExtensions: ['html', 'css', 'js', 'webmanifest'],
    };

    let manifest = new TestManifest({ options: { fingerprint } });
    manifest.configureFingerprint();

    assert.deepStrictEqual(manifest.app.options.fingerprint, expected);
  });
});
