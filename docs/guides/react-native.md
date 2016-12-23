# React Native

Use a module loader that supports package aliases (e.g., webpack), and alias
`react-native` to `react-native-web`.

```js
// webpack.config.js

module.exports = {
  // ...
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  }
}
```

## Image assets

In order to require image assets (e.g. `require('assets/myimage.png')`), add
the `url-loader` to the webpack config:

```js
// webpack.config.js

module.exports = {
  // ...
  module: {
    loaders: [
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        loader: 'url-loader',
        query: { name: '[name].[hash:16].[ext]' }
      }
    ]
  }
};
```

## Dependencies

Many OSS React Native packages are not compiled to ES5 before being published.
This can result in webpack build errors. To avoid this issue you should
configure webpack (or your bundler of choice) to run
`babel-preset-react-native` over the necessary `node_module`. For example:

```js
// webpack.config.js

module.exports = {
  // ...
  module: {
    loaders: [
      {
        // transpile to ES5
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/react-native-something')
        ],
        loader: 'babel-loader',
        query: { cacheDirectory: true }
      }
    ]
  }
};
```

Please refer to the webpack documentation for more information.

## Web-specific code

Minor platform differences can use the `Platform` module.

```js
import { AppRegistry, Platform } from 'react-native'

AppRegistry.registerComponent('MyApp', () => MyApp)

if (Platform.OS === 'web') {
  AppRegistry.runApplication('MyApp', {
    rootTag: document.getElementById('react-root')
  });
}
```

More substantial Web-specific implementation code should be written in files
with the extension `.web.js`, which webpack will automatically resolve.

## Optimizations

Production builds can benefit from dead-code elimination by defining the
following variables:

```js
// webpack.config.js

module.exports = {
  // ...
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  }
}
```
