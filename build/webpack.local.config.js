const merge = require('webpack-merge');
const localConfig = require('./config/local');
const devWebpackConfig = require('./webpack.dev.config');

const localWebapckConfig = merge(devWebpackConfig);

module.exports = localWebapckConfig;

