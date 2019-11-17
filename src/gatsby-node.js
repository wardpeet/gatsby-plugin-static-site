const GatsbyStaticSitePlugin = require('./GatsbyStaticSitePlugin');

exports.onCreateWebpackConfig = ({ actions }) => {
  // don't add plugin 
  if (stage !== 'build-javascript') {
    return;
  }

  // add webpack plugin to gatsby's webpack config
  actions.setWebpackConfig({
    plugins: [new GatsbyStaticSitePlugin()],
  });
};
