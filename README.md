# React Native for Web

[![Join the chat at https://gitter.im/necolas/react-native-web](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/necolas/react-native-web?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status][travis-image]][travis-url]
[![npm version][npm-image]][npm-url]

The core [React Native][react-native-url] components adapted and expanded upon
for the web, backed by a precomputed CSS library. ~19KB minified and gzipped.

## Table of contents

* [Install](#install)
* [Use](#use)
* [Components](#components)
* [Styling](#styling)
* [Contributing](#contributing)
* [Thanks](#thanks)
* [License](#license)

## Install

```
npm install --save react react-native-web
```

## Use

React Native for Web exports its components and a reference to the `React`
installation. Styles are authored in JavaScript as plain objects.

```js
import React, { View } from 'react-native-web'

class MyComponent extends React.Component {
  render() {
    return (
      <View style={styles.root} />
    )
  }
}

const styles = {
  root: {
    borderColor: 'currentcolor'
    borderWidth: '5px',
    flexDirection: 'row'
    height: '5em'
  }
}
```

## Components

### [`Image`](docs/components/Image.md)

An accessibile image component with support for image resizing, default image,
and child content.

### [`ListView`](docs/components/ListView.md)

(TODO)

### [`ScrollView`](docs/components/ListView.md)

(TODO)

### [`Swipeable`](docs/components/Swipeable.md)

Touch bindings for swipe gestures.

### [`Text`](docs/components/Text.md)

Displays text as an inline block and supports basic press handling.

### [`TextInput`](docs/components/TextInput.md)

Accessible single- and multi-line text input via a keyboard.

### [`Touchable`](docs/components/Touchable.md)

Touch bindings for press and long press.

### [`View`](docs/components/View.md)

The fundamental UI building block using flexbox for layout.

## Styling

React Native for Web provides a mechanism to declare all your styles in
JavaScript within your components. The `View` component makes it easy to build
common layouts with flexbox, such as stacked and nested boxes with margin
and padding. See this [guide to flexbox][flexbox-guide-url].

Authoring `style` is no different to the existing use of inline styles in
React, but most inline styles are converted to single-purpose class names. The
current implementation includes 300+ precomputed CSS declarations (~4.5KB
gzipped) that covers many common property-value pairs. A more sophisticated
build-time implementation may produce a slightly larger CSS file for large
apps, and fall back to fewer inline styles. Read more about the [styling
strategy](docs/style.md).

```js
import React, { Image, Text, View } from 'react-native-web'

class App extends React.Component {
  render() {
    return (
      <View style={styles.row}>
        <Image
          source={{ uri: 'http://facebook.github.io/react/img/logo_og.png' }}
          style={styles.image}
        />
        <View style={styles.text}>
          <Text style={styles.title}>
            React Native Web
          </Text>
          <Text style={styles.subtitle}>
            Build high quality web apps using React
          </Text>
        </View>
      </View>
    )
  },
})

const styles = {
  row: {
    flexDirection: 'row',
    margin: 40
  },
  image: {
    height: 40,
    marginRight: 10,
    width: 40,
  },
  text: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: '1rem'
  }
}
```

Combine and override style objects:

```js
import baseStyle from './baseStyle'

const buttonStyle = {
  ...baseStyle,
  backgroundColor: '#333',
  color: '#fff'
}
```

## Contributing

Please read the [contribution guidelines][contributing-url]. Contributions are
welcome!

## Thanks

Thanks to current and past members of the React and React Native teams (in
particular Vjeux and Pete Hunt), and Tobias Koppers for Webpack and CSS loader.

Thanks to [react-swipeable](https://github.com/dogfessional/react-swipeable/)
for the current implementation of `Swipeable`, and to
[react-tappable](https://github.com/JedWatson/react-tappable) for backing the
current implementation of `Touchable`.

## License

Copyright (c) 2015 Nicolas Gallagher. Released under the [MIT
license](http://www.opensource.org/licenses/mit-license.php).

[contributing-url]: https://github.com/necolas/react-native-web/blob/master/CONTRIBUTING.md
[flexbox-guide-url]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
[npm-image]: https://badge.fury.io/js/react-native-web.svg
[npm-url]: https://npmjs.org/package/react-native-web
[react-native-url]: https://facebook.github.io/react-native/
[travis-image]: https://travis-ci.org/necolas/react-native-web.svg?branch=master
[travis-url]: https://travis-ci.org/necolas/react-native-web
