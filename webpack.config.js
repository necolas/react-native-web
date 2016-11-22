const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const DIST_DIRECTORY = './dist'

module.exports = {
  entry: {
    main: DIST_DIRECTORY
  },
  output: {
    filename: 'ReactNative.js',
    library: 'ReactNative',
    libraryTarget: 'umd',
    path: DIST_DIRECTORY
  },
  plugins: [
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    new webpack.optimize.DedupePlugin(),
    // https://github.com/animatedjs/animated/issues/40
    new webpack.NormalModuleReplacementPlugin(
      /es6-set/,
      path.join(__dirname, 'src/modules/polyfills/Set.js')
    ),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        dead_code: true,
        drop_console: true,
        screw_ie8: true,
        warnings: true
      }
    })
  ]
}
