var assign = require('object-assign')
var base = require('./webpack-base.config.js')
var webpack = require('webpack')
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

var plugins = []
if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new UglifyJsPlugin({
      compress: {
        dead_code: true,
        drop_console: true,
        screw_ie8: true,
        warnings: true
      }
    })
  )
}

module.exports = assign({}, base, {
  entry: {
    main: './src/index'
  },
  externals: [{
    react: true
  }],
  output: {
    filename: 'react-native-web.js',
    library: 'ReactNativeWeb',
    libraryTarget: 'commonjs2',
    path: './dist'
  },
  plugins: plugins
})
