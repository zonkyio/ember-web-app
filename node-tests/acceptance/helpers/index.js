'use strict';
const assert = require('assert');
const fs = require('fs');

const root = require('../../../package.json');

module.exports = { contentOf, exists, assertJSON, create };

function contentOf(app, path) {
  return () => fs.readFileSync(app.filePath(path), { encoding: 'utf-8' });
}

function exists(app, path) {
  return fs.existsSync(app.filePath(path));
}

function assertJSON(app, expected) {
  return (actual) =>
    assert.deepStrictEqual(JSON.parse(actual), expected, 'assert JSON');
}

function create(app, fixtures) {
  return app.create(fixtures, {
    fixturesPath: 'node-tests/acceptance/fixtures',
    emberVersion: root.devDependencies['ember-source'],
    emberDataVersion: root.devDependencies['ember-data'],
  });
}
