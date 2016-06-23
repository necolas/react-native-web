const webpack = require('webpack')

const testEntry = 'tests.webpack.js'

module.exports = function (config) {
  config.set({
    browsers: process.env.TRAVIS ? [ 'Firefox' ] : [ 'Chrome' ],
    browserNoActivityTimeout: 60000,
    client: {
      captureConsole: true,
      mocha: { ui: 'tdd' },
      useIframe: true
    },
    files: [
      testEntry
    ],
    frameworks: [ 'mocha' ],
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sourcemap-loader',
      'karma-webpack'
    ],
    preprocessors: {
      [testEntry]: [ 'webpack', 'sourcemap' ]
    },
    reporters: process.env.TRAVIS ? [ 'dots' ] : [ 'mocha' ],
    singleRun: true,
    webpack: {
      devtool: 'inline-source-map',
      // required by 'enzyme'
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: { cacheDirectory: true }
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('test')
          }
        })
      ]
    },
    webpackServer: {
      noInfo: true
    }
  })
}
