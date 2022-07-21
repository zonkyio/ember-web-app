module.exports = {
  git: {
    tagName: 'v${version}',
    tagAnnotation: 'Release v${version}',
    commitMessage: 'Release v${version}',
    commitArgs: '-S',
  },
  github: {
    release: true,
    releaseName: 'v${version}',
    releaseNotes:
      'yarn --silent changelog --next-version="Release Notes" --from=v${latestVersion}',
  },
  npm: {
    publish: false,
  },
  plugins: {
    '@release-it-plugins/lerna-changelog': {
      infile: 'CHANGELOG.md',
    },
  },
};
