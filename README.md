# React Native for Web

[![Build Status][travis-image]][travis-url]
[![npm version][npm-image]][npm-url]
![gzipped size](https://img.shields.io/badge/gzipped-~36.7k-blue.svg)

[React Native][react-native-url] components and APIs for the Web.

Browser support: Chrome, Firefox, Safari >= 7, IE 10, Edge.

## Quick start

To install in your app:

```
npm install --save react@0.14 react-dom@0.14 react-native-web
```

Read the [Client and Server rendering](docs/guides/rendering.md) guide.

## Overview

This is a web implementation of React Native components and APIs. The React
Native components are good web application building blocks, and provide a common
foundation for component libraries.

For example, the [`View`](docs/apis/View.md) component makes it easy to build
common layouts with flexbox, such as stacked and nested boxes with margin and
padding. And the [`StyleSheet`](docs/guides/style.md) API converts styles
defined in JavaScript to "atomic" CSS.

## Examples

Demos:

* [React Native for Web: Playground](http://codepen.io/necolas/pen/PZzwBR).
* [TicTacToe](http://codepen.io/necolas/full/eJaLZd/)
* [2048](http://codepen.io/necolas/full/wMVvxj/)

Example:

```js
import React, { AppRegistry, Image, StyleSheet, Text, View } from 'react-native'

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

// App registration and rendering
AppRegistry.registerComponent('MyApp', () => App)
AppRegistry.runApplication('MyApp', { rootTag: document.getElementById('react-root') })

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
```

## Documentation

Guides:

* [Accessibility](docs/guides/accessibility.md)
* [Client and server rendering](docs/guides/rendering.md)
* [Direct manipulation](docs/guides/direct-manipulation.md)
* [Known issues](docs/guides/known-issues.md)
* [React Native](docs/guides/react-native.md)
* [Style](docs/guides/style.md)

Exported modules:

* Components
  * [`ActivityIndicator`](docs/components/ActivityIndicator.md)
  * [`Image`](docs/components/Image.md)
  * [`ListView`](docs/components/ListView.md)
  * [`Portal`](docs/components/Portal.md)
  * [`ScrollView`](docs/components/ScrollView.md)
  * [`Text`](docs/components/Text.md)
  * [`TextInput`](docs/components/TextInput.md)
  * [`TouchableHighlight`](docs/components/TouchableHighlight.md)
  * [`TouchableOpacity`](docs/components/TouchableOpacity.md)
  * [`TouchableWithoutFeedback`](docs/components/TouchableWithoutFeedback.md)
  * [`View`](docs/components/View.md)
* APIs
  * [`Animated`](http://facebook.github.io/react-native/releases/0.20/docs/animated.html) (mirrors React Native)
  * [`AppRegistry`](docs/apis/AppRegistry.md)
  * [`AppState`](docs/apis/AppState.md)
  * [`AsyncStorage`](docs/apis/AsyncStorage.md)
  * [`Dimensions`](docs/apis/Dimensions.md)
  * [`NativeMethods`](docs/apis/NativeMethods.md)
  * [`NetInfo`](docs/apis/NetInfo.md)
  * [`PanResponder`](http://facebook.github.io/react-native/releases/0.20/docs/panresponder.html#content) (mirrors React Native)
  * [`PixelRatio`](docs/apis/PixelRatio.md)
  * [`Platform`](docs/apis/Platform.md)
  * [`StyleSheet`](docs/apis/StyleSheet.md)

## License

React Native for Web is [BSD licensed](LICENSE).

[npm-image]: https://badge.fury.io/js/react-native-web.svg
[npm-url]: https://npmjs.org/package/react-native-web
[react-native-url]: https://facebook.github.io/react-native/
[travis-image]: https://travis-ci.org/necolas/react-native-web.svg?branch=master
[travis-url]: https://travis-ci.org/necolas/react-native-web
