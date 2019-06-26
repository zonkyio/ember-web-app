'use strict';
const assert = require('assert');
const apple = require('../../../lib/tags/apple');

describe('Unit', function() {
  describe('tags', function() {
    describe('apple', function() {
      describe('links', function() {
        it('returns empty icon array when icons is not defined', function() {
          let manifest = {};

          assert.deepStrictEqual(apple(manifest), [
            '<meta name="apple-mobile-web-app-status-bar-style" content="default">',
          ]);
        });

        it('returns empty icon array when icons is empty', function() {
          let manifest = {
            icons: [],
          };

          assert.deepStrictEqual(apple(manifest), [
            '<meta name="apple-mobile-web-app-status-bar-style" content="default">',
          ]);
        });

        it('generates `apple-touch-icon` links from icons with no targets set', function() {
          let manifest = {
            icons: [
              {
                src: '/foo/bar.png',
                sizes: '180x180',
              },
              {
                src: '/bar/baz.png',
                sizes: '280x280',
              },
            ],
          };

          assert.deepStrictEqual(apple(manifest), [
            '<link rel="apple-touch-icon" href="/foo/bar.png" sizes="180x180">',
            '<link rel="apple-touch-icon" href="/bar/baz.png" sizes="280x280">',
            '<meta name="apple-mobile-web-app-status-bar-style" content="default">',
          ]);
        });

        it('excludes icons that are not targeted for apple', function() {
          let manifest = {
            icons: [
              {
                src: '/foo/bar.png',
                sizes: '180x180',
                targets: ['manifest'],
              },
              {
                src: '/bar/baz.png',
                sizes: '280x280',
              },
            ],
          };

          assert.deepStrictEqual(apple(manifest), [
            '<link rel="apple-touch-icon" href="/bar/baz.png" sizes="280x280">',
            '<meta name="apple-mobile-web-app-status-bar-style" content="default">',
          ]);
        });

        it('does not render sizes attribute when is not defined', function() {
          let manifest = {
            icons: [
              {
                src: '/foo/bar.png',
              },
            ],
          };

          assert.deepStrictEqual(apple(manifest), [
            '<link rel="apple-touch-icon" href="/foo/bar.png">',
            '<meta name="apple-mobile-web-app-status-bar-style" content="default">',
          ]);
        });

        it('uses an empty string as rootURL if it is undefined', function() {
          let manifest = {
            icons: [
              {
                src: 'bar.png',
              },
            ],
          };

          assert.deepStrictEqual(apple(manifest), [
            '<link rel="apple-touch-icon" href="bar.png">',
            '<meta name="apple-mobile-web-app-status-bar-style" content="default">',
          ]);
        });

        it('generates icons with precomposed suffix', function() {
          let manifest = {
            icons: [
              {
                src: '/foo/bar.png',
              },
            ],
            apple: {
              precomposed: true,
            },
          };

          assert.deepStrictEqual(apple(manifest), [
            '<link rel="apple-touch-icon-precomposed" href="/foo/bar.png">',
            '<meta name="apple-mobile-web-app-status-bar-style" content="default">',
          ]);
        });
      });

      describe('metas', function() {
        it('returns `web-app-capable` meta tag when display mode is fullscreen', function() {
          let manifest = {
            display: 'fullscreen',
          };

          assert.ok(
            apple(manifest).includes(
              '<meta name="apple-mobile-web-app-capable" content="yes">'
            )
          );
        });

        it('returns `web-app-capable` meta tag when display mode is standalone', function() {
          let manifest = {
            display: 'standalone',
          };

          assert.ok(
            apple(manifest).includes(
              '<meta name="apple-mobile-web-app-capable" content="yes">'
            )
          );
        });

        it('does not return `web-app-capable` meta tag when display mode is minimal-ui', function() {
          let manifest = {
            display: 'minimal-ui',
          };

          assert.ok(
            !apple(manifest).includes(
              '<meta name="apple-mobile-web-app-capable" content="yes">'
            )
          );
        });

        it('does not return `web-app-capable` meta tag when display mode is browser', function() {
          let manifest = {
            display: 'browser',
          };

          assert.ok(
            !apple(manifest).includes(
              '<meta name="apple-mobile-web-app-capable" content="yes">'
            )
          );
        });

        it('does not return `web-app-capable` meta tag when display mode is not defined', function() {
          let manifest = {};

          assert.ok(
            !apple(manifest).includes(
              '<meta name="apple-mobile-web-app-capable" content="yes">'
            )
          );
        });

        it('does not return `web-app-capable` meta tag when display mode is fullscreen, but apple.webAppCapable is false', function() {
          let manifest = {
            display: 'fullscreen',
            apple: {
              webAppCapable: false,
            },
          };

          assert.ok(
            !apple(manifest).includes(
              '<meta name="apple-mobile-web-app-capable" content="yes">'
            )
          );
        });

        it('does not return `web-app-capable` meta tag when display mode is standalone, but apple.webAppCapable is false', function() {
          let manifest = {
            display: 'standalone',
            apple: {
              webAppCapable: false,
            },
          };

          assert.ok(
            !apple(manifest).includes(
              '<meta name="apple-mobile-web-app-capable" content="yes">'
            )
          );
        });

        it('returns `web-app-capable` meta tag when display mode is browser, but apple.webAppCapable is true', function() {
          let manifest = {
            display: 'browser',
            apple: {
              webAppCapable: true,
            },
          };

          assert.ok(
            apple(manifest).includes(
              '<meta name="apple-mobile-web-app-capable" content="yes">'
            )
          );
        });

        it('returns `web-app-capable` meta tag when display mode is browser, but apple.webAppCapable is true', function() {
          let manifest = {
            display: 'minimal-ui',
            apple: {
              webAppCapable: true,
            },
          };

          assert.ok(
            apple(manifest).includes(
              '<meta name="apple-mobile-web-app-capable" content="yes">'
            )
          );
        });

        it('returns `web-app-title` meta tag', function() {
          let manifest = { name: 'foo bar' };

          assert.ok(
            apple(manifest).includes(
              '<meta name="apple-mobile-web-app-title" content="foo bar">'
            )
          );
        });

        it('does not include `web-app-title` when manifest.name is not defined', function() {
          let manifest = {};

          assert.ok(
            !JSON.stringify(apple(manifest)).includes(
              'apple-mobile-web-app-title'
            )
          );
        });

        it('returns `web-app-status-bar-style` meta tag with default value', function() {
          let manifest = {};

          assert.ok(
            apple(manifest).includes(
              '<meta name="apple-mobile-web-app-status-bar-style" content="default">'
            )
          );
        });

        it('returns `web-app-status-bar-style` meta tag with custom value', function() {
          let manifest = {
            apple: {
              statusBarStyle: 'black-translucent',
            },
          };

          assert.ok(
            apple(manifest).includes(
              '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">'
            )
          );
        });

        it('returns empty array when apple is false', function() {
          let manifest = {
            display: 'fullscreen',
            apple: false,
          };

          assert.deepStrictEqual(apple(manifest), []);
        });
      });

      describe('format detection', function() {
        it('returns `format-detection` meta tag with disabled telephone', function() {
          let manifest = {
            apple: {
              formatDetection: {
                telephone: false,
              },
            },
          };

          assert.ok(
            apple(manifest).includes(
              '<meta name="format-detection" content="telephone=no">'
            )
          );
        });

        it('does not include `format-detection` when format detection is not provided', function() {
          let manifest = {
            apple: {},
          };

          assert.ok(
            !JSON.stringify(apple(manifest)).includes('format-detection')
          );
        });
      });

      describe('Safari pinned tab', function() {
        it('returns Safari pinned tab', function() {
          let manifest = {
            icons: [
              {
                src: 'bar.svg',
                targets: ['safari-pinned-tab'],
              },
            ],
          };

          assert.deepStrictEqual(apple(manifest), [
            '<link rel="mask-icon" href="bar.svg">',
            '<meta name="apple-mobile-web-app-status-bar-style" content="default">',
          ]);
        });

        it('excludes icons that are not targeted for pinned tabs', function() {
          let manifest = {
            icons: [
              {
                src: '/foo/bar.png',
                sizes: '180x180',
                targets: ['manifest'],
              },
              {
                src: '/bar/baz.png',
                sizes: '280x280',
              },
            ],
          };

          assert.deepStrictEqual(apple(manifest), [
            '<link rel="apple-touch-icon" href="/bar/baz.png" sizes="280x280">',
            '<meta name="apple-mobile-web-app-status-bar-style" content="default">',
          ]);
        });

        it('assign attribute for Safari pinned tab color', function() {
          let manifest = {
            icons: [
              {
                src: '/foo/bar.svg',
                targets: ['safari-pinned-tab'],
                safariPinnedTabColor: '#abc',
              },
            ],
          };

          assert.deepStrictEqual(apple(manifest), [
            '<link rel="mask-icon" href="/foo/bar.svg" color="#abc">',
            '<meta name="apple-mobile-web-app-status-bar-style" content="default">',
          ]);
        });
      });
    });
  });
});
