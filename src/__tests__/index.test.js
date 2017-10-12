import test from 'ava'; // eslint-disable-line
import { writeFileSync } from 'fs';
import createCompiler from './helper';

test.after('roll-back', () => {
  writeFileSync(`${__dirname}/fixtures/index.json`, '0');
});
test.cb(`'watch ${__dirname}/fixtures/index.json`, (t) => {
  const options = {
    cb: (changeFilePath) => {
      t.is(changeFilePath, `${__dirname}/fixtures/index.json`);
      t.end();
    },
  };
  createCompiler(options);
  writeFileSync(`${__dirname}/fixtures/index.json`, '1');
});
