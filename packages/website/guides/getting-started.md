# Getting started

This guide will help you render components and applications with React Native
for Web.

Your application may need to polyfill `Promise`, `Object.assign`, `Array.from`,
and [`ResizeObserver`](https://github.com/que-etc/resize-observer-polyfill) as
necessary for your desired browser support.

If you're not familiar with setting up a new React web project, please follow
the recommendations in the [React documentation](https://reactjs.org/).

## Install

```
yarn install react react-dom react-native-web
```

And if you need to use `ART`:

```
yarn add react-art
```

## Starter kits

Web: [create-react-app](https://github.com/facebookincubator/create-react-app)
includes built-in support for aliasing `react-native-web` to `react-native`.

```
create-react-app my-app
```

Multi-platform: [create-react-native-app](https://github.com/react-community/create-react-native-app)
includes experimental support for Web.

```
create-react-native-app my-app --with-web-support
```

## Configure module bundler

If you have a custom setup, you may choose to configure your module bundler to
alias the package to `react-native`.

For example, modify your [webpack](https://github.com/webpack/webpack)
configuration as follows:

```
// webpack.config.js
module.exports = {
  // ...the rest of your config

  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  }
}
```

Now you can create your components and applications with the React Native API.

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

Or render individual components:

```js
import AppHeader from './src/AppHeader';
import React from 'react';
import { render } from 'react-native';

render(<AppHeader />, document.getElementById('react-app-header'))
```

(Components will also be rendered within a tree produced by calling
`ReactDOM.render` (i.e., an existing web app), but
otherwise it is not recommended.)

You might need to adjust the styles of the HTML document's root elements for
your app to fill the viewport.

```html
<html style="height:100%">
<body style="height:100%">
<div id="react-root" style="display:flex;height:100%"></div>
```

## Server-side rendering

Server-side rendering to HTML is supported using `AppRegistry`:

```js
import App from './src/App';
import ReactDOMServer from 'react-dom/server';
import { AppRegistry } from 'react-native-web';

// register the app
AppRegistry.registerComponent('App', () => App);

// prerender the app
const { element, getStyleElement } = AppRegistry.getApplication('App', { initialProps });
// first the element
const html = ReactDOMServer.renderToString(element);
// then the styles (optionally include a nonce if your CSP policy requires it)
const css = ReactDOMServer.renderToStaticMarkup(getStyleElement({ nonce }));

// example HTML document string
const document = `
<!DOCTYPE html>
<html style="height:100%">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${css}
<body style="height:100%; overflow-y:hidden">
<div id="root" style="display:flex; height: 100%">
${html}
</div>
<script nonce="${nonce}" src="${bundlePath}"></script>
`
```

## Testing with Jest

[Jest](https://facebook.github.io/jest/) can be configured to alias
`react-native-web` and improve snapshots:

```
{
  "moduleNameMapper": {
    "react-native": "<rootDir>/node_modules/react-native-web"
  },
  "snapshotSerializers": [
    "enzyme-to-json/serializer",
    "react-native-web/jest/serializer"
  ]
}
```

Please refer to the Jest documentation for more information.

## Using Flow

[Flow](https://flow.org) can be configured to understand the aliased module:

```
[options]
module.name_mapper='(react-native)' -> 'react-native-web'
```

## Multi-platform applications

### Web-specific code

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

## Web packaging for existing React Native apps

What follows is merely an _example_ of one basic way to package a web app using
[Webpack](https://webpack.js.org) and [Babel](https://babeljs.io/). (You can
also the React Native bundler, [Metro](https://github.com/facebook/metro), to
build web apps.)

Packaging web apps is subtly different to packaging React Native apps and is
complicated by the need to tree-shake and code-split non-trivial apps.

Install webpack-related dependencies, for example:

```
yarn add --dev babel-loader url-loader webpack webpack-cli webpack-dev-server
```

React Native's Babel preset rewrites ES modules to CommonJS modules, preventing
bundlers from automatically performing "tree-shaking" to remove unused modules
from your web app build. To help with this, you can install the following Babel
plugin:

```
yarn install --dev babel-plugin-react-native-web
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
      // The 'react-native' preset is recommended to match React Native's packager
      presets: ['react-native'],
      // Re-write paths to import only the modules needed by the app
      plugins: ['react-native-web']
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

  resolve: {
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
