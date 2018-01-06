# Getting started

This guide will help you to use and test React Native for Web once it has been installed.

It is recommended that your application provide a `Promise` and `Array.from`
polyfill.

## Adding to a new web app

It's recommended to rely on Facebook's official React web starter kit –
[create-react-app](https://github.com/facebookincubator/create-react-app) –
which has built-in React Native for Web support (once you install
`react-native-web`).

## Adding to an existing web app

Add [`babel-plugin-react-native-web`](https://www.npmjs.com/package/babel-plugin-react-native-web)
to your Babel configuration. This will alias `react-native` to
`react-native-web` and exclude any modules not required by the app.

## Client-side rendering

Render apps using `AppRegistry`:

```js
// index.web.js

import App from './src/App';
import React from 'react';
import { AppRegistry } from 'react-native';

// register the app
AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('react-app')
});
```

Render components within existing apps:

```js
import AppHeader from './src/AppHeader';
import React from 'react';
import { render } from 'react-native';

render(<AppHeader />, document.getElementById('react-app-header'))
```

Components will also be rendered within a tree produced by calling
`ReactDOM.render` (i.e., an existing web app), but
otherwise it is not recommended.

## Server-side rendering

Server-side rendering is supported using `AppRegistry`:

```js
import App from './src/App';
import ReactDOMServer from 'react-dom/server'
import { AppRegistry } from 'react-native'

// register the app
AppRegistry.registerComponent('App', () => App)

// prerender the app
const { element, stylesheets } = AppRegistry.getApplication('App', { initialProps });
const initialHTML = ReactDOMServer.renderToString(element);
const initialStyles = stylesheets.map((sheet) => ReactDOMServer.renderToStaticMarkup(sheet)).join('\n');

// construct HTML document string
const document = `
<!DOCTYPE html>
<html>
<head>
${initialStyles}
</head>
<body>
${initialHTML}
`
```

## Web-specific code

Minor platform differences can use the `Platform` module.

```js
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  height: (Platform.OS === 'web') ? 200 : 100,
});
```

More significant platform differences should use platform-specific files (see
the webpack configuration below for resolving `*.web.js` files):

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

## Testing with Jest

[Jest](https://facebook.github.io/jest/) can be configured to improve snapshots
of `react-native-web` components.

```
{
  "snapshotSerializers": [ "enzyme-to-json/serializer", "react-native-web/jest/serializer" ]
}
```

Jest also needs to map `react-native` to `react-native-web` (unless you are
using the Babel plugin).

```
{
  "moduleNameMapper": {
    "react-native": "<rootDir>/node_modules/react-native-web"
  }
}
```

Please refer to the Jest documentation for more information.

## Web packaging for existing React Native apps

The web packaging landscape is diverse and fractured. Packaging web apps is
subtly different to packaging React Native apps and is also complicated by the
need to code-split non-trivial apps.

What follows is merely an _example_ of one basic way to package a web app
using [Webpack](https://webpack.js.org) and [Babel](https://babeljs.io/).

Install webpack-related dependencies, for example:

```
yarn add --dev babel-loader url-loader webpack webpack-dev-server babel-plugin-transform-runtime
```

Create a `web/webpack.config.js` file:

```js
// web/webpack.config.js

const path = require('path');
const webpack = require('webpack');

const appDirectory = path.resolve(__dirname, '../');

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.js$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled')
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // Babel configuration (or use .babelrc)
      // This aliases 'react-native' to 'react-native-web' and includes only
      // the modules needed by the app.
      plugins: ['react-native-web', 'transform-runtime'],
      // The 'react-native' preset is recommended to match React Native's packager
      presets: ['react-native']
    }
  }
};

// This is needed for webpack to import static images in JavaScript files.
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
  // your web-specific entry file
  entry: path.resolve(appDirectory, 'index.web.js'),

  // configures where the build ends up
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist')
  },

  // ...the rest of your config

  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration
    ]
  },

  plugins: [
    // `process.env.NODE_ENV === 'production'` must be `true` for production
    // builds to eliminate development checks and reduce build size. You may
    // wish to include additional optimizations.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      __DEV__: process.env.NODE_ENV === 'production' || true
    })
  ],

  resolve: {
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: [ '.web.js', '.js' ]
  }
}
```

To run in development from the root of your application:

```
./node_modules/.bin/webpack-dev-server -d --config ./web/webpack.config.js --inline --hot --colors
```

To build for production:

```
./node_modules/.bin/webpack -p --config ./web/webpack.config.js
```

Please refer to the Webpack documentation for more information on configuration.

## Other notes

### Safari flexbox performance

Safari prior to version 10.1 can suffer from extremely [poor flexbox
performance](https://bugs.webkit.org/show_bug.cgi?id=150445). The recommended
way to work around this issue (as used on mobile.twitter.com) is to set
`display:block` on Views in your element hierarchy that you know don't need
flexbox layout.

### Platform-specific component props

There are properties that do not work across all platforms. All web-specific
props are annotated with `(web)` in the documentation.
