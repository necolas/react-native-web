---
title: Multi-platform setup
date: Last Modified
permalink: /docs/multi-platform/index.html
eleventyNavigation:
  key: Multi-platform
  parent: Start
  order: 2
---

:::lead
An overview of how to integrate React Native for Web into an existing React Native codebase.
:::

If you are interested in making a multi-platform app it is strongly recommended that you use Expo (or learn from the source code for the Web integration). Expo includes [web support](https://docs.expo.io/versions/v35.0.0/guides/running-in-the-browser/) and takes care of all the configuration work required.

If you have an existing application, this guide will surface the areas that require attention and customization before most web bundlers can consume the non-standard JavaScript in packages produced by the React Native ecosystem. Additionally, 3rd party React Native packages with web support are listed in the [React Native Directory](https://reactnative.directory/?web=true).

---

## Package aliasing

### Bundler

Configure your module bundler to alias the package to `react-native`. For example, modify your [webpack](https://github.com/webpack/webpack) configuration as follows:

```js
// webpack.config.js
module.exports = {
  // ...the rest of your config

  resolve: {
    alias: {
      'react-native$': 'react-native-web'
    }
  }
}
```

### Compiler

[Babel](https://babeljs.io/) supports module aliasing using [babel-plugin-module-resolver](https://www.npmjs.com/package/babel-plugin-module-resolver)

```js
{
  "plugins": [
    ["module-resolver", {
      "alias": {
        "^react-native$": "react-native-web"
      }
    }]
  ]
}
```

### Jest

[Jest](https://facebook.github.io/jest/) can be configured using the provided preset. This will map `react-native` to `react-native-web` and provide appropriate mocks. Please refer to the Jest documentation for more information.

```js
{
  "preset": "react-native-web"
}
```

### Flow

[Flow](https://flow.org) can be configured to understand the aliased module. You may also need to include a custom libdef ([example](https://gist.github.com/paularmstrong/f60b40d16fc83e1e8e532d483336f9bb)) in your config.

```yml
[options]
module.name_mapper='^react-native$' -> 'react-native-web'
```

### Node.js

Node.js can alias `react-native` to `react-native-web` using [`module-alias`](https://www.npmjs.com/package/module-alias). This is useful if you want to pre-render the app (e.g., server-side rendering or build-time rendering).

```js
// Install the `module-alias` package as a dependency first
const moduleAlias = require("module-alias");
moduleAlias.addAliases({
  "react-native": require.resolve("react-native-web"),
});
moduleAlias();
```

---

## Root element

Full-screen React Native apps may require the following styles inlined in the HTML document shell. ([Example](https://codesandbox.io/s/52x1871vjl?file=/public/index.html:352-644).)

```css
/* These styles make the body full-height */
html, body { height: 100%; }
/* These styles disable body scrolling if you are using <ScrollView> */
body { overflow: hidden; }
/* These styles make the root element full-height */
#root { display:flex; height:100%; }
```

---

## Web-specific code

Minor platform differences can use the `Platform` module.

```js
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  height: (Platform.OS === 'web') ? 200 : 100,
});
```

More significant platform differences should use platform-specific files (see the webpack configuration below for resolving `*.web.js` files):

For example, with the following files in your project:

```shell
MyComponent.android.js
MyComponent.ios.js
MyComponent.web.js
```

And the following import:

```js
import MyComponent from './MyComponent';
```

React Native will automatically import the correct variant for each specific target platform.

---

## Compiling and Bundling

What follows is only an _example_ of a basic way to package a Web app using [webpack](https://webpack.js.org) and [Babel](https://babeljs.io/). ([Metro](https://github.com/facebook/metro) is the React Native bundler with [undocumented web support](https://github.com/necolas/react-native-web/issues/1257#issuecomment-541443684).)

Install webpack-related dependencies, for example:

```shell
npm install --save-dev babel-loader url-loader webpack webpack-cli webpack-dev-server
```

React Native's Babel preset rewrites ES modules to CommonJS modules, preventing bundlers from automatically performing "tree-shaking" to remove unused modules from your web app build. To help with this, you can install the following Babel plugin:

```shell
npm install --save-dev babel-plugin-react-native-web
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
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: ['module:metro-react-native-babel-preset'],
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
  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    path.resolve(appDirectory, 'index.web.js')
  ],

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
    // This will only alias the exact import "react-native"
    alias: {
      'react-native$': 'react-native-web'
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: [ '.web.js', '.js' ]
  }
}
```

To run in development from the root of your application:

```shell
./node_modules/.bin/webpack-dev-server -d --config ./web/webpack.config.js --inline --hot --colors
```

To build for production:

```shell
./node_modules/.bin/webpack -p --config ./web/webpack.config.js
```

Please refer to the Webpack documentation for more information on configuration.
