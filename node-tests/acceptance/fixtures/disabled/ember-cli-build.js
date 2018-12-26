const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let options = {
    'ember-web-app': {
      enabled: false,
    },
  };

  let app = new EmberApp(defaults, options);

  return app.toTree();
};
