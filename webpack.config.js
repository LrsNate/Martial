const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts',
    main: './src/main.ts',
  },
  output: {
    path: root('dist'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      {
        test: /\.css$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader']})
      },
      { test: /\.css$/, include: root('src', 'app'), loader: 'raw-loader' },
      {
        test: /\.(scss|sass)$/,
        exclude: root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader']})
      },
      { test: /\.(scss|sass)$/, exclude: root('src', 'style'), loader: 'raw-loader!sass-loader' },
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
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
    }),
    new ExtractTextPlugin({ filename: 'css/[name].css' })
  ],
  devtool: 'inline-source-map',
};

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
