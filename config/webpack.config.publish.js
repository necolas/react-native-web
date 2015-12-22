var assign = require('object-assign')
var base = require('./webpack.config.base')
var constants = require('./constants')

module.exports = assign({}, base, {
  entry: {
    main: constants.SRC_DIRECTORY
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
  }
})
