# React Native

This is an experimental feature to support: using community-developed React
Native components on the Web; and rendering React Native apps to Web.

Use a module loader that supports package aliases (e.g., webpack), and alias
`react-native` to `react-native-web`.

```js
// webpack.config.js

module.exports = {
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  }
}
```

Web-specific implementations can use the `*.web.js` naming pattern, which
webpack will resolve.

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
