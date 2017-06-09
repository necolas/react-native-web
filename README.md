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
touch handling to the Web. [Read more](#why).

Browse the [UI Explorer](https://necolas.github.io/react-native-web/storybook/)
to see React Native examples running on Web. Or try it out online with [React
Native for Web: Playground](https://www.webpackbin.com/bins/-KgucwxRbn7HRU-V-3Bc).

## Quick start

To install in your app:

```
npm install --save react@15.5 react-dom@15.5 react-native-web
```

Read the [Getting Started](docs/guides/getting-started.md) guide.

## Documentation

Guides:

* [Getting started](docs/guides/getting-started.md)
* [Style](docs/guides/style.md)
* [Accessibility](docs/guides/accessibility.md)
* [Direct manipulation](docs/guides/direct-manipulation.md)
* [Internationalization](docs/guides/internationalization.md)
* [Advanced use](docs/guides/advanced.md)
* [Known issues](docs/guides/known-issues.md)

Exported modules:

* Components
  * [`ActivityIndicator`](docs/components/ActivityIndicator.md)
  * [`Button`](docs/components/Button.md)
  * [`Image`](docs/components/Image.md)
  * [`ProgressBar`](docs/components/ProgressBar.md)
  * [`ScrollView`](docs/components/ScrollView.md)
  * [`Switch`](docs/components/Switch.md)
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
  * [`Clipboard`](docs/apis/Clipboard.md)
  * [`Dimensions`](docs/apis/Dimensions.md)
  * [`I18nManager`](docs/apis/I18nManager.md)
  * [`NetInfo`](docs/apis/NetInfo.md)
  * [`PanResponder`](http://facebook.github.io/react-native/releases/0.20/docs/panresponder.html#content) (mirrors React Native)
  * [`PixelRatio`](docs/apis/PixelRatio.md)
  * [`Platform`](docs/apis/Platform.md)
  * [`StyleSheet`](docs/apis/StyleSheet.md)
  * [`Vibration`](docs/apis/Vibration.md)

<span id="#why"></span>

## Why?

There are many different teams at Twitter building web applications with React.
We want to share React components, libraries, and APIs between teams…much like
the OSS community tries to do. At our scale, this involves dealing with
multiple, inter-related problems including: component styles, animation, touch
interactions, layout adaptation, accessibility, RTL layout, theming, and build-
or server-rendering.

This is hard to do with React DOM, as the components are essentially the same
low-level building blocks that the browser provides. However, React Native
avoids, solves, or can solve almost all these problems. Central to this is
React Native's JavaScript style API (not strictly "CSS-in-JS") which avoids the
key [problems with CSS](https://speakerdeck.com/vjeux/react-css-in-js) by
giving up some of the complexity of CSS.

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

* [react-native-web-player](https://github.com/dabbott/react-native-web-player)
* [react-native-web-starter](https://github.com/grabcode/react-native-web-starter)
* [react-native-web-webpack](https://github.com/ndbroadbent/react-native-web-webpack)
* [reactxp](https://github.com/microsoft/reactxp)
* [react-web](https://github.com/taobaofed/react-web)

## License

React Native for Web is [BSD licensed](LICENSE).
