# Getting started

It is recommended that your application provide a `Promise` and `Array.from`
polyfill.

## Webpack and Babel

[Webpack](webpack.js.org) is a popular build tool for web apps. Below is a
basic example of how to configure a build that uses [Babel](https://babeljs.io/) to
compile your JavaScript for the web.

See the [example app](/example_app/README.md) for a complete webpack configuration that is optimized for development and production.

```js
// webpack.config.js

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.js$/,
  // Add every directory that needs to be compiled by Babel during the build
  include: [
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'node_modules/react-native-uncompiled')
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'react-native' preset is recommended
      presets: ['react-native']
    }
  }
};

// This is needed for webpack to import static images in JavaScript files
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]'
    }
  }
};

module.exports = {
  // ...the rest of your config

  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration
    ]
  },

  plugins: [
    // `process.env.NODE_ENV === 'production'` must be `true` for production
    // builds to eliminate development checks and reduce build size.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  },

  resolve: {
    // Maps the 'react-native' import to 'react-native-web'.
    alias: {
      'react-native': 'react-native-web'
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: [ '.web.js', '.js' ]
  }
}
```

Please refer to the Webpack documentation for more information.

## Jest

[Jest](https://facebook.github.io/jest/) also needs to map `react-native` to `react-native-web`.

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

## Client-side rendering

Rendering using `ReactNative`:

```js
import React from 'react'
import ReactNative from 'react-native'

// component that renders the app
const AppHeaderContainer = (props) => { /* ... */ }

ReactNative.render(<AppHeaderContainer />, document.getElementById('react-app-header'))
```

Rendering using `AppRegistry`:

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

Rendering within `ReactDOM.render` also works when introduce `react-native-web`
to an existing web app, but it is not recommended oherwise.

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
