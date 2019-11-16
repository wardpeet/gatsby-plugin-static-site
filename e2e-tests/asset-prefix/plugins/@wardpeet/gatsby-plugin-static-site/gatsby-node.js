const GatsbyStaticSitePlugin = require('./GatsbyStaticSitePlugin');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new GatsbyStaticSitePlugin(),
    ]
  });
};
