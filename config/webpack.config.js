var constants = require('./constants')
var webpack = require('webpack')

module.exports = {
  entry: {
    main: constants.DIST_DIRECTORY
  },
  externals: [{
    'react': true,
    'react-dom': true,
    'react-dom/server': true
  }],
  output: {
    filename: 'react-native-web.js',
    library: 'ReactNativeWeb',
    libraryTarget: 'umd',
    path: constants.DIST_DIRECTORY
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': 'production' }),
    new webpack.optimize.DedupePlugin(),
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
