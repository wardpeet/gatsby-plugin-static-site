
const pluginName = "GatsbyStaticSitePlugin";
const ConstDependency = require('webpack/lib/dependencies/ConstDependency');

module.exports = class GatsbyStaticSitePlugin {
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap(pluginName, factory => {
      factory.hooks.parser.for('javascript/auto').tap(pluginName, (parser, options) => {
        parser.hooks.importSpecifier.tap(
          pluginName,
          (statement, source, id, name) => {
            if (source === '@reach/router' && id === 'navigate') {
              // remove navigate from import
              parser.scope.definitions.delete(name);

              // add our own navigation function to gatsby
              parser.state.current.addDependency(new ConstDependency(
                `const ${name} = (url, options) => {
                  // when we do not replace the current url or the replacement is just adding a slash we navigate
                  // this fixes canonical redirects
                  if (!options.replace || window.location.href + '/' === url) {
                    window.location = url;
                  }
                };`,
                0
              ))
              return true;
            }
          }
        );
      });
    });
  }
}