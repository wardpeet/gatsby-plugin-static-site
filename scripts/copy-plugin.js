const path = require('path');
const execa = require('execa');
const del = require('del');
const globby = require('globby');
const rootDir = path.resolve(__dirname, '..');
const e2eRoot = path.join(rootDir, 'e2e-tests', 'asset-prefix');

(async () => {
  await execa('yarn', ['pack'], { cwd: rootDir });

  const [localPackage] = await globby('*.tgz', { cwd: rootDir });

  const installPluginProc = execa(
    'yarn',
    ['add', `file:../../${localPackage}`],
    {
      cwd: e2eRoot,
    }
  );
  installPluginProc.stdout.pipe(process.stdout);
  await installPluginProc;

  await del(localPackage, { cwd: rootDir });

  try {
    // run checkout files
    await Promise.all(
      ['package.json', 'yarn.lock'].map(file => {
        return execa('git', ['checkout', file], {
          cwd: e2eRoot,
        });
      })
    );
  } catch (err) {
    // noop
  }
})();
