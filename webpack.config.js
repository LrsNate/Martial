module.exports = {
  entry: './app/app.js',
  output: {
    path: `${__dirname}/app`,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
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
};
