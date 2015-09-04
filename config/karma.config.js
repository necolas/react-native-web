var assign = require('object-assign')
var path = require('path')
var webpackConfig = require('./webpack-base.config.js')

module.exports = function (config) {
  config.set({
    basePath: path.resolve(__dirname, '..'),
    browsers: [ 'Chrome' ],
    browserNoActivityTimeout: 60000,
    client: {
      captureConsole: true,
      mocha: {
        ui: 'tdd'
      },
      useIframe: true
    },
    files: [
      'src/specs.bundle.js'
    ],
    frameworks: [
      'mocha'
    ],
    plugins: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],
    preprocessors: {
      'src/specs.bundle.js': [ 'webpack', 'sourcemap' ]
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
