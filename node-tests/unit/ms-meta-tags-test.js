'use strict';

const assert = require('assert');
const msMetaTags = require('../../lib/ms-meta-tags');

describe('Unit: msMetaTags()', function() {
  it('returns empty array', function() {
    let manifest = {};
    let config = {};

    assert.deepStrictEqual(msMetaTags(manifest, config), []);
  });
});
