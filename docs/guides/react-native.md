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
    loaders: {
      test: /\.(gif|jpe?g|png|svg)$/,
      loader: 'url-loader',
      query: { name: '[name].[hash:16].[ext]' }
    }
  }
```

## Web-specific code

Minor platform differences can use the `Platform` module.

```js
import { AppRegistry, Platform, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  height: (Platform.OS === 'web') ? 200 : 100
})

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
