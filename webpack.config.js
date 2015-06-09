var autoprefixer = require('autoprefixer-core');
var localcss = require('postcss-modules-local-by-default');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?localIdentName=[hash:base64:5]!postcss-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { cacheDirectory: true }
      }
    ]
  },
  postcss: [ autoprefixer, localcss ]
};
