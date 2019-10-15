const path = require('path');
const webpack = require('webpack');

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(gif|jpe?g|png|svg)$/,
    use: {
      loader: 'url-loader',
      options: { name: '[name].[ext]' }
    }
  });

  config.resolve.extensions = ['.web.js', '.js', '.json', '.web.jsx', '.jsx'];

  config.resolve.alias = {
    'react-native': 'react-native-web'
  };

  return config;
};
