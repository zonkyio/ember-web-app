'use strict';
const android = require('./android');
const apple = require('./apple');
const favicon = require('./favicon');
const ms = require('./ms');

module.exports = function build(manifest) {
  return [android, apple, favicon, ms]
    .map((tags) => tags(manifest))
    .reduce((tags, value) => tags.concat(value))
    .join('\n');
};
