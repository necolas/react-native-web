# Client and Server rendering

It's recommended that you use a module loader that supports package aliases
(e.g., webpack), and alias `react-native` to `react-native-web`.

```js
// webpack.config.js

module.exports = {
  // ...other configuration
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  }
}
```

The `react-native-web` package also includes a `core` module that exports only
`ReactNative`, `Image`, `StyleSheet`, `Text`, `TextInput`, and `View`.

```js
// webpack.config.js

module.exports = {
  // ...other configuration
  resolve: {
    alias: {
      'react-native': 'react-native-web/core'
    }
  }
}
```

## Client-side rendering

Rendering without using the `AppRegistry`:

```js
import React from 'react'
import ReactNative from 'react-native'

// component that renders the app
const AppHeaderContainer = (props) => { /* ... */ }

ReactNative.render(<AppHeaderContainer />, document.getElementById('react-app-header'))
```

Rendering using the `AppRegistry`:

```js
import React from 'react'
import ReactNative, { AppRegistry } from 'react-native'

// component that renders the app
const AppContainer = (props) => { /* ... */ }

// register the app
AppRegistry.registerComponent('App', () => AppContainer)

AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('react-app')
})
```

## Server-side rendering

Rendering using the `AppRegistry`:

```js
import ReactDOMServer from 'react-dom/server'
import ReactNative, { AppRegistry } from 'react-native'

// component that renders the app
const AppContainer = (props) => { /* ... */ }

// register the app
AppRegistry.registerComponent('App', () => AppContainer)

// prerender the app
const { element, stylesheet } = AppRegistry.getApplication('App', { initialProps });
const initialHTML = ReactDOMServer.renderToString(element);
```
