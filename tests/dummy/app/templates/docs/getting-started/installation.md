# Installation

To install Web App, run

```sh
ember install ember-web-app
```

Ember should install the addon, add a `config/manifest.js` file, and insert HTML tags for `manifest.webmanifest` and `browserconfig.xml` into `app/index.html` file.

```html
<!-- app/index.html -->
<head>
  <link rel="manifest" href="{{rootURL}}manifest.webmanifest" />
  <meta name="msapplication-config" content="{{rootURL}}browserconfig.xml" />
</head>
```

Check out the {{docs-link "upgrade guide" "docs.getting-started.upgrade-guide"}} if you're coming from a previous version of Web App.

## Embroider

When application uses Embroider, then pass manifest tree into `extraPublicTrees` configuration property.

```javascript
// ember-cli-build.js
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { treeForManifest } = require('ember-web-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {});

  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    extraPublicTrees: [treeForManifest(app)],
  });
};
```
