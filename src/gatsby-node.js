const GatsbyStaticSitePlugin = require('./GatsbyStaticSitePlugin');

exports.onCreateWebpackConfig = ({ actions }) => {
  // add webpack plugin to gatsby's webpack config
  actions.setWebpackConfig({
    plugins: [new GatsbyStaticSitePlugin()],
  });
};
