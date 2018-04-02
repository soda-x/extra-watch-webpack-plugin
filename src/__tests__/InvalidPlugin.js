export default class InvalidPlugin {
  constructor(cb) {
    this.cb = cb;
  }

  apply(compiler) {
    compiler.hooks.invalid.tap('invalid', (changeFilePath) => {
      this.cb(changeFilePath);
    });
  }
}
