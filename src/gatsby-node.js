exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@reach/router$": require.resolve(`./lib/router`),
        "@reach/router-original$": require.resolve(`@reach/router`)
      }
    }
  });
};
