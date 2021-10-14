'use strict';
const assert = require('assert');
const { AddonTestApp } = require('ember-cli-addon-tests');
const { contentOf, assertJSON, create } = require('./helpers');

describe('Acceptance', function () {
  describe('manifest', function () {
    this.timeout(300000);

    let app;

    before(function () {
      if (process.env.SKIP_ACCEPTANCE === 'true') {
        this.skip();
        return;
      }

      app = new AddonTestApp();
    });

    it('generates a manifest.webmanifest file', function () {
      return create(app, 'empty')
        .then(function () {
          return app.runEmberCommand('build');
        })
        .then(contentOf(app, 'dist/manifest.webmanifest'))
        .then(
          assertJSON(app, {
            name: 'empty',
            short_name: 'empty',
            description: '',
            start_url: '/',
            scope: '/',
            display: 'standalone',
            background_color: '#fff',
            theme_color: '#fff',
            icons: [],
          })
        );
    });

    it('configures broccoli-asset-rev', function () {
      return create(app, 'dummy')
        .then(function () {
          return app.runEmberCommand('build', '--prod');
        })
        .then(contentOf(app, 'dist/manifest.webmanifest'))
        .then(
          assertJSON(app, {
            icons: [{ src: 'pio-8911090226e7b5522790f1218f6924a5.png' }],
          })
        )
        .then(contentOf(app, 'dist/fastbootAssetMap.json'))
        .then(assertJSON(app, { 'pio.png': 'pio-0987654321.png' }));
    });

    it('uses rootURL configuration', function () {
      return create(app, 'config-root-url')
        .then(function () {
          return app.runEmberCommand('build');
        })
        .then(contentOf(app, 'dist/index.html'))
        .then(function (content) {
          assert.ok(
            content.indexOf('href="/foo/bar/baz/manifest.webmanifest"') > -1,
            'index.html uses rootURL from configuration'
          );
        });
    });

    it('uses fingerprint configuration for manifest', function () {
      return create(app, 'broccoli-asset-rev')
        .then(function () {
          return app.runEmberCommand('build', '--prod');
        })
        .then(contentOf(app, 'dist/index.html'))
        .then(function (content) {
          assert.ok(
            content.indexOf(
              'href="https://www.example.com/manifest-f105f80557272f93397e34ea016e172d.webmanifest"'
            ) > -1,
            'checksum fingerprint is added to manifest.webmanifest file'
          );
          assert.ok(
            content.indexOf(
              'href="https://www.example.com/pio-8911090226e7b5522790f1218f6924a5.png"'
            ) > -1,
            'checksum fingerprint is added to image file'
          );
        })
        .then(
          contentOf(
            app,
            'dist/manifest-f105f80557272f93397e34ea016e172d.webmanifest'
          )
        )
        .then(
          assertJSON(app, {
            icons: [
              {
                src: 'https://www.example.com/pio-8911090226e7b5522790f1218f6924a5.png',
              },
            ],
          })
        );
    });

    it('uses rootURL and fingerprint configurations', function () {
      return create(app, 'root-url-fingerprint')
        .then(function () {
          return app.runEmberCommand('build', '--prod');
        })
        .then(contentOf(app, 'dist/index.html'))
        .then(function (content) {
          assert.ok(
            content.indexOf('href="/dummy/manifest.webmanifest"') > -1,
            'checksum fingerprint is added to manifest.webmanifest file'
          );
          assert.ok(
            content.indexOf(
              'href="https://www.example.com/pio-8911090226e7b5522790f1218f6924a5.png"'
            ) > -1,
            'checksum fingerprint is added to image file'
          );
        })
        .then(contentOf(app, 'dist/manifest.webmanifest'))
        .then(
          assertJSON(app, {
            icons: [
              {
                src: 'https://www.example.com/pio-8911090226e7b5522790f1218f6924a5.png',
              },
            ],
          })
        );
    });
  });
});
