const path = require('path');
const webpack = require('webpack');

module.exports = storybookBaseConfig => {
  storybookBaseConfig.module.rules.push({
    test: /\.(gif|jpe?g|png|svg)$/,
    use: {
      loader: 'url-loader',
      options: { name: '[name].[ext]' }
    }
  });

  storybookBaseConfig.resolve.extensions = ['.web.js', '.js', '.json', '.web.jsx', '.jsx'];

  storybookBaseConfig.resolve.alias = {
    'react-native': 'react-native-web'
  };

  return storybookBaseConfig;
};
