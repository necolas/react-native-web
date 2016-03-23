var webpack = require('webpack')

const DIST_DIRECTORY = './dist'

module.exports = {
  entry: {
    main: DIST_DIRECTORY
  },
  output: {
    filename: 'ReactNative.js',
    library: 'React',
    libraryTarget: 'umd',
    path: DIST_DIRECTORY
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
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
