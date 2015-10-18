var webpack = require('webpack')

var DedupePlugin = webpack.optimize.DedupePlugin
var EnvironmentPlugin = webpack.EnvironmentPlugin
var OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

var plugins = [
  new DedupePlugin(),
  new EnvironmentPlugin('NODE_ENV'),
  new OccurenceOrderPlugin()
]

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

module.exports = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { cacheDirectory: true }
      }
    ]
  },
  plugins: plugins
}
