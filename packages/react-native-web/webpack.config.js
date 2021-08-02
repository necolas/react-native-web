const babelPreset = require('../../scripts/babel/preset');
const path = require('path');
const webpack = require('webpack');

const appDirectory = path.resolve(__dirname);

const comment = `Copyright (c) Nicolas Gallagher
Copyright (c) Facebook, Inc. and its affiliates.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
 
@noflow
@nolint
@preventMunge
@generated
@fullSyntaxTransform`;

module.exports = {
  mode: 'none',
  devtool: false,
  context: __dirname,
  entry: './src/index',
  externals: {
    react: 'react',
    'react-dom': 'react-dom'
  },
  output: {
    path: path.resolve(appDirectory, 'dist'),
    filename: 'bundle.js',
    library: {
      type: 'commonjs2'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(appDirectory, 'src')],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
            presets: [babelPreset]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(comment),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  }
};
