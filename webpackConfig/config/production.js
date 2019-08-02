const { resolve } = require('path');

module.exports = {
  publicPath: 'http://cdn.example.com/assets/',
  entryFoldPath: resolve(__dirname, '../../src/example/'),
  entry: resolve(__dirname, '../../src/example/main.js'),
  outputPath: resolve(__dirname, '../../dist')
};
