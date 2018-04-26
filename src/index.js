import validateOptions from 'schema-utils';
import uniq from 'lodash.uniq';
import isGlob from 'is-glob';
import glob from 'glob';

import { resolve } from 'path';

function getFileAndContextDeps(compilation, files, dirs, cwd) {
  const { fileDependencies, contextDependencies } = compilation;
  const isWebpack4 = compilation.hooks;
  let fds = isWebpack4 ? [...fileDependencies] : fileDependencies;
  let cds = isWebpack4 ? [...contextDependencies] : contextDependencies;
  
  if (files.length > 0) {
    files.forEach((pattern) => {
      let f = pattern;
      if (isGlob(pattern)) {
        f = glob.sync(pattern, {
          cwd,
          dot: true,
          absolute: true,
        });
      }
      fds = fds.concat(f);
    });
    fds = uniq(fds);
  }
  if (dirs.length > 0) {
    cds = uniq(cds.concat(dirs));
  }

  return {
    fileDependencies: fds,
    contextDependencies: cds,
  };
}

export default class ExtraWatchWebpackPlugin {
  static defaults = {
    cwd: process.cwd(),
    files: [],
    dirs: [],
  };

  constructor(options = {}) {
    validateOptions(require('../options.json'), options, 'ExtraWatchWebpackPlugin'); // eslint-disable-line
    this.options = { ...ExtraWatchWebpackPlugin.defaults, ...options };
  }

  apply(compiler) {
    let { files, dirs } = this.options;
    const { cwd } = this.options;
    files = typeof files === 'string' ? [files] : files;
    dirs = typeof dirs === 'string' ? [dirs] : dirs;
    if (compiler.hooks) {
      compiler.hooks.afterCompile.tap('after-compile', (compilation) => {
        const {
          fileDependencies,
          contextDependencies,
        } = getFileAndContextDeps(compilation, files, dirs, cwd);
        if (files.length > 0) {
          fileDependencies.forEach((file) => {
            compilation.fileDependencies.add(resolve(file));
          });
        }
        if (dirs.length > 0) {
          contextDependencies.forEach((context) => {
            compilation.contextDependencies.add(context);
          });
        }
      });
    } else {
      compiler.plugin('after-compile', (compilation, callback) => {
        const {
          fileDependencies,
          contextDependencies,
        } = getFileAndContextDeps(compilation, files, dirs, cwd);
        if (files.length > 0) {
          compilation.fileDependencies = fileDependencies; // eslint-disable-line
        }
        if (dirs.length > 0) {
          compilation.contextDependencies = contextDependencies; // eslint-disable-line
        }
        callback();
      });
    }
  }
}
