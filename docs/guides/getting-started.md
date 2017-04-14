# Getting started

## Webpack

Working with React Native for Web is easiest with webpack.

### alias

Alias `react-native-web` to `react-native` in order to load the web
implementation when importing `react-native`.

```js
// webpack.config.js

module.exports = {
  // ...rest of config
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  }
}
```

### loaders


In order to require image assets (e.g. `require('assets/myimage.png')`), add
the `url-loader` to the webpack config:

To support modern ES features, use the `babel-loader`. Many OSS React Native
packages are not compiled to ES5 before being published.  This can result in
webpack build errors. To avoid this issue you should configure webpack (or your
bundler of choice) to run `babel-preset-react-native` over the necessary
`node_module`.


```js
// webpack.config.js

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          // local app code
          path.resolve(__dirname, 'src'),
          // dependency that wasn't transpiled to ES5
          path.resolve(__dirname, 'node_modules/react-native-something')
        ],
        use: {
          loader: 'babel-loader',
          query: { cacheDirectory: true }
        }
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: {
          loader: 'url-loader',
          query: { name: '[name].[ext]' }
        }
      }
    ]
  }
};
```

Please refer to the Webpack documentation for more information.

## Jest

Alias `react-native-web` to `react-native` in your Jest config.

```
"jest": {
  "moduleNameMapper": {
    "react-native": "<rootDir>/node_modules/react-native-web"
  }
}
```

Please refer to the Jest documentation for more information.

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
with the extension `.web.js`. Webpack@1 will automatically resolve these files.
Webpack@2 requires additional configuration.

```js
// webpack.config.js

module.exports = {
  // ...
  resolve: {
    extensions: [ '.web.js', '.js' ]
  }
};
```

## Build optimizations

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
