import validateOptions from 'schema-utils';
import uniq from 'lodash.uniq';

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
    compiler.plugin('after-compile', (compilation, callback) => {
      const { files, dirs } = this.options;
      let { fileDependencies, contextDepencies } = compilation;

      if (files.length > 0) {
        fileDependencies = uniq(fileDependencies.concat(files));
        compilation.fileDependencies = fileDependencies; // eslint-disable-line
      }

      if (dirs.length > 0) {
        contextDepencies = uniq(contextDepencies.concat(dirs));
        compilation.contextDepencies = contextDepencies; // eslint-disable-line
      }
      callback();
    });
  }
}
