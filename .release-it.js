module.exports = {
  git: {
    tagName: 'v${version}',
    tagAnnotation: 'Release v${version}',
    commitMessage: 'Release v${version}',
    commitArgs: '-S',
  },
  github: {
    release: true,
  },
  npm: {
    publish: false,
  },
  plugins: {
    'release-it-lerna-changelog': {
      infile: 'CHANGELOG.md',
    },
  },
};
