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

## Quick start

To install in your app:

```
npm install --save react react-native-web
```

Read the [Client and Server rendering](docs/guides/rendering.md) guide.

You can also bootstrap a standard React Native project structure for web by
using [react-native-web-starter](https://github.com/grabcode/react-native-web-starter).

## Examples

* React Native [examples running on Web](https://necolas.github.io/react-native-web/storybook/)
* [React Native for Web: Playground](http://codepen.io/necolas/pen/PZzwBR).

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
  * [`Dimensions`](docs/apis/Dimensions.md)
  * [`I18nManager`](docs/apis/I18nManager.md)
  * [`NativeMethods`](docs/apis/NativeMethods.md)
  * [`NetInfo`](docs/apis/NetInfo.md)
  * [`PanResponder`](http://facebook.github.io/react-native/releases/0.20/docs/panresponder.html#content) (mirrors React Native)
  * [`PixelRatio`](docs/apis/PixelRatio.md)
  * [`Platform`](docs/apis/Platform.md)
  * [`StyleSheet`](docs/apis/StyleSheet.md)
  * [`Vibration`](docs/apis/Vibration.md)

<span id="#why"></span>
## Why?

React Native is a comprehensive JavaScript framework for building application
user interfaces. It provides high-level, platform-agnostic components and APIs
– e.g., `Text`, `View`, `Touchable*`, `Animated`, `StyleSheet` - that simplify
working with layout, gestures, animations, and styles. The entire React Native
ecosystem can depend on these shared building blocks.

In contrast, the React DOM ecosystem is limited by the lack of a higher-level
framework. At Twitter, we want to seamlessly author and share React component
libraries between different Web applications (with increasing interest from
product teams for multi-platform solutions). This goal draws together multiple,
inter-related problems including: styling, animation, gestures, themes,
viewport adaptation, accessibility, diverse build processes, and RTL layouts.

Almost all these problems are avoided, solved, or can be solved in React
Native. Central to this is React Native's JavaScript style API (not strictly
"CSS-in-JS") which avoids the key [problems with
CSS](https://speakerdeck.com/vjeux/react-css-in-js). By giving up some of the
complexity of CSS it also provides a reliable surface for style composition,
animation, gestures, server-side rendering, RTL layout; and removes the
requirement for CSS-specific build tools.

Bringing the React Native APIs and components to the Web has the added benefit
of allowing teams to explore code-sharing between Native and Web platforms.

## Related projects

* [react-native-web-starter](https://github.com/grabcode/react-native-web-starter)
* [react-native-web-player](https://github.com/dabbott/react-native-web-player)
* [react-web](https://github.com/taobaofed/react-web)
* [react-native-for-web](https://github.com/KodersLab/react-native-for-web)

## License

React Native for Web is [BSD licensed](LICENSE).
