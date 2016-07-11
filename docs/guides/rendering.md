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

## Client-side rendering

Rendering without using the `AppRegistry`:

```js
import React from 'react'
import ReactNative from 'react-native'

// component that renders the app
const AppHeaderContainer = (props) => { /* ... */ }

// DOM render
ReactNative.render(<AppHeaderContainer />, document.getElementById('react-app-header'))

// Server render
ReactNative.renderToString(<AppHeaderContainer />)
ReactNative.renderToStaticMarkup(<AppHeaderContainer />)
```

Rendering using the `AppRegistry`:

```js
import React from 'react'
import ReactNative, { AppRegistry } from 'react-native'

// component that renders the app
const AppContainer = (props) => { /* ... */ }

// register the app
AppRegistry.registerComponent('App', () => AppContainer)

// DOM render
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('react-app')
})

// prerender the app
const { html, styleElement } = AppRegistry.prerenderApplication('App', { initialProps })
```
