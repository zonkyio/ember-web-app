'use strict';
// taken from https://github.com/ember-cli/broccoli-config-loader
module.exports = function fuzzyPurgeRequireEntry(entry) {
  return Object.keys(require.cache)
    .filter((path) => path.includes(entry))
    .forEach((entry) => {
      delete require.cache[entry];
    });
};
