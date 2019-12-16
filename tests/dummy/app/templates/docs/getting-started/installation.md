# Installation

To install Web App, run

```sh
ember install ember-web-app
```

Ember should install the addon, add a `config/manifest.js` file, and insert HTML tags for `manifest.webmanifest` and `browserconfig.xml` into `app/index.html` file.

```
<head>
  <link rel="manifest" href="{{rootURL}}manifest.webmanifest" />
  <meta name="msapplication-config" content="{{rootURL}}browserconfig.xml" />
</head>
```

Check out the {{docs-link "upgrade guide" "docs.getting-started.upgrade-guide"}} if you're coming from a previous version of Web App.
