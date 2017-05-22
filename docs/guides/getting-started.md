# Getting started

This guide will help you to correctly configure build and test tools to work
with React Native for Web.

Alternatively, you can quickly setup a local project using
[create-react-app](https://github.com/facebookincubator/create-react-app)
(which supports `react-native-web` out-of-the-box once installed),
[react-native-web-starter](https://github.com/grabcode/react-native-web-starter),
or [react-native-web-webpack](https://github.com/ndbroadbent/react-native-web-webpack).

It is recommended that your application provide a `Promise` and `Array.from`
polyfill.

## Webpack and Babel

[Webpack](webpack.js.org) is a popular build tool for web apps. Below is an
example of how to configure a build that uses [Babel](https://babeljs.io/) to
compile your JavaScript for the web.

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
  ],

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

More significant platform differences should use platform-specific files (see
the webpack configuration above for resolving `*.web.js` files):

For example, with the following files in your project:

```
MyComponent.android.js
MyComponent.ios.js
MyComponent.web.js
```

And the following import:

```js
import MyComponent from './MyComponent';
```

React Native will automatically import the correct variant for each specific
target platform.

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

Rendering within `ReactDOM.render` also works when introducing
`react-native-web` to an existing web app, but otherwise it is not recommended.

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

// construct HTML document
const document = `
<!DOCTYPE html>
<html>
<head>
${stylesheet}
</head>
<body>
${initialHTML}
`
```
