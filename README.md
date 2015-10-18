# React Native for Web

[![Build Status][travis-image]][travis-url]
[![npm version][npm-image]][npm-url]

[React Native][react-native-url] components and APIs for the Web.
~19 KB minified and gzipped.

* [Slack: reactiflux channel #react-native-web][slack-url]
* [Gitter: react-native-web][gitter-url]

## Table of contents

* [Install](#install)
* [Example](#example)
* [APIs](#APIs)
* [Components](#components)
* [Styling](#styling)
* [Contributing](#contributing)
* [Thanks](#thanks)
* [License](#license)

## Install

```
npm install --save react react-native-web
```

## Example

React Native for Web exports its components and a reference to the `React`
installation. Styles are defined with, and used as JavaScript objects.

Component:

```js
import React, { Image, StyleSheet, Text, View } from 'react-native-web'

const Title = ({ children }) => <Text style={styles.title}>{children}</Text>

const Summary = ({ children }) => (
  <View style={styles.text}>
    <Text style={styles.subtitle}>{children}</Text>
  </View>
)

class App extends React.Component {
  render() {
    return (
      <View style={styles.row}>
        <Image
          source={{ uri: 'http://facebook.github.io/react/img/logo_og.png' }}
          style={styles.image}
        />
        <Title>React Native Web</Title>
        <Summary>Build high quality web apps using React</Summary>
      </View>
    )
  },
})

const styles = StyleSheet.create({
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
})
```

Pre-render styles on the server:

```js
// server.js
import App from './components/App'
import React, { StyleSheet } from 'react-native-web'

const html = React.renderToString(<App />);
const css = StyleSheet.renderToString();

const Html = () => (
  <html>
    <head>
      <style id="react-stylesheet">{css}</style>
    </head>
    <body>
      <div id="react-root" dangerouslySetInnerHTML={{ __html: html }} />
    </body>
  </html>
)
```

Render styles on the client:

```js
// client.js
import App from './components/App'
import React, { StyleSheet } from 'react-native-web'

React.render(
  <App />,
  document.getElementById('react-root')
)

document.getElementById('stylesheet').textContent = StyleSheet.renderToString()
```

## APIs

### [`StyleSheet`](docs/apis/StyleSheet.md)

StyleSheet is a style abstraction that transforms inline styles to CSS on the
client or the server. It provides a minimal CSS reset.

## Components

### [`Image`](docs/components/Image.md)

An accessibile image component with support for image resizing, default image,
and child content.

### [`ListView`](docs/components/ListView.md)

(TODO)

### [`ScrollView`](docs/components/ListView.md)

(TODO)

### [`Text`](docs/components/Text.md)

Displays text as an inline block and supports basic press handling.

### [`TextInput`](docs/components/TextInput.md)

Accessible single- and multi-line text input via a keyboard.

### [`Touchable`](docs/components/Touchable.md)

Touch bindings for press and long press.

### [`View`](docs/components/View.md)

The fundamental UI building block using flexbox for layout.

## Styling

React Native for Web relies on styles being defined in JavaScript.

The `View` component makes it easy to build common layouts with flexbox, such
as stacked and nested boxes with margin and padding. See this [guide to
flexbox][flexbox-guide-url].

Styling components can be achieved with inline styles or the use of
[StyleSheet](docs/apis/StyleSheet.md).

## Contributing

Please read the [contribution guidelines][contributing-url]. Contributions are
welcome!

## Thanks

Thanks to current and past members of the React and React Native teams (in
particular Vjeux and Pete Hunt), and Tobias Koppers for Webpack and CSS loader.

Thanks to [react-tappable](https://github.com/JedWatson/react-tappable) for
backing the current implementation of `Touchable`.

## License

Copyright (c) 2015 Nicolas Gallagher. Released under the [MIT
license](http://www.opensource.org/licenses/mit-license.php).

[contributing-url]: https://github.com/necolas/react-native-web/blob/master/CONTRIBUTING.md
[flexbox-guide-url]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
[gitter-url]: https://gitter.im/necolas/react-native-web
[npm-image]: https://badge.fury.io/js/react-native-web.svg
[npm-url]: https://npmjs.org/package/react-native-web
[react-native-url]: https://facebook.github.io/react-native/
[slack-url]: https://reactiflux.slack.com/messages/react-native-web/
[travis-image]: https://travis-ci.org/necolas/react-native-web.svg?branch=master
[travis-url]: https://travis-ci.org/necolas/react-native-web
