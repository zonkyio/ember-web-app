module.exports = {
  description: '',

  normalizeEntityName() {},

  locals(options) {
    return {
      name: options.project.name()
    };
  },

  afterInstall() {
    return this.removePackageFromProject('ember-web-app-rename');
  }
};
