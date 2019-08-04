# Using CORS

You can specify `crossorigin` behaviour for `manifest.webmanifest` by updating the `app/index.html` file.

```html
<link
  rel="manifest"
  href="{{rootURL}}manifest.webmanifest"
  crossorigin="use-credentials"
/>
```

_See [Mozilla's Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for more details._
