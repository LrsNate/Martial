const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractCss = new ExtractTextPlugin('app.css');

module.exports = {
  entry: {
    app: './app/app.js',
  },
  output: {
    path: `${__dirname}/dist/generated-src`,
    filename: '[name].js',
  },
  module: {
    rules: [
      { test: /\.json$/, use: 'json-loader' },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.html$/,
        use: 'raw-loader',
      },
      {
        test: /\.css$/,
        use: extractCss.extract('css-loader'),
      },
      {
        test: /\.scss$/,
        use: extractCss.extract(['css-loader', 'sass-loader']),
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    extractCss,
    new HtmlWebpackPlugin({
      template: './app/index.html',
    }),
    new CopyWebpackPlugin([
      { from: './app/index.js' },
      { from: './app/package.json' },
    ]),
    new CleanWebpackPlugin(['dist/generated-src'], { verbose: true }),
  ],
  target: 'electron-renderer',
  node: {
    electron: 'empty',
    fs: 'empty',
    http: 'empty',
    path: 'empty',
  },
};
