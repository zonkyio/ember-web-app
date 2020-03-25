'use strict';
const assert = require('assert');
const ms = require('../../../lib/tags/ms');

describe('Unit', function () {
  describe('tags', function () {
    describe('ms', function () {
      it('returns empty array', function () {
        let manifest = {};

        assert.deepStrictEqual(ms(manifest), []);
      });
    });
  });
});
