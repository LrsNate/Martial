const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  entry: './app/app.js',
  output: {
    path: `${__dirname}/app`,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  target: 'electron',
  node: {
    fs: 'empty',
    http: 'empty',
    path: 'empty',
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
  ],
};
