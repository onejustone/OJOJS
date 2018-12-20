const { resolve } = require('path');

module.exports = {
  publicPath: 'http://cdn.example.com/assets/',
  entry: resolve(__dirname, '../../src/lib/index.js'),
  outputPath: resolve(__dirname, '../../dist')
};
