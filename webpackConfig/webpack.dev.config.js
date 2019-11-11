const { resolve } = require('path');
const merge = require('webpack-merge');
const devConfig = require('./config/development');
const baseWebpackConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const internalIp = require('internal-ip');

const devWebpackConfig = merge(baseWebpackConfig, {
  entry: devConfig.entry,

  output: {
    path: devConfig.outputPath
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../demo/example/index.html'),
      /*
      因为和 webpack 4 的兼容性问题，chunksSortMode 参数需要设置为 none
      https://github.com/jantimon/html-webpack-plugin/issues/870
      */
      chunksSortMode: 'none'
    })
  ]
});

module.exports = devWebpackConfig;

module.exports.serve = {
  clientLogLevel: 'warning',
  historyApiFallBack: true,
  host: '0.0.0.0',
  port: devConfig.serve.port,
  // 开发环境允许其他电脑访问
  hot: {
    host: {
      client: internalIp.v4.sync(),
      server: '0.0.0.0'
    }
  }
  // dev: {
  //   publicPath: config.publicPath
  // }
};
