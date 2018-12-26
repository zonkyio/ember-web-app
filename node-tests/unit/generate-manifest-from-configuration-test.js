'use strict';

const assert = require('assert');
const generateManifestFromConfiguration = require('../../lib/generate-manifest-from-configuration');

describe('Unit: generateManifestFromConfiguration()', function() {
  it('filters custom "apple" property', function() {
    let manifest = {
      apple: 'apple',
    };

    assert.deepStrictEqual(generateManifestFromConfiguration(manifest), {});
  });

  it('filters custom "ms" property', function() {
    let manifest = {
      ms: 'ms',
    };

    assert.deepStrictEqual(generateManifestFromConfiguration(manifest), {});
  });

  it('returns manifest properties', function() {
    let manifest = {
      foo: 'bar',
    };

    assert.deepStrictEqual(generateManifestFromConfiguration(manifest), {
      foo: 'bar',
    });
  });

  it('includes icons with no target definition', function() {
    let expected = {
      icons: [
        {
          src: 'foo/bar.png',
          sizes: '120x120',
          type: 'image/png',
        },
      ],
    };

    let manifest = {
      icons: [
        {
          src: 'foo/bar.png',
          sizes: '120x120',
          type: 'image/png',
        },
      ],
    };

    assert.deepStrictEqual(
      generateManifestFromConfiguration(manifest),
      expected
    );
  });

  it('filters icons that has a different target than manifest', function() {
    let expected = {
      icons: [
        {
          src: 'baz/qux.png',
          sizes: '120x120',
          type: 'image/png',
        },
      ],
    };

    let manifest = {
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
    };

    assert.deepStrictEqual(
      generateManifestFromConfiguration(manifest),
      expected
    );
  });
});
