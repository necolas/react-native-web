var autoprefixer = require('autoprefixer-core');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var localcss = require('postcss-modules-local-by-default');
var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
  entry: {
    main: './src/index'
  },
  externals: [{
    react: true
  }],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?module&localIdentName=[hash:base64:5]!postcss-loader'
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
  output: {
    filename: 'main.js',
    library: 'ReactWebSDK',
    libraryTarget: 'commonjs2',
    path: './dist'
  },
  plugins: [
    new ExtractTextPlugin('react-web-sdk.css'),
    new UglifyJsPlugin({
      compress: {
        dead_code: true,
        drop_console: true,
        screw_ie8: true,
        warnings: true
      }
    })
  ],
  postcss: [ autoprefixer ]
};
