module.exports = {
  description: 'Generates a configuration for web app manifest.',

  normalizeEntityName() {},

  locals(options) {
    return {
      name: options.project.name(),
    };
  },

  afterInstall() {
    return this.removePackageFromProject('ember-web-app-rename');
  },
};
