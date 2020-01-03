import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

export default class Router extends AddonDocsRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  docsRoute(this, function() {
    this.route('getting-started', function() {
      this.route('what-is-web-app');
      this.route('installation');
      this.route('upgrade-guide');
      this.route('overview');
    });

    this.route('manifest', function() {
      this.route('available-properties');
    });

    this.route('advanced', function() {
      this.route('fingerprinting');
      this.route('using-cors');
      this.route('generating-icons');
    });
  });

  this.route('not-found', { path: '/*path' });
});
