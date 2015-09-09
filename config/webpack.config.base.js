var autoprefixer = require('autoprefixer-core')
var webpack = require('webpack')

var DedupePlugin = webpack.optimize.DedupePlugin
var OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

var plugins = [
  new DedupePlugin(),
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
        test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader?module&localIdentName=[hash:base64:5]',
          '!postcss-loader'
        ].join('!')
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { cacheDirectory: true }
      }
    ]
  },
  plugins: plugins,
  postcss: [ autoprefixer ]
}
