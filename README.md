# React Native for Web

[![Build Status][travis-image]][travis-url]
[![npm version][npm-image]][npm-url]

[React Native][react-native-url] components and APIs for the Web.

Browser support: Chrome, Firefox, Safari >= 7, IE 10, Edge.

## Overview

"React Native for Web" is a project to bring React Native's building blocks and
touch handling to the Web.

React Native – unlike React DOM – is a comprehensive UI framework for
application developers. React Native's components are higher-level building
blocks than those provided by React DOM. React Native also provides
platform-agnostic JavaScript APIs for animating and styling components,
responding to touch events, and interacting with the host environment.

Bringing the React Native APIs and components to the Web allows React Native
components to be run on the Web platform. But it also solves several problems
facing the React DOM ecosystem: no framework-level animation or styling
solution; difficulty sharing and composing UI components (without pulling in
their build or runtime dependencies); and the lack of high-level base
components.

## Quick start

To install in your app:

```
npm install --save react react-native-web
```

Read the [Client and Server rendering](docs/guides/rendering.md) guide.

You can also bootstrap a standard React Native project structure for web by
using [react-native-web-starter](https://github.com/grabcode/react-native-web-starter).

## Examples

Demos:

* [React Native for Web: Playground](http://codepen.io/necolas/pen/PZzwBR).
* [TicTacToe](http://codepen.io/necolas/full/eJaLZd/)
* [2048](http://codepen.io/necolas/full/wMVvxj/)

Sample:

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
  * [`Vibration`](docs/apis/Vibration.md)

## License

React Native for Web is [BSD licensed](LICENSE).

[npm-image]: https://badge.fury.io/js/react-native-web.svg
[npm-url]: https://npmjs.org/package/react-native-web
[react-native-url]: https://facebook.github.io/react-native/
[travis-image]: https://travis-ci.org/necolas/react-native-web.svg?branch=master
[travis-url]: https://travis-ci.org/necolas/react-native-web
