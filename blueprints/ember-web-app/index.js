module.exports = {
  description: '',

  normalizeEntityName() {},

  locals(options) {
    return {
      name: options.project.name(),
    };
  },
};
