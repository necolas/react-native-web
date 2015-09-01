'use strict';

var webpackConfig = require('./webpack-base.config.js');
// entry is determined by karma config 'files' array
webpackConfig.devtool = 'inline-source-map'
webpackConfig.entry = {};

module.exports = function (config) {
  config.set({
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
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: {
        assetsSort: 'name',
        colors: true,
        children: false,
        chunks: false,
        modules: false
      }
    }
  });
};
