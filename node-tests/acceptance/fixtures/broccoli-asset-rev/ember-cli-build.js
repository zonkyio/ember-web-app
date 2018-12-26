const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let options = {
    fingerprint: {
      extensions: ['png', 'webmanifest'],
      prepend: 'https://www.example.com/',
    },
  };

  let app = new EmberApp(defaults, options);

  return app.toTree();
};
