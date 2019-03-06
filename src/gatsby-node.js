exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@reach/router$": require.resolve(`./router`),
        "@reach/router-original$": require.resolve(`@reach/router`)
      }
    }
  });
};
