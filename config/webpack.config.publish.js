var assign = require('object-assign')
var base = require('./webpack.config.base')
var constants = require('./constants')

module.exports = assign({}, base, {
  entry: {
    main: constants.SRC_DIRECTORY
  },
  externals: [{
    react: true
  }],
  output: {
    filename: 'react-native-web.js',
    library: 'ReactNativeWeb',
    libraryTarget: 'commonjs2',
    path: constants.DIST_DIRECTORY
  }
})
