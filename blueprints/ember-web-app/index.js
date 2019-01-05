module.exports = {
  description: 'Generates a configuration for web app manifest.',

  normalizeEntityName() {},

  locals(options) {
    return {
      name: options.project.name(),
    };
  },
};
