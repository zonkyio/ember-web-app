# Fingerprinting

You can add fingerprint checksum to your `manifest.webmanifest` file by configuring [broccoli-asset-rev](https://github.com/rickharrison/broccoli-asset-rev) in `ember-cli-build.js`.

The following example prepends with a custom domain and adds fingerprint checksum to the `manifest.webmanifest` file.

```javascript
'use strict';
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { extensions } = require('broccoli-asset-rev/lib/default-options');

module.exports = function (defaults) {
  let options = {
    fingerprint: {
      extensions: [...extensions, 'webmanifest'],
      prepend: 'https://www.example.com/',
    },
  };

  let app = new EmberApp(defaults, options);

  return app.toTree();
};
```

_Note that the `replaceExtensions` configuration from `broccoli-asset-rev` is updated internally by `ember-web-app` so you don't have to configure yourself on your project._
