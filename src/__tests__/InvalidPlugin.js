export default class InvalidPlugin {
  constructor(cb) {
    this.cb = cb;
  }

  apply(compiler) {
    compiler.plugin('invalid', (changeFilePath) => {
      this.cb(changeFilePath);
    });
  }
}
