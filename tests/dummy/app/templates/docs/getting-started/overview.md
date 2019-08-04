# Overview

This Ember addon generates a _Web Application Manifest_ and _Browser configuration schema_ files at build time using the `config/manifest.js` file, it also inserts additional `meta` tags for non-standard vendor implementations.

## Web App Manifest

From [MDN](https://developer.mozilla.org/en-US/docs/Web/Manifest)

> The web app manifest provides information about an application (such as name,
> author, icon, and description) in a text file. The purpose of the manifest is
> to install web applications to the homescreen of a device, providing users
> with quicker access and a richer experience.

The generated `manifest.webmanifest` file is linked to the application using `link` tag in `app/index.html` file.

```html
<link rel="manifest" src="{{rootURL}}manifest.webmanifest" />
```

_The generated manifest is validated using `web-app-manifest-validator` package._

## Browserconfig

From [Microsoft](https://msdn.microsoft.com/en-us/library/dn320426%28v=vs.85%29.aspx)

> Browser configuration files (also known as browserconfig) can be used to define pinned site customizations, such as tile backgrounds, badge updates, and tile notifications.

The generated `browserconfig.xml` file is linked to the application using `meta` tag in `app/index.html` file.

```html
<meta name="msapplication-config" content="{{rootURL}}browserconfig.xml" />
```

_You can skip generating of `browserconfig.xml` file by removing the `meta` tag from the `app/index.html` file._

## Additional `meta` Tags

It also generates some compatibility `meta` tags for supporting non-standard vendor features like Apple's [Web Content For Safari](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/Introduction/Introduction.html) and that don't yet support the _Web App Manifest_ standard.

## Targets

Internally, Web App takes into account several different types of targets for generating the _Web App Manifest_ taking care of including some backward compatibility `meta` tags in order to support as many devices and browsers as possible. These targets are:

- `manifest` (default target)
- `android` (to target Android devices)
- `apple` (to target Apple devices)
- `ms` (to target Win8/Win10 devices)
- `favicon` (to target browser favicons)
- `safari-pinned-tab` (to target Safari Pinned Tab)

_Not all targets are used for all properties (actually, most properties are not affected by the targets)._
