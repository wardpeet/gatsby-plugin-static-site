const path = require('path');
const makeDir = require('make-dir');
const cpy = require('cpy');
const globby = require('globby');
const package = require('../package.json');
const rootDir = path.resolve(__dirname, '..');
const pluginDir = path.join(rootDir, 'e2e-tests', 'asset-prefix', 'plugins', package.name);

(async () => {
  await makeDir(pluginDir)

  const files = await globby('**/*', {
    cwd: path.join(rootDir, 'src')
  })

  await cpy(['package.json'], pluginDir, {
    cwd: rootDir
  });

  await cpy(files, pluginDir, {
    cwd: path.join(rootDir, 'src'),
    parents: true,
  });

})();
