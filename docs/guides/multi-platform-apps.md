# Multi-platform applications

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
yarn add --dev babel-plugin-react-native-web
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

```
./node_modules/.bin/webpack-dev-server -d --config ./web/webpack.config.js --inline --hot --colors
```

To build for production:

```
./node_modules/.bin/webpack -p --config ./web/webpack.config.js
```

Please refer to the Webpack documentation for more information on configuration.
