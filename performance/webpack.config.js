const path = require('path');
const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    performance: './performance/index'
  },
  output: {
    path: path.resolve(__dirname, '../dist-performance'),
    filename: 'performance.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { cacheDirectory: true }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.optimize.DedupePlugin(),
    // https://github.com/animatedjs/animated/issues/40
    new webpack.NormalModuleReplacementPlugin(
      /es6-set/,
      path.join(__dirname, '../src/modules/polyfills/Set.js')
    ),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        dead_code: true,
        screw_ie8: true,
        warnings: true
      }
    })
  ],
  resolve: {
    alias: {
      'react-native': path.join(__dirname, '../src')
    }
  }
};
