const GatsbyStaticSitePlugin = require('./GatsbyStaticSitePlugin');

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  // don't add plugin
  if (stage !== 'build-javascript') {
    return;
  }

  // add webpack plugin to gatsby's webpack config
  actions.setWebpackConfig({
    plugins: [new GatsbyStaticSitePlugin()],
  });
};
