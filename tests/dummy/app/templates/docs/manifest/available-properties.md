# Available Properties

The following list of properties allows to configure `Web App Manifest` generation by modifying `config/manifest.js` file.

See W3C's [Web App Manifest specification](https://w3c.github.io/manifest/) for more details.

## `name`

> Provides a human-readable name for the application as it is intended to be displayed to the user, for example among a list of other applications or as a label for an icon.

```javascript
manifest.name = 'dummy';
```

| Target     | Generates                                                  |
| ---------- | ---------------------------------------------------------- |
| `manifest` | `{ "name": "dummy" }`                                      |
| `apple`    | `<meta name="apple-mobile-web-app-title" content="dummy">` |
| `ms`       | `<meta name="application-name" content="dummy">`           |
| `android`  | does not apply                                             |

## `short_name`

> Provides a short human-readable name for the application. This is intended for use where there is insufficient space to display the full name of the web application.

```javascript
manifest.short_name = 'dummy';
```

| Target     | Generates                   |
| ---------- | --------------------------- |
| `manifest` | `{ "short_name": "dummy" }` |
| `apple`    | does not apply              |
| `ms`       | does not apply              |
| `android`  | does not apply              |

## `background_color`

> Defines the expected background color for the web application.

```javascript
manifest.background_color = '#fff';
```

| Target     | Generates                        |
| ---------- | -------------------------------- |
| `manifest` | `{ "background_color": "#fff" }` |
| `apple`    | does not apply                   |
| `ms`       | does not apply                   |
| `android`  | does not apply                   |

## `description`

> Provides a general description of what the web application does.

```javascript
manifest.description = 'Lorem ipsum dolor';
```

| Target     | Generates                                |
| ---------- | ---------------------------------------- |
| `manifest` | `{ "description": "Lorem ipsum dolor" }` |
| `apple`    | does not apply                           |
| `ms`       | does not apply                           |
| `android`  | does not apply                           |

## `dir`

> Specifies the primary text direction for the `name`, `short_name`, and description members.

Possible values:

- `ltr` (left-to-right)
- `rtl` (right-to-left)
- `auto`

```javascript
manifest.dir = 'ltr';
```

| Target     | Generates          |
| ---------- | ------------------ |
| `manifest` | `{ "dir": "ltr" }` |
| `apple`    | does not apply     |
| `ms`       | does not apply     |
| `android`  | does not apply     |

## `display`

> Defines the developer's preferred display mode for the web application.

Possible values:

- `fullscreen`
- `standalone`
- `minimal-ui`
- `browser`

The default value for `display` is `browser` when is not defined.

```javascript
manifest.display = 'fullscreen';
```

| Target     | Generates                                                  |
| ---------- | ---------------------------------------------------------- |
| `manifest` | `{ "display": "fullscreen" }`                              |
| `apple`    | `<meta name="apple-mobile-web-app-capable" content="yes">` |
| `ms`       | does not apply                                             |
| `android`  | does not apply                                             |

**Note that for iOS the meta tag will be render with value `yes` only when display is `fullscreen` or `standalone`.**

## `icons`

> Specifies an array of image objects that can serve as application icons in various contexts. For example, they can be used to represent the web application amongst a list of other applications, or to integrate the web application with an OS's task switcher and/or system preferences.

Image object members:

