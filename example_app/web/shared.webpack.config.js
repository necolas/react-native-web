// @flow
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  productionPlugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
      exclude: [/\.min\.js$/gi],  // skip pre-minified libs
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'zopfli',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],

  loaders: [
    {
      test: /\.ttf$/,
      loader: 'url-loader',
      include: path.resolve(__dirname, '../node_modules/react-native-vector-icons'),
    },
    {
      test: /\.json$/,
      loader: 'json-loader',
    },
    {
      // Many react-native libraries do not compile their ES6 JS.
      test: /\.js$/,
      include: /node_modules\/react-native-/,
      // react-native-web is already compiled.
      exclude: /node_modules\/react-native-web\//,
      loader: 'babel-loader',
      query: { cacheDirectory: true },
    },
    {
      test: /\.(gif|jpe?g|png|svg)$/,
      loader: 'url-loader',
      query: { name: 'images/[name]-[hash:16].[ext]' },
    },
    {
      test: /\.(mp3|wav)$/,
      loader: 'file-loader',
      query: { name: 'sounds/[name]-[hash:16].[ext]' },
    },
  ],
}
