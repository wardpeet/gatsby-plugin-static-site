const path = require('path');
const execa = require('execa');
const del = require('del');
const globby = require('globby');
const rootDir = path.resolve(__dirname, '..');
const e2eRoot = path.join(rootDir, 'e2e-tests', 'asset-prefix');

(async () => {
  console.log('Packing plugin');
  await execa('yarn', ['pack'], { cwd: rootDir });

  console.log(await globby('*.js', { cwd: rootDir }));

  const [localPackage] = await globby('*.tgz', { cwd: rootDir });

  console.log(`Add ${localPackage} to e2e-test`);
  const installPluginProc = execa(
    'yarn',
    ['add', `file:../../${localPackage}`],
    {
      cwd: e2eRoot,
    }
  );
  installPluginProc.stdout.pipe(process.stdout);
  await installPluginProc;

  console.log(`Remove ${localPackage} artifact`);
  await del(localPackage, { cwd: rootDir });

  try {
    console.log(`Restore yarn.lock & pacakge.json to original state`);
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
