var autoprefixer = require('autoprefixer-core');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var localcss = require('postcss-modules-local-by-default');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?localIdentName=[hash:base64:5]!postcss-loader'
        )
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { cacheDirectory: true }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('react-web-sdk.css')
  ],
  postcss: [ autoprefixer, localcss ]
};
