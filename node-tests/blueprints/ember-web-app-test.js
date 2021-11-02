'use strict';
const { expect } = require('ember-cli-blueprint-test-helpers/chai');

const {
  setupTestHooks,
  emberNew,
  emberGenerate,
  emberDestroy,
} = require('ember-cli-blueprint-test-helpers/helpers');

describe('Blueprints', function () {
  setupTestHooks(this);

  describe('ember generate', function () {
    it('generates files', function () {
      let args = ['ember-web-app', 'foo'];

      return emberNew().then(() =>
        emberGenerate(args, (file) => {
          expect(file('config/manifest.js'))
            .to.contain('name: "my-app"')
            .to.contain('short_name: "my-app"')
            .to.contain('display: "standalone"');

          expect(file('app/index.html'))
            .to.contain(
              '<link rel="manifest" href="{{rootURL}}manifest.webmanifest">'
            )
            .to.contain(
              '<meta name="msapplication-config" content="{{rootURL}}browserconfig.xml">'
            );
        }).then(() => emberDestroy(args))
      );
    });
  });
});
