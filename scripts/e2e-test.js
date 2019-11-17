const path = require('path');
const execa = require('execa');
const { writableNoopStream } = require('noop-stream');

const isSilent = process.argv.includes('--silent');

(async () => {
  const cwd = path.join(__dirname, '../e2e-tests/asset-prefix');

  await execa('yarn', {
    cwd,
  }).stdout.pipe(isSilent ? writableNoopStream() : process.stdout);
  await execa('yarn', ['test'], {
    cwd,
  }).stdout.pipe(isSilent ? writableNoopStream() : process.stdout);
})();
