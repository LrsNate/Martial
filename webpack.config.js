const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const webpack = require('webpack');

module.exports = {
  entry: {
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts',
    main: './src/main.ts',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: 'electron-renderer',
  node: {
    fs: 'empty',
    http: 'empty',
    path: 'empty',
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/index.js' },
      { from: 'src/package.json' },
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
    new CheckerPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'polyfills']
    }),

    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      `./src`, // location of your src
      {} // a map of your routes
    ),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
  devtool: 'inline-source-map',
};
