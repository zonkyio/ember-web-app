'use strict';
exports.meta = function meta(attributes) {
  return tag('meta', attributes);
};

exports.link = function link(attributes) {
  return tag('link', attributes);
};

function tag(name, attributes) {
  let attrs = Object.entries(attributes)
    .map(([key, value]) => (value ? ` ${key}="${value}"` : ''))
    .reduce((accumulator, current) => `${accumulator}${current}`, '');

  return `<${name}${attrs}>`;
}
