import { join } from 'path';

import webpack from 'webpack';
import MemoryFileSystem from 'memory-fs'; // eslint-disable-line import/no-extraneous-dependencies

import ExtraWatchWebpackPlugin from '../index';
import InvalidPlugin from './InvalidPlugin';

export default function createCompiler(options = {}) {
  const { cb = () => {} } = options;
  const compiler = webpack({
    bail: true,
    cache: false,
    entry: join(__dirname, 'fixtures', 'index.js'),
    output: {
      path: join(__dirname, 'fixtures', 'dist'),
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    plugins: [
      new ExtraWatchWebpackPlugin({
        files: join(__dirname, 'fixtures', 'index.json'),
      }),
      new InvalidPlugin(cb),
    ],
  });
  compiler.outputFileSystem = new MemoryFileSystem();
  compiler.watch({}, (err) => {
    if (err) console.error(err);
  });
}
