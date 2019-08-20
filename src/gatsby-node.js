const path = require(`path`);

exports.onCreateWebpackConfig = ({ actions, stage, getConfig }) => {
  const target = stage === `build-html` || stage === `develop-html` ? `node` : `web`;

  if (target === `web`) {
    // force to use es modules when importing internals of @reach.router
    // for browser bundles

    delete getConfig().resolve.alias['@reach/router'];
    actions.setWebpackConfig({
      resolve: {
        alias: {
          "@reach/router/lib": path.join(path.dirname(require.resolve("@reach/router/package.json")), "es", "lib"),
          "@reach/router$": require.resolve("./router"),
          "@reach/router-original$": require.resolve("@reach/router/es")
        }
      }
    });
  } else {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          "@reach/router$": require.resolve(`./router`),
          "@reach/router-original$": require.resolve(`@reach/router`)
        }
      }
    });
  }
};
