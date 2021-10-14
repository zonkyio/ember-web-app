'use strict';
const assert = require('assert');
const { AddonTestApp } = require('ember-cli-addon-tests');
const { contentOf, exists, assertJSON, create } = require('./helpers');

describe('Acceptance', function () {
  describe('browserconfig', function () {
    this.timeout(300000);

    let app;

    before(function () {
      if (process.env.SKIP_ACCEPTANCE === 'true') {
        this.skip();
        return;
      }

      app = new AddonTestApp();
    });

    it('generates a browserconfig.xml file', function () {
      return create(app, 'empty')
        .then(() => app.runEmberCommand('build'))
        .then(contentOf(app, 'dist/browserconfig.xml'))
        .then((content) =>
          assert.strictEqual(
            content,
            '<?xml version="1.0"?><browserconfig><msapplication/></browserconfig>'
          )
        );
    });

    it('configures broccoli-asset-rev', function () {
      return create(app, 'dummy')
        .then(() => app.runEmberCommand('build', '--prod'))
        .then(contentOf(app, 'dist/browserconfig.xml'))
        .then((content) =>
          assert.strictEqual(
            content,
            '<?xml version="1.0"?><browserconfig><msapplication><tile><square150x150logo src="pio-8911090226e7b5522790f1218f6924a5.png"/><TileColor>#FFFFFF</TileColor></tile></msapplication></browserconfig>'
          )
        )
        .then(contentOf(app, 'dist/fastbootAssetMap.json'))
        .then(assertJSON(app, { 'pio.png': 'pio-0987654321.png' }));
    });

    it(`doesn't generate browserconfig when tag is omitted`, function () {
      return create(app, 'no-browserconfig')
        .then(() => app.runEmberCommand('build'))
        .then(() =>
          assert.ok(
            !exists(app, 'dist/browserconfig.xml'),
            `Doesn't generate browserconfig.xml file`
          )
        )
        .then(contentOf(app, 'dist/index.html'))
        .then((content) =>
          assert.ok(
            !content.includes('msapplication-config'),
            `Doesn't include meta tags`
          )
        );
    });

    it('uses rootURL configuration', function () {
      return create(app, 'config-root-url')
        .then(() => app.runEmberCommand('build'))
        .then(contentOf(app, 'dist/index.html'))
        .then((content) =>
          assert.ok(
            content.indexOf('content="/foo/bar/baz/browserconfig.xml"') > -1,
            'index.html uses rootURL from configuration'
          )
        );
    });

    it('uses fingerprint configuration for browserconfig', function () {
      return create(app, 'broccoli-asset-rev')
        .then(() => app.runEmberCommand('build', '--prod'))
        .then(contentOf(app, 'dist/browserconfig.xml'))
        .then((content) =>
          assert.strictEqual(
            content,
            '<?xml version="1.0"?><browserconfig><msapplication><tile><square150x150logo src="https://www.example.com/pio-8911090226e7b5522790f1218f6924a5.png"/><TileColor>#FFFFFF</TileColor></tile></msapplication></browserconfig>'
          )
        );
    });
  });
});
