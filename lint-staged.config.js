module.exports = {
  '**/*.js': 'yarn eslint --cache --fix',
  '**/*.hbs': 'yarn ember-template-lint',
  '**/*.md': 'yarn prettier --write',
};
