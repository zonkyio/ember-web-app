'use strict';

module.exports = configureFingerprint;

function configureFingerprint(currentOptions, fileName) {
  if (currentOptions === false) {
    // if `false` just return `false`. Fingerprint is disabled
    return false;
  }

  let defaultOptions = require('broccoli-asset-rev/lib/default-options');
  let fingerprint = {};

  if (currentOptions != null) {
    for (let option in currentOptions) {
      fingerprint[option] = currentOptions[option];
    }
  }

  let replaceExtensions = fingerprint.replaceExtensions || defaultOptions.replaceExtensions;
  fingerprint.replaceExtensions = replaceExtensions.concat([fileName.match(/\.(.*$)/)[1]]);

  return fingerprint;
}
