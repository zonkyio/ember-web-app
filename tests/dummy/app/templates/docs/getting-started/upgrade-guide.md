# Upgrade Guide

If you're upgrading from an existing version of Web App, you can run the following:

```sh
# Using npm
npm install -D ember-web-app@X.X.X

# Using yarn
yarn add -D ember-web-app@X.X.X
```

## Full Changelog

You can view all of Web App's release notes on [our Releases page](https://github.com/zonkyio/ember-web-app/releases).

## 3.0 Upgrade Guide

There were a two breaking changes made in the 3.0 release.

### 1. Use explicit _Web App Manifest_ and _browserconfig_ references

Previously, Web App was automatically inserting tags for _Web App Manifest_ and _browserconfig_ at build time. This feature was buggy and poorly extensible by developers, so it was removed and the explicit references in `app/index.html` are required.

You can run Web App's blueprint to insert tags into `app/index.html`.

```sh
ember generate ember-web-app
```

If the generation of _browserconfig_ is disabled by falsy `ms` property value in your `config/manifest.js` file, you can remove the `meta` tag from the `app/index.html` file and the `ms` property from the `config/manifest.js` file.

### 2. Drop Node.js 6 support

Web App supports Node.js 8+ versions.
