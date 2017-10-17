# Getting started

This guide will help you to correctly configure build and test tools to work
with React Native for Web. (Alternatively, you can quickly setup a local
project using the starter kits listed in the README.)

It is recommended that your application provide a `Promise` and `Array.from`
polyfill.

## Web packager

[Webpack](https://webpack.js.org) is a popular build tool for web apps. Below is an
example of how to configure a build that uses [Babel](https://babeljs.io/) to
compile your JavaScript for the web.

Create a `web/webpack.config.js` file:

```js
// web/webpack.config.js

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
      // This aliases 'react-native' to 'react-native-web' and includes only
      // the modules needed by the app
      plugins: ['react-native-web/babel'],
      // The 'react-native' preset is recommended (or use your own .babelrc)
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
    // builds to eliminate development checks and reduce build size. You may
    // wish to include additional optimizations.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
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

To run in development:

```
./node_modules/.bin/webpack-dev-server -d --config web/webpack.config.js --inline --hot --colors
```

To build for production:

```
./node_modules/.bin/webpack -p --config web/webpack.config.js
```

Please refer to the Webpack documentation for more information on configuration.

## Web entry

Create a `index.web.js` file (or simply `index.js` for web-only apps).

### Client-side rendering

Rendering using `AppRegistry`:

```js
// index.web.js

import App from './src/App';
import React from 'react';
import ReactNative, { AppRegistry } from 'react-native';

// register the app
AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('react-app')
});
```

Rendering within existing web apps is also possible using `ReactNative`:

```js
import AppHeader from './src/AppHeader';
import React from 'react';
import ReactNative from 'react-native';

// use .hydrate if hydrating a SSR app
ReactNative.render(<AppHeader />, document.getElementById('react-app-header'))
```

And finally, `react-native-web` components will also be rendering within a tree
produced by calling `ReactDOM.render` (i.e., an existing web app), but
otherwise it is not recommended.

### Server-side rendering

Server-side rendering is supported using the `AppRegistry`:

```js
import App from './src/App';
import ReactDOMServer from 'react-dom/server'
import ReactNative, { AppRegistry } from 'react-native'

// register the app
AppRegistry.registerComponent('App', () => App)

// prerender the app
const { element, stylesheets } = AppRegistry.getApplication('App', { initialProps });
const initialHTML = ReactDOMServer.renderToString(element);
const initialStyles = stylesheets.map((sheet) => ReactDOMServer.renderToStaticMarkup(sheet)).join('\n');

// construct HTML document
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

## Testing with Jest

[Jest](https://facebook.github.io/jest/) can be configured to improve snapshots
of `react-native-web` components.

```
{
  "snapshotSerializers": [ "enzyme-to-json/serializer", "react-native-web/jest/serializer" ]
}
```

Jest also needs to map `react-native` to `react-native-web` (unless you are
using Babel with the `react-native-web/babel` plugin).

```
{
  "moduleNameMapper": {
    "react-native": "<rootDir>/node_modules/react-native-web"
  }
}
```

Please refer to the Jest documentation for more information.
