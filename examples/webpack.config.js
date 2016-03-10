const path = require('path')
const webpack = require('webpack')

const EXAMPLES_DIRECTORY = __dirname

module.exports = {
  devServer: {
    contentBase: EXAMPLES_DIRECTORY
  },
  entry: {
    example: EXAMPLES_DIRECTORY
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { cacheDirectory: true }
      }
    ]
  },
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  resolve: {
    alias: {
      'react-native': path.join(__dirname, '../src')
    }
  }
}
