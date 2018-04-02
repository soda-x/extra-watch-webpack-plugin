
[![NPM version](https://img.shields.io/npm/v/extra-watch-webpack-plugin.svg?style=flat)](https://npmjs.org/package/extra-watch-webpack-plugin) [![Build Status](https://travis-ci.org/pigcan/extra-watch-webpack-plugin.svg?branch=master)](https://travis-ci.org/pigcan/extra-watch-webpack-plugin) [![Build status](https://ci.appveyor.com/api/projects/status/2wjjvxjdxb2p18iq/branch/master?svg=true)](https://ci.appveyor.com/project/pigcan/extra-watch-webpack-plugin/branch/master) [![Coverage Status](https://coveralls.io/repos/github/pigcan/extra-watch-webpack-plugin/badge.svg?branch=master)](https://coveralls.io/github/pigcan/extra-watch-webpack-plugin?branch=master) [![Dependency Status](https://david-dm.org/pigcan/extra-watch-webpack-plugin.svg)](https://david-dm.org/pigcan/extra-watch-webpack-plugin) [![Greenkeeper badge](https://badges.greenkeeper.io/pigcan/extra-watch-webpack-plugin.svg)](https://greenkeeper.io/)


<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
  <h1>extra watch webpack plugin</h1>
  <p>extra-watch-webpack-plugin would help you to attach extra files or dirs to webpack's watch system</p>
  <p>support webpack@1,2,3,4</p>
</div>

<h2 align="center">Install</h2>

```sh
npm install --save extra-watch-webpack-plugin
```

<h2 align="center">Options</h2>

- `files`: `string` (absolute path or glob pattern) or `array`, default `[]`, attach extra files to webpack's watch system
- `dirs`: `string` or `array`, default `[]`, attach extra dirs to webpack's watch system

<h2 align="center">Usage</h2>

```js
// webpack.config.js
import ExtraWatchWebpackPlugin from 'extra-watch-webpack-plugin';
......
{
  plugins: [
    new ExtraWatchWebpackPlugin({
      files: [ 'path/to/file', 'src/**/*.json' ],
      dirs: [ 'path/to/dir' ],
    }),
  ],
}
```
