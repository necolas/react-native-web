# babel-plugin-react-native-web

A Babel plugin that will alias `react-native` to `react-native-web` and exclude
any modules not required by your app (keeping bundle size down).

## Installation

```
yarn add --dev babel-plugin-react-native-web
```

## Usage

**.babelrc**

```
{
  "plugins": ["react-native-web"]
}
```

## Example

NOTE: `react-native-web` internal paths are _not stable_ and you must not rely
on them. Always use the Babel plugin to optimize your build. What follows is an
example of the rewrite performed by the plugin.

**Before**

```js
import { StyleSheet, View } from 'react-native';
```

**After**

```js
import StyleSheet from 'react-native-web/dist/apis/StyleSheet';
import View from 'react-native-web/dist/components/View';
```
