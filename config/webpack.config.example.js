var assign = require('object-assign')
var base = require('./webpack.config.base')
var constants = require('./constants')
var path = require('path')

module.exports = assign({}, base, {
  devServer: {
    contentBase: constants.SRC_DIRECTORY
  },
  entry: {
    example: path.join(constants.SRC_DIRECTORY, 'example')
  },
  output: {
    filename: 'example.js',
    path: constants.DIST_DIRECTORY
  }
})
