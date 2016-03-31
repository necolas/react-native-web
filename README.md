# React Native for Web

[![Build Status][travis-image]][travis-url]
[![npm version][npm-image]][npm-url]
![gzipped size](https://img.shields.io/badge/gzipped-~41.0k-blue.svg)

[React Native][react-native-url] components and APIs for the Web.

Browser support: Chrome, Firefox, Safari >= 7, IE 10, Edge.

## Overview

"React Native for Web" is a project to bring React Native's building blocks and
touch handling to the Web.

React Native provides a foundational layer to support interoperable,
zero-configuration React component development. This is missing from React's
web ecosystem where OSS components rely on inline styles (usually without
vendor prefixes), or require build tool configuration. This project allows
components built upon React Native to be run on the Web, and it manages all
component styling out-of-the-box.

For example, the [`View`](docs/components/View.md) component makes it easy to build
cross-browser layouts with flexbox, such as stacked and nested boxes with
margin and padding. And the [`StyleSheet`](docs/guides/style.md) API converts
styles defined in JavaScript into "Atomic CSS".

## Quick start

To install in your app:

```
npm install --save react@0.14 react-dom@0.14 react-native-web
```

Read the [Client and Server rendering](docs/guides/rendering.md) guide.

## Examples

Demos:

* [React Native for Web: Playground](http://codepen.io/necolas/pen/PZzwBR).
* [TicTacToe](http://codepen.io/necolas/full/eJaLZd/)
* [2048](http://codepen.io/necolas/full/wMVvxj/)

Sample:

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
  * [`TouchableHighlight`](http://facebook.github.io/react-native/releases/0.22/docs/touchablehighlight.html) (mirrors React Native)
  * [`TouchableOpacity`](http://facebook.github.io/react-native/releases/0.22/docs/touchableopacity.html) (mirrors React Native)
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
