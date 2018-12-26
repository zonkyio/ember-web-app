'use strict';

const assert = require('assert');
const appleMetaTags = require('../../lib/apple-meta-tags');

describe('Unit: appleMetaTags()', function() {
  it('returns `web-app-capable` meta tag when display mode is fullscreen', function() {
    let manifest = {
      display: 'fullscreen'
    };
    let expected = '<meta name="apple-mobile-web-app-capable" content="yes">';

    let actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(expected) > -1);
  });

  it('returns `web-app-capable` meta tag when display mode is standalone', function() {
    let manifest = {
      display: 'standalone'
    };
    let expected = '<meta name="apple-mobile-web-app-capable" content="yes">';

    let actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(expected) > -1);
  });

  it('does not return `web-app-capable` meta tag when display mode is minimal-ui', function() {
    let manifest = {
      display: 'minimal-ui'
    };
    let notExpected = '<meta name="apple-mobile-web-app-capable" content="yes">';

    let actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(notExpected) === -1);
  });

  it('does not return `web-app-capable` meta tag when display mode is browser', function() {
    let manifest = {
      display: 'browser'
    };
    let notExpected = '<meta name="apple-mobile-web-app-capable" content="yes">';

    let actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(notExpected) === -1);
  });

  it('does not return `web-app-capable` meta tag when display mode is not defined', function() {
    let manifest = {};
    let notExpected = '<meta name="apple-mobile-web-app-capable" content="yes">';

    let actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(notExpected) === -1);
  });

  it('does not return `web-app-capable` meta tag when display mode is fullscreen, but apple.webAppCapable is false', function() {
    let manifest = {
      display: 'fullscreen',
      apple: {
        webAppCapable: false
      }
    };
    let notExpected = '<meta name="apple-mobile-web-app-capable" content="yes">';

    let actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(notExpected) === -1);
  });

  it('does not return `web-app-capable` meta tag when display mode is standalone, but apple.webAppCapable is false', function() {
    let manifest = {
      display: 'standalone',
      apple: {
        webAppCapable: false
      }
    };
    let notExpected = '<meta name="apple-mobile-web-app-capable" content="yes">';

    let actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(notExpected) === -1);
  });

  it('returns `web-app-capable` meta tag when display mode is browser, but apple.webAppCapable is true', function() {
    let manifest = {
      display: 'browser',
      apple: {
        webAppCapable: true
      }
    };
    let expected = '<meta name="apple-mobile-web-app-capable" content="yes">';

    let actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(expected) > -1);
  });

  it('returns `web-app-capable` meta tag when display mode is browser, but apple.webAppCapable is true', function() {
    let manifest = {
      display: 'minimal-ui',
      apple: {
        webAppCapable: true
      }
    };
    let expected = '<meta name="apple-mobile-web-app-capable" content="yes">';

    let actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(expected) > -1);
  });

  it('returns `web-app-title` meta tag', function() {
    let manifest = { name: 'foo bar' };
    let expected = '<meta name="apple-mobile-web-app-title" content="foo bar">';

    let actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(expected) > -1);
  });

  it("doesn't include `web-app-title` when manifest.name is not defined", function() {
    let manifest = {};
    let notExpected = 'apple-mobile-web-app-title';

    let actual = JSON.stringify(appleMetaTags(manifest));

    assert.ok(!actual.includes(notExpected));
  });

  it('returns `web-app-status-bar-style` meta tag with default value', function() {
    let manifest = {};
    let expected = '<meta name="apple-mobile-web-app-status-bar-style" content="default">';

    let actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(expected) > -1);
  });

  it('returns `web-app-status-bar-style` meta tag with custom value', function() {
    let manifest = {
      apple: {
        statusBarStyle: 'black-translucent'
      }
    };
    let expected = '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">';

    let actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(expected) > -1);
  });

  it('returns empty array when apple is false', function() {
    let manifest = {
      display: 'fullscreen',
      apple: false
    };
    let expected = [];

    let actual = appleMetaTags(manifest);

    assert.deepStrictEqual(actual, expected);
  });

  it('returns `format-detection` meta tag with disabled telephone', function() {
    let manifest = {
      apple: {
        formatDetection: {
          telephone: false
        }
      }
    };
    let expected = '<meta name="format-detection" content="telephone=no">';

    let actual = appleMetaTags(manifest);

    assert.ok(actual.indexOf(expected) > -1);
  });

  it("doesn't include `format-detection` when format detection is not provided", function() {
    let manifest = {
      apple: {}
    };
    let notExpected = 'format-detection';

    let actual = JSON.stringify(appleMetaTags(manifest));

    assert.ok(!actual.includes(notExpected));
  });
});
