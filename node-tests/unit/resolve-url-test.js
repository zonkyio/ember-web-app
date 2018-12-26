'use strict';

var assert = require('assert');
var resolveURL = require('../../lib/resolve-url');

describe('Unit: resolveURL()', function() {
  it('returns original URL when it\'s absolute', function() {
    assert.strictEqual(resolveURL("/", "http://www.example.com/"), "http://www.example.com/");
    assert.strictEqual(resolveURL("/", "https://www.example.com/"), "https://www.example.com/");
  });

  it('prepends original URL when it\'s relative', function() {
    assert.strictEqual(resolveURL("/", "/foo"), "/foo");
    assert.strictEqual(resolveURL("https://www.example.com/", "/bar"), "https://www.example.com/bar");
  });
});
