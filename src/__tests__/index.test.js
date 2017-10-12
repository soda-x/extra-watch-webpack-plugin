import test from 'ava'; // eslint-disable-line

import { writeFileSync } from 'fs';
import { join } from 'path';

import createCompiler from './helper';

const jsonPath = join(__dirname, 'fixtures', 'index.json');

test.after('roll-back', () => {
  writeFileSync(jsonPath, '0');
});
test.cb(`watch ${jsonPath}`, (t) => {
  const options = {
    cb: (changeFilePath) => {
      t.is(changeFilePath, jsonPath);
      t.end();
    },
  };
  createCompiler(options);
  writeFileSync(jsonPath, '1');
});
