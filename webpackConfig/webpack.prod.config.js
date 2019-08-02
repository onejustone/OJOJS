const { resolve } = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const prodConfig = require('./config/production');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const devWebpackConfig = merge(baseWebpackConfig, {
  entry: prodConfig.entry,

  output: {
    path: prodConfig.outputPath
  },

  plugins: [
    new CleanWebpackPlugin(resolve(__dirname, '../dist')),
    new HtmlWebpackPlugin({
      template: resolve(prodConfig.entryFoldPath, 'index.html'),
      /*
      因为和 webpack 4 的兼容性问题，chunksSortMode 参数需要设置为 none
      https://github.com/jantimon/html-webpack-plugin/issues/870
      */
      chunksSortMode: 'none'
    }),
    /*
    使用文件路径的 hash 作为 moduleid。
    虽然我们使用 [chunkhash] 作为 chunk 的输出名，但仍然不够。
    因为 chunk 内部的每个 module 都有一个 id，webpack 默认使用递增的数字作为 moduleid。
    如果引入了一个新文件或删掉一个文件，可能会导致其他文件的 moduleid 也发生改变，
    那么受影响的 module 所在的 chunk 的 [chunkhash] 就会发生改变，导致缓存失效。
    因此使用文件路径的 hash 作为 moduleid 来避免这个问题。
    */
    new Webpack.HashedModuleIdsPlugin()
  ]
});

module.exports = devWebpackConfig;
