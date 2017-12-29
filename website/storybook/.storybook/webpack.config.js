const path = require('path');
const webpack = require('webpack');

module.exports = (storybookBaseConfig, configType) => {
  const DEV = configType === 'DEVELOPMENT';

  storybookBaseConfig.module.rules.push({
    test: /\.(gif|jpe?g|png|svg)$/,
    use: {
      loader: 'url-loader',
      options: { name: '[name].[ext]' }
    }
  });

  storybookBaseConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  );

  return storybookBaseConfig;
};
