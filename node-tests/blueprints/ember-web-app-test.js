'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;

const expect = require('ember-cli-blueprint-test-helpers/chai').expect;

describe('Blueprints: ember generate and destroy ember-web-app', function() {
  setupTestHooks(this);

  it('generates config/manifest.js file', function() {
    let args = ['ember-web-app', 'foo'];

    return emberNew().then(() =>
      emberGenerateDestroy(args, file => {
        expect(file('config/manifest.js'))
          .to.contain('name: "my-app"')
          .to.contain('short_name: "my-app"')
          .to.contain('display: "standalone"');
      })
    );
  });
});
