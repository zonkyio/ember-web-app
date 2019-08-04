# Generating Icons

Web App doesn't generate icons. If you want to automate the generation of icons starting from a master image, you can install [ember-cli-image-transformer](https://github.com/jrjohnson/ember-cli-image-transformer).

If your `config/manifest.js` looks like this and needs a `192px` and a `512px` icons:

```javascript
'use strict';

module.exports = function() {
  return {
    icons: [
      {
        src: '/assets/icons/appicon-32.png',
        sizes: '32x32',
        targets: ['favicon'],
      },
      ...[192, 280, 512].map(size => ({
        src: `/assets/icons/appicon-${size}.png`,
        sizes: `${size}x${size}`,
      })),
    ],
  };
};
```

You can start with a base `brand-icon.svg` image and automatically build the `192x192` and `512x512` versions by installing `ember-cli-image-transformer` and adding the necessary configuration to your `ember-cli-build.js` file:

```javascript
'use strict';

module.exports = function(defaults) {
  let options = {
    'ember-cli-image-transformer': {
      images: [
        {
          inputFilename: 'lib/images/brand-icon.svg',
          outputFileName: 'appicon-',
          convertTo: 'png',
          destination: 'assets/icons/',
          sizes: [32, 192, 280, 512],
        },
      ],
    },
  };

  let app = new EmberApp(defaults, options);

  return app.toTree();
};
```
