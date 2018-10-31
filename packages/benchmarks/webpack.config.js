const babelPreset = require('../../scripts/babel/preset');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const styleSheet = require('style-sheet/babel');
const { RawSource } = require('webpack-sources');
const path = require('path');

class StyleSheetPlugin {
  apply(compiler) {
    compiler.plugin('emit', (compilation, cb) => {
      compilation.assets['style-sheet-bundle.css'] = new RawSource(styleSheet.getCss());
      cb();
    });
  }
}

const appDirectory = path.resolve(__dirname);

module.exports = {
  mode: 'production',
  context: __dirname,
  entry: './src/index',
  output: {
    path: path.resolve(appDirectory, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true, localIdentName: '[hash:base64:8]' }
          }
        ]
      },
      {
        test: /\.js$/,
        include: [path.resolve(appDirectory, 'src')],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
            presets: babelPreset,
            plugins: ['styled-jsx/babel', styleSheet.default]
          }
        }
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    }),
    new StyleSheetPlugin()
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  }
};
