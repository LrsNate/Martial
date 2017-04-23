const config = require('./webpack.config.js');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies

config.plugins = [new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: '"production"',
  },
})];

config.plugins.push(new webpack.optimize.UglifyJsPlugin({ sourceMap: false }));

config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());

module.exports = config;
