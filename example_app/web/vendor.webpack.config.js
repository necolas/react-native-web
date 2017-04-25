// @flow
/* eslint-disable import/no-extraneous-dependencies, global-require, import/no-dynamic-require  */
/* eslint-disable no-underscore-dangle  */
const __DEV__ = process.env.NODE_ENV === 'development'

const path = require('path')
const webpack = require('webpack')
const config = require('./shared.webpack.config.js')

// We need a separate build for dev, which is unminified and includes PropTypes.
const outputPath = path.join(__dirname, __DEV__ ? 'vendor-dev' : 'vendor')
const outputFilename = __DEV__ ? '[name].dll.js' : '[name]-[hash:16].dll.js'

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    __DEV__,
  }),

  ...(__DEV__ ? [] : config.productionPlugins),

  new webpack.DllPlugin({
    name: '[name]',
    path: path.join(outputPath, '[name]-manifest.json'),
  }),
]

module.exports = {
  entry: {
    // Put react-native-web / react dependencies in here.
    'react': [
      'react-native-web',
    ],
    // Put any other other core libs in here. (immutable, redux, localforage, etc.)
    // 'core': [
    // ],
  },
  output: {
    filename: outputFilename,
    path: outputPath,
    library: '[name]',
  },

  module: {
    noParse: /localforage\/dist\/localforage.js/,
    loaders: config.loaders,
  },

  plugins,
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
    extensions: ['.web.js', '.js', '.json'],
  },
}
