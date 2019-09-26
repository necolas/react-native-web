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
yarn add react react-dom react-native-web
```

## Starter kits

[create-react-app](https://github.com/facebook/create-react-app)
includes built-in support for aliasing `react-native-web` to `react-native`.

```
create-react-app my-app
```

## Configuring a module bundler

If you have a custom setup, you may choose to configure your module bundler to
alias the package to `react-native`.

For example, modify your [webpack](https://github.com/webpack/webpack)
configuration as follows:

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

Now you can create your components and applications with the React Native API.

## Configuring Babel

[Babel](https://babeljs.io/) supports module aliasing using
[babel-plugin-module-resolver](https://www.npmjs.com/package/babel-plugin-module-resolver)

```
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

## Configuring Jest

[Jest](https://facebook.github.io/jest/) can be configured using the provided
preset. This will map `react-native` to `react-native-web` and provide
appropriate mocks:

```
{
  "preset": "react-native-web"
}
```

Please refer to the Jest documentation for more information.

## Configuring Flow

[Flow](https://flow.org) can be configured to understand the aliased module:

```
[options]
module.name_mapper='^react-native$' -> 'react-native-web'
```

You may also need to include a custom libdef
([example](https://gist.github.com/paularmstrong/f60b40d16fc83e1e8e532d483336f9bb))
in your config.

## Configuring Node.js

Node.js can alias `react-native` to `react-native-web` using
[`module-alias`](https://www.npmjs.com/package/module-alias). This is useful if
you want to pre-render the app (e.g., server-side rendering or build-time
rendering).  

```js
// Install the `module-alias` package as a dependency first
const moduleAlias = require("module-alias");
moduleAlias.addAliases({
  "react-native": require.resolve("react-native-web"),
});
moduleAlias();
```

## Other notes

### Safari flexbox performance

Safari prior to version 10.1 can suffer from extremely [poor flexbox
performance](https://bugs.webkit.org/show_bug.cgi?id=150445). The recommended
way to work around this issue (as used on mobile.twitter.com) is to set
`display:block` on Views in your element hierarchy that you know don't need
flexbox layout.
