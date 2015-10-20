var assign = require('object-assign')
var base = require('./webpack.config.base')
var constants = require('./constants')
var path = require('path')

module.exports = assign({}, base, {
  devServer: {
    contentBase: constants.EXAMPLES_DIRECTORY
  },
  entry: {
    example: path.join(constants.EXAMPLES_DIRECTORY, 'index')
  },
  output: {
    filename: 'examples.js',
    path: constants.DIST_DIRECTORY
  }
})
