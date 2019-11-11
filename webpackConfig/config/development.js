const { resolve } = require('path');

console.log(resolve(__dirname));

const config = {
  publicPath: '/assets/',
  outputPath: '/dist',
  entry: resolve(__dirname, '../../demo/example/main.js'),
  serve: {
    port: 7084
  }
};

module.exports = config;
