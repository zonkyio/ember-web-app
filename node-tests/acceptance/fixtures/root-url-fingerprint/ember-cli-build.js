const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let options = {
    fingerprint: {
      prepend: 'https://www.example.com/',
    },
  };

  let app = new EmberApp(defaults, options);

  return app.toTree();
};
