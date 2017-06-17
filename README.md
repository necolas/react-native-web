# React Native for Web

[![Build Status][travis-image]][travis-url]
[![npm version][npm-image]][npm-url]

[React Native][react-native-url] components and APIs for the Web.

Browser support: Chrome, Firefox, Safari >= 7, IE 10, Edge.

[npm-image]: https://badge.fury.io/js/react-native-web.svg
[npm-url]: https://npmjs.org/package/react-native-web
[react-native-url]: https://facebook.github.io/react-native/
[travis-image]: https://travis-ci.org/necolas/react-native-web.svg?branch=master
[travis-url]: https://travis-ci.org/necolas/react-native-web

## Overview

"React Native for Web" is a project to bring React Native's building blocks and
touch handling to the Web.

Browse the [UI Explorer](https://necolas.github.io/react-native-web/storybook/)
to see React Native examples running on Web. Or try it out online with [React
Native for Web: Playground](https://www.webpackbin.com/bins/-KgucwxRbn7HRU-V-3Bc).

## Quick start

To install in your app:

```
npm install --save react@15.6 react-dom@15.6 react-native-web
```

NOTE: React Native for Web supports React/ReactDOM 15.4, 15.5, or 15.6.

Then read the [Getting Started](docs/guides/getting-started.md) guide.

## Documentation

The [UI Explorer](https://necolas.github.io/react-native-web/storybook/)
interactively documents all the APIs and Components.

Guides:

* [Getting started](docs/guides/getting-started.md)
* [Style](docs/guides/style.md)
* [Accessibility](docs/guides/accessibility.md)
* [Direct manipulation](docs/guides/direct-manipulation.md)
* [Internationalization](docs/guides/internationalization.md)
* [Advanced use](docs/guides/advanced.md)
* [Known issues](docs/guides/known-issues.md)

## Example code

```js
import React from 'react'
import { AppRegistry, Image, StyleSheet, Text, View } from 'react-native'

// Components
const Card = ({ children }) => <View style={styles.card}>{children}</View>
const Title = ({ children }) => <Text style={styles.title}>{children}</Text>
const Photo = ({ uri }) => <Image source={{ uri }} style={styles.image} />
const App = () => (
  <Card>
    <Title>App Card</Title>
    <Photo uri="/some-photo.jpg" />
  </Card>
)

// Styles
const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 'bold'
  },
  image: {
    height: 40,
    marginVertical: 10,
    width: 40
  }
})

// App registration and rendering
AppRegistry.registerComponent('MyApp', () => App)
AppRegistry.runApplication('MyApp', { rootTag: document.getElementById('react-root') })
```

## Related projects

* [react-primitives](https://github.com/lelandrichardson/react-primitives/)
* [react-native-web-player](https://github.com/dabbott/react-native-web-player)
* [react-native-web-starter](https://github.com/grabcode/react-native-web-starter)
* [react-native-web-webpack](https://github.com/ndbroadbent/react-native-web-webpack)
* [react-sketchapp](https://github.com/airbnb/react-sketchapp)
* [react-web](https://github.com/taobaofed/react-web)
* [reactxp](https://github.com/microsoft/reactxp)

## License

React Native for Web is [BSD licensed](LICENSE).
