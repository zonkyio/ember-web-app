'use strict';

const assert = require('assert');
const configureFingerprint = require('../../lib/configure-fingerprint');

describe('Unit: configureFingerprint()', function() {
  it('returns `false` when current options is `false`', function() {
    assert.strictEqual(configureFingerprint(false), false);
  });

  it('returns safe configuration when options is undefined', function() {
    let expected = {
      replaceExtensions: ['html', 'css', 'js', 'webmanifest']
    };

    let actual = configureFingerprint(undefined, 'manifest.webmanifest');

    assert.deepStrictEqual(actual, expected);
  });

  it('updates options', function() {
    let userOptions = {
      prepend: 'prefix',
      exclude: ['foo', 'bar'],
      replaceExtensions: ['baz']
    };
    let expected = {
      prepend: 'prefix',
      exclude: ['foo', 'bar'],
      replaceExtensions: ['baz', 'webmanifest']
    };

    let actual = configureFingerprint(userOptions, 'manifest.webmanifest');

    assert.deepStrictEqual(actual, expected);
  });

  it('completes missing values using defaults', function() {
    let userOptions = {
      prepend: 'prefix'
    };
    let expected = {
      prepend: 'prefix',
      replaceExtensions: ['html', 'css', 'js', 'webmanifest']
    };

    let actual = configureFingerprint(userOptions, 'manifest.webmanifest');

    assert.deepStrictEqual(actual, expected);
  });
});
