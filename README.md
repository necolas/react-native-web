# React Native for Web

[![Build Status][travis-image]][travis-url]
[![npm version][npm-image]][npm-url] (14 KB gzipped)

The core [React Native][react-native-url] components built for the web, backed
by a precomputed CSS library.

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

Partial implementations of…

* [`Image`](docs/components/Image.md)
* [`Text`](docs/components/Text.md)
* [`TextInput`](docs/components/TextInput.md)
* [`View`](docs/components/View.md)

## Styling

React Native Web provides a mechanism to declare all your styles and layout
inline with the components that use them. The `View` component makes it easy
to build common layouts with flexbox, such as stacked and nested boxes with
margin and padding.

Styling is identical to using inline styles in React, but most inline styles
are converted to single-purpose classes. The current implementation includes
300+ precomputed CSS declarations (~4.5KB gzipped) that cover a large
proportion of common styles. A more sophisticated build-time implementation may
produce a slightly larger CSS file for large apps, and fall back to fewer
inline styles. Read more about the [styling
strategy](docs/react-native-web-style/styling.md).

See this [guide to flexbox][flexbox-guide-url].

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

## License

Copyright (c) 2015 Nicolas Gallagher. Released under the [MIT
license](http://www.opensource.org/licenses/mit-license.php).

[contributing-url]: https://github.com/necolas/react-native-web/blob/master/CONTRIBUTING.md
[flexbox-guide-url]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
[npm-image]: https://img.shields.io/npm/v/react-native-web.svg
[npm-url]: https://npmjs.org/package/react-native-web
[react-native-url]: https://facebook.github.io/react-native/
[travis-image]: https://travis-ci.org/necolas/react-native-web.svg?branch=master
[travis-url]: https://travis-ci.org/necolas/react-native-web
