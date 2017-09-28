# React Native for Web

[![Build Status][travis-image]][travis-url]
[![npm version][npm-image]][npm-url]

"React Native for Web" brings the platform-agnostic Components and APIs of
[React Native][react-native-url] to the Web.

Browse the [interactive
documentation](https://necolas.github.io/react-native-web/storybook/) or [try
it out](https://glitch.com/edit/#!/react-native-web-playground) on Glitch.

## Features

* Interoperability with ReactDOM components.
* Native-like touch handling.
* Built-in integration with web accessibility APIs.
* Built-in support for LTR and RTL layouts.
* Built-in expressive and reliable subset of CSS.
* Optimized, vendor-prefixed CSS with [good runtime performance](benchmarks/README.md).
* Server-side rendering of HTML and critical CSS.
* Browser support: Chrome, Firefox, Safari >= 7, IE 10, Edge.

## Quick start

Install in your existing app using `yarn` or `npm`:

```
yarn add react react-dom react-native-web
```

Add the `react-native-web/babel` plugin to your Babel configuration. This will
alias `react-native` to `react-native-web` and exclude any modules not required
by the app.

```json
{
  "plugins": [
    "react-native-web/babel"
  ],
  "presets": [
    "react-native"
  ]
}
```

(For React/ReactDOM 15.4 – 15.6 support, install `react-native-web@<0.1.0`)

See the [Getting Started](docs/guides/getting-started.md) guide for more details.

## Documentation

The [interactive
documentation](https://necolas.github.io/react-native-web/storybook/) shows all
the supported APIs and Components.

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

## Starter kits

* [Glitch](https://glitch.com/edit/#!/react-native-web-playground)
* [create-react-app](https://github.com/facebookincubator/create-react-app)
* [re-start](https://github.com/react-everywhere/re-start)

## Related projects

* [react-primitives](https://github.com/lelandrichardson/react-primitives/)
* [react-sketchapp](https://github.com/airbnb/react-sketchapp)
* [reactxp](https://github.com/microsoft/reactxp)
* [react-native-web-player](https://github.com/dabbott/react-native-web-player)

## License

React Native for Web is [BSD licensed](LICENSE).

[npm-image]: https://badge.fury.io/js/react-native-web.svg
[npm-url]: https://npmjs.org/package/react-native-web
[react-native-url]: https://facebook.github.io/react-native/
[travis-image]: https://travis-ci.org/necolas/react-native-web.svg?branch=master
[travis-url]: https://travis-ci.org/necolas/react-native-web