- `src` The path to the image file.
- `sizes` A string containing space-separated image dimensions.
- `type` A hint as to the media type of the image.
- `targets` **Non standard** Targets for the images. ['manifest', 'apple'] by default.
- `element` **Non standard** Only when the target is `ms`. Must be one of `square70x70logo`, `square150x150logo`, `wide310x150logo` or `square310x310logo`.
- `safariPinnedTabColor` **Non standard** Only when the target is `safari-pinned-tab`. Can specify a single color with a hexadecimal value (#990000), an RGB value (rgb(153, 0, 0)), or a recognized color-keyword, such as: red, lime, or navy..

```javascript
icons: [
  {
    src: '/foo/bar.png',
    sizes: '180x180',
  },
  {
    src: '/bar/baz.png',
    sizes: '280x280',
    targets: ['apple'], // *
  },
  {
    src: '/bar/fav.png',
    sizes: '32x32',
    targets: ['favicon'],
  },
  {
    src: '/bar/ms.png',
    element: 'square70x70logo', // *
    targets: ['ms'], // *
  },
  {
    src: '/foo/monochrome.svg',
    safariPinnedTabColor: '#cc6600', // *
    targets: ['safari-pinned-tab'], // *
  },
];
```

| Target              | Generates                                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `manifest`          | `{ "icons": [ { "src": "/foo/bar.png", "sizes": "180x180" } ] }`                                                                        |
| `apple`             | `<link rel="apple-touch-icon" href="/foo/bar.png" sizes="180x180">` `<link rel="apple-touch-icon" href="/foo/bar.png" sizes="280x280">` |
| `android`           | does not apply                                                                                                                          |
| `favicon`           | `<link rel="icon" href="/bar/fav.png" sizes="32x32">`                                                                                   |
| `ms`                | icon in `browserconfig.xml`                                                                                                             |
| `safari-pinned-tab` | `<link rel="mask-icon" href="/foo/monochrome.svg" color="#cc6600">`                                                                     |

## `lang`

> Specifies the primary language for the values in the name and short_name members.

```javascript
manifest.lang = 'es-UY';
```

| Target     | Generates             |
| ---------- | --------------------- |
| `manifest` | `{ "lang": "es-UY" }` |
| `apple`    | does not apply        |
| `ms`       | does not apply        |
| `android`  | does not apply        |

## `orientation`

> Defines the default orientation for all the web application's top level browsing contexts.

Possible values:

- `any`
- `natural`
- `landscape`
- `landscape-primary`
- `landscape-secondary`
- `portrait`
- `portrait-primary`
- `portrait-secondary`

```javascript
manifest.orientation = 'portrait';
```

| Target     | Generates                       |
| ---------- | ------------------------------- |
| `manifest` | `{ "orientation": "portrait" }` |
| `apple`    | does not apply                  |
| `ms`       | does not apply                  |
| `android`  | does not apply                  |

## `prefer_related_applications`

> Specifies a boolean value that hints for the user agent to indicate to the user that the specified related applications are available, and recommended over the web application.

Possible values:

- `true`
- `false`

```javascript
manifest.prefer_related_applications = true;
```

| Target     | Generates                                 |
| ---------- | ----------------------------------------- |
| `manifest` | `{ "prefer_related_applications": true }` |
| `apple`    | does not apply                            |
| `ms`       | does not apply                            |
| `android`  | does not apply                            |

## `related_applications`

> Specifies an array of "application objects" representing native applications that are installable by, or accessible to, the underlying platform.

Application object members:

- `platform` The platform on which the application can be found.
- `url` The URL at which the application can be found.
- `id` The ID used to represent the application on the specified platform.

```javascript
manifest.prefer_related_applications = true;
manifest.related_applications = [
  {
    platform: 'itunes',
    url: 'https://itunes.apple.com/app/example-app1/id123456789',
  },
];
```

| Target     | Generates                                                                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `manifest` | `{ "prefer_related_applications": true, "related_applications": [{"platform": "itunes", "url": "https://itunes.apple.com/app/example-app1/id123456789" }] }` |
| `apple`    | does not apply                                                                                                                                               |
| `ms`       | does not apply                                                                                                                                               |
| `android`  | does not apply                                                                                                                                               |

## `scope`

> Defines the navigation scope of this web application's application context. This basically restricts what web pages can be viewed while the manifest is applied.

```javascript
manifest.scope = '/myapp/';
```

| Target     | Generates                |
| ---------- | ------------------------ |
| `manifest` | `{ "scope": "/myapp/" }` |
| `apple`    | does not apply           |
| `ms`       | does not apply           |
| `android`  | does not apply           |

## `start_url`

> Specifies the URL that loads when a user launches the application from a device.

```javascript
manifest.start_url = './?utm_source=web_app_manifest';
```

| Target     | Generates                                           |
| ---------- | --------------------------------------------------- |
| `manifest` | `{ "start_url": "./?utm_source=web_app_manifest" }` |
| `apple`    | does not apply                                      |
| `ms`       | does not apply                                      |
| `android`  | does not apply                                      |

## `theme_color`

> Defines the default theme color for an application. This sometimes affects how the application is displayed by the OS.

```javascript
manifest.theme_color = 'aliceblue';
```

| Target     | Generates                                       |
| ---------- | ----------------------------------------------- |
| `manifest` | `{ "theme_color": "aliceblue" }`                |
| `apple`    | does not apply                                  |
| `ms`       | does not apply                                  |
| `android`  | `<meta name="theme-color" content="aliceblue">` |

## `apple` \*

> Turns on/off the generation of Apple-specific `meta` and `link` tags.

Possible values:

- `true` Turn on. This is the default value.
- `false` Turn off.
- An object with custom settings (see the settings below)

```javascript
manifest.apple = false;
```

| Target     | Generates                   |
| ---------- | --------------------------- |
| `manifest` | `{ "apple": false }`        |
| `apple`    | **returns an empty string** |
| `ms`       | does not apply              |
| `android`  | does not apply              |

### `apple.webAppCapable` \*

> Overrides `manifest.display` for the generation of the `apple-mobile-web-app-capable` meta tag.

Possible values:

- `true` Turn on.
- `false` Turn off.

```javascript
manifest = {
  display: 'standalone',
  apple: {
    webAppCapable: false,
  },
};
```

| Target     | Generates                                                  |
| ---------- | ---------------------------------------------------------- |
| `manifest` | does not apply                                             |
| `apple`    | `<meta name="apple-mobile-web-app-capable" content="yes">` |
| `ms`       | does not apply                                             |
| `android`  | does not apply                                             |

### `apple.statusBarStyle` \*

> Sets the style of the status bar for a web application in iOS

See [Changing the Status Bar Appearance](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html#//apple_ref/doc/uid/TP40002051-CH3-SW1).

Possible values:

- `default` The status bar appears normal.
- `black` The status bar has a black background.
- `black-translucent` The status bar is black and translucent.

Note that if set to `default` or `black`, the web content is displayed below the status bar. If set to `black-translucent`, the web content is displayed on the entire screen, partially obscured by the status bar.

```javascript
manifest.apple = {
  statusBarStyle: 'black-translucent',
};
```

| Target     | Generates                                                                         |
| ---------- | --------------------------------------------------------------------------------- |
| `manifest` | does not apply                                                                    |
| `apple`    | `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">` |
| `ms`       | does not apply                                                                    |
| `android`  | does not apply                                                                    |

### `apple.precomposed` \*

> Adds `precomposed` suffix to Apple touch icons

See [Precomposed Keyword for Apple touch icons](https://mathiasbynens.be/notes/touch-icons#effects).

Possible values:

- `true` Adds precomposed suffix.
- `false` (default) Does not add precomposed suffix.

```javascript
manifest.apple = {
  precomposed: 'true',
};
```

| Target     | Generates                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------- |
| `manifest` | does not apply                                                                                                |
| `apple`    | `<link rel="apple-touch-icon-precomposed" href="/images/icons/apple-touch-icon-192x192.png" sizes="192x192">` |
| `ms`       | does not apply                                                                                                |
| `android`  | does not apply                                                                                                |

### `apple.formatDetection` \*

> Adds `format-detection` meta tag if needed

See [Safari HTML Reference](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html#//apple_ref/doc/uid/TP40008193-SW5).

Possible values:

- An object with following settings
  - `telephone: false` Disables automatic phone number detection.

```javascript
manifest.apple = {
  formatDetection: {
    telephone: false,
  },
};
```

| Target     | Generates                                               |
| ---------- | ------------------------------------------------------- |
| `manifest` | does not apply                                          |
| `apple`    | `<meta name="format-detection" content="telephone=no">` |
| `ms`       | does not apply                                          |
| `android`  | does not apply                                          |

## `ms` \*

> Allows to configure the generation of Microsoft-specific `browserconfig.xml` manifest.

Possible values:

- An object with custom settings (see the settings below)

### `ms.tileColor` \*

> Sets the `<TileColor>` property in `browserconfig.xml`.

See [Browser configuration schema reference](<https://msdn.microsoft.com/en-us/library/dn320426(v=vs.85)>).

Possible values:

- A color in `#hexadecimal` format.

```javascript
manifest.ms = {
  tileColor: '#ffffff',
};
```

_\* non-standard vendor property_
