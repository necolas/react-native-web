var assign = require('object-assign')
var constants = require('./constants')
var webpackConfig = require('./webpack.config.base')

module.exports = function (config) {
  config.set({
    basePath: constants.ROOT_DIRECTORY,
    browsers: [ process.env.TRAVIS ? 'Firefox' : 'Chrome' ],
    browserNoActivityTimeout: 60000,
    client: {
      captureConsole: true,
      mocha: {
        ui: 'tdd'
      },
      useIframe: true
    },
    files: [
      'src/specs.context.js'
    ],
    frameworks: [
      'mocha'
    ],
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],
    preprocessors: {
      'src/specs.context.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'dots' ],
    singleRun: true,
    webpack: assign({}, webpackConfig, { devtool: 'inline' }),
    webpackMiddleware: {
      stats: {
        assetsSort: 'name',
        colors: true,
        children: false,
        chunks: false,
        modules: false
      }
    }
  })
}
