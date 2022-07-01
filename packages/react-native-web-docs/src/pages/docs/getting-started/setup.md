---
title: Setup
date: Last Modified
permalink: /docs/setup/index.html
eleventyNavigation:
  key: Setup
  parent: Start
  order: 2
---

:::lead
How to integrate React Native for Web with various development tools.
:::

Find out about package aliasing, package optimization, using types, and customizing the app's HTML shell.

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

[Jest](https://facebook.github.io/jest/) can be configured to understand the aliased module.

```js
{
  "moduleNameMapper": {
    "^react-native$": "react-native-web"
  }
}
```

### Flow

[Flow](https://flow.org) can be configured to understand the aliased module.

```yml
[options]
# Alias the package name
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

## Package optimization

The project's Babel plugin (see [Installation]({{ '/docs/installation' | url }})) is recommended for build-time optimizations and to prune modules not used by your application.

```js
{
  "plugins": ['react-native-web']
}
```

---

## Types

Flow can be configured to pull types from React Native for Web's source code.

```yml
[options]
# Point flow to the 'module' field by default
module.system.node.main_field=module
module.system.node.main_field=main
```

---

## Root element

Full-screen React Native apps with a root `<ScrollView>` may require the following styles inlined in the HTML document shell. ([Example](https://codesandbox.io/s/52x1871vjl?file=/public/index.html:352-644).)

```css
/* These styles make the body full-height */
html, body { height: 100%; }
/* These styles disable body scrolling if you are using <ScrollView> */
body { overflow: hidden; }
/* These styles make the root element full-height */
#root { display:flex; height:100%; }
```
