'use strict';
const assert = require('assert');
const fs = require('fs');

module.exports = { contentOf, exists, assertJSON };

function contentOf(app, path) {
  return () => fs.readFileSync(app.filePath(path), { encoding: 'utf-8' });
}

function exists(app, path) {
  return fs.existsSync(app.filePath(path));
}

function assertJSON(app, expected) {
  return actual =>
    assert.deepStrictEqual(JSON.parse(actual), expected, 'assert JSON');
}
