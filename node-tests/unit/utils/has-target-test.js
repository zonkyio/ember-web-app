'use strict';
const assert = require('assert');
const hasTarget = require('../../../lib/utils/has-target');

describe('Unit', function() {
  describe('utils', function() {
    describe('has-target', function() {
      it('returns false when object is undefined', function() {
        let object = undefined;

        assert.ok(!hasTarget(object, 'foo'));
      });

      it('returns true when object.targets contains the target', function() {
        let object = {
          targets: ['foo'],
        };

        assert.ok(hasTarget(object, 'foo'));
      });

      it('returns false when object.targets does not contain the target', function() {
        let object = {
          targets: ['bar'],
        };

        assert.ok(!hasTarget(object, 'foo'));
      });
    });
  });
});
