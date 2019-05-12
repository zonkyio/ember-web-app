'use strict';

const assert = require('assert');
const androidLinkTags = require('../../lib/android-link-tags');

describe('Unit: androidLinkTags()', function() {
  it('returns empty array', function() {
    let manifest = {};
    let config = {};

    assert.deepStrictEqual(androidLinkTags(manifest, config), []);
  });
});
