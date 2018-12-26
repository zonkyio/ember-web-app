'use strict';

const assert = require('assert');
const msMetaTags = require('../../lib/ms-meta-tags');

describe('Unit: msMetaTags()', function() {
  it('returns meta tag with the link to browserconfig.xml', function() {
    let manifest = {
      ms: true
    };
    let config = {};

    assert.deepStrictEqual(
      msMetaTags(manifest, config, 'browserconfig.xml'),
      [
        '<meta name="msapplication-config" content="browserconfig.xml">'
      ]
    );
  });

  it('uses rootURL if defined', function() {
    let manifest = {
      ms: true
    };
    let config = {
      rootURL: '/foo/bar/'
    };

    assert.deepStrictEqual(
      msMetaTags(manifest, config, 'browserconfig.xml'),
      [
        '<meta name="msapplication-config" content="/foo/bar/browserconfig.xml">'
      ]
    );
  });

  it(`does not return the tag if 'ms' is falsey`, function() {
    let manifest = {};
    let config = {};

    assert.deepStrictEqual(msMetaTags(manifest, config, 'browserconfig.xml'), []);
  });
});
