const path = require('path');
const execa = require('execa');
const { writableNoopStream } = require('noop-stream');

const isSilent = process.argv.includes('--silent');

(async () => {
  const cwd = path.join(__dirname, '../e2e-tests/asset-prefix');

  // install deps
  const installProc = execa('yarn', {
    cwd,
  });
  installProc.stdout.pipe(isSilent ? writableNoopStream() : process.stdout);
  await installProc;

  // Build site
  const buildProc = execa('yarn', ['build'], {
    cwd,
    env: {
      CI: '1',
    },
  });
  buildProc.stdout.pipe(isSilent ? writableNoopStream() : process.stdout);
  await buildProc;

  // // run e2e-tests
  const testProc = execa('yarn', ['test'], {
    cwd,
  });
  testProc.stdout.pipe(isSilent ? writableNoopStream() : process.stdout);

  await testProc;
})();
