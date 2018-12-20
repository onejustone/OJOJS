const { resolve } = require('path');
const merge = require('webpack-merge');
const prodConfig = require('./config/production');
const baseWebpackConfig = require('./webpack.base.config');
const CleanWebpackPlugin = require('clean-webpack-plugin')

const devWebpackConfig = merge(baseWebpackConfig, {
  entry: prodConfig.entry,

  output: {
    path: prodConfig.outputPath
  },

  plugins: [
    new CleanWebpackPlugin(resolve(__dirname, '../dist'))
  ]
});

module.exports = devWebpackConfig;
