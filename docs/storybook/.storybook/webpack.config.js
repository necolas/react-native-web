const path = require('path');
const webpack = require('webpack');

module.exports = (storybookBaseConfig, configType) => {
  const DEV = configType === 'DEVELOPMENT';

  storybookBaseConfig.module.rules.push({
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: { cacheDirectory: true }
    }
  });

  storybookBaseConfig.module.rules.push({
    test: /\.(gif|jpe?g|png|svg)$/,
    use: {
      loader: 'url-loader',
      options: { name: '[name].[ext]' }
    }
  });

  storybookBaseConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.__REACT_NATIVE_DEBUG_ENABLED__': DEV
    })
  );

  storybookBaseConfig.resolve.alias = {
    'react-native': path.join(__dirname, '../../../src/module')
  };

  return storybookBaseConfig;
};
