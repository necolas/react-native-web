# React Native for Web

[![Build Status][travis-image]][travis-url]
[![npm version][npm-image]][npm-url]
![gzipped size](https://img.shields.io/badge/gzipped-~19.3k-blue.svg)

[React Native][react-native-url] components and APIs for the Web. Flexbox
layout and JavaScript styling.

* [Discord: #react-native-web on reactiflux][discord-url]
* [Gitter: react-native-web][gitter-url]

## Table of contents

* [Quick start](#quick-start)
* [Overview](#overview)
* [Example](#example)
* [APIs](#apis)
* [Components](#components)
* [Contributing](#contributing)
* [Thanks](#thanks)
* [License](#license)

## Quick start

You can [try the latest version on CodePen](http://codepen.io/necolas/pen/PZzwBR).

To install in your app:

```
npm install --save react@0.14 react-dom@0.14 react-native-web
```

## Overview

### Importing

All API's, components, and a Web-specific `React` are provided by the
`react-native-web` module:

```js
import React, { Image, StyleSheet, Text, View } from 'react-native-web'
```

### Client-side rendering

Client-side rendering requires that you use the module's `React` export.
`React.render` is a thin wrapper around `ReactDOM.render` that renders your
application and the style sheet. Styles are updated if new bundles are loaded
asynchronously.

```js
// client.js
import App from './components/App'
import React from 'react-native-web'

React.render(<App />, document.getElementById('react-root'))
```

### Server-side rendering

Server-side rendering is done by calling `React.renderToString` or
`React.renderToStaticMarkup`, the output of both includes the style sheet.

```js
// server.js
import App from './components/App'
import React from 'react-native-web'

const html = React.renderToString(<App />);

const Html = () => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta content="initial-scale=1,width=device-width" name="viewport" />
    </head>
    <body>
      <div id="react-root" dangerouslySetInnerHTML={{ __html: html }} />
    </body>
  </html>
)
```

### Styling

React Native for Web allows you to [define styles using
JavaScript](docs/guides/style.md), either with inline styles or
[`StyleSheet.create`](docs/apis/StyleSheet.md).

The `View` component makes it easy to build common layouts with flexbox, such
as stacked and nested boxes with margin and padding. See this [guide to
flexbox][flexbox-guide-url].

### Accessibility

The most common and best supported [accessibility
features](docs/guides/accessibility.md) of the Web are leveraged through 4
props available on most components: `accessible`, `accessibilityLabel`,
`accessibilityLiveRegion`, and `accessibilityRole`.

## Example

More examples can be found in the [`examples` directory](examples).

```js
import React, { Image, StyleSheet, Text, View } from 'react-native-web'

const Card = ({ children }) => <View style={styles.card}>{children}</View>
const Title = ({ children }) => <Text style={styles.title}>{children}</Text>
const Photo = ({ uri }) => <Image source={{ uri }} style={styles.image} />

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
    marginRight: 10,
    width: 40
  }
})
```

## APIs

### [`StyleSheet`](docs/apis/StyleSheet.md)

StyleSheet is a style abstraction that transforms inline styles to CSS on the
client or the server. It provides a minimal CSS reset targeting elements and
pseudo-elements beyond the reach of React inline styles.

## Components

### [`Image`](docs/components/Image.md)

An accessibile image component with support for image resizing, default image,
and child content.

### [`ListView`](docs/components/ListView.md)

(TODO)

### [`ScrollView`](docs/components/ScrollView.md)

A scrollable view with event throttling.

### [`Text`](docs/components/Text.md)

Displays text inline and supports basic press handling.

### [`TextInput`](docs/components/TextInput.md)

Accessible single- and multi-line text input via a keyboard.

### [`Touchable`](docs/components/Touchable.md)

Touch bindings for press and long press.

### [`View`](docs/components/View.md)

The fundamental UI building block using flexbox for layout.

## Contributing

Please read the [contribution guidelines][contributing-url]. Contributions are
welcome!

## Thanks

Thanks to current and past members of the React and React Native teams (in
particular Vjeux and Pete Hunt).

Thanks to [react-tappable](https://github.com/JedWatson/react-tappable) for
backing the current implementation of `Touchable`.

## License

Copyright (c) 2015 Nicolas Gallagher. Released under the [MIT
license](http://www.opensource.org/licenses/mit-license.php).

[contributing-url]: https://github.com/necolas/react-native-web/blob/master/CONTRIBUTING.md
[discord-url]: http://join.reactiflux.com
[flexbox-guide-url]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
[gitter-url]: https://gitter.im/necolas/react-native-web
[npm-image]: https://badge.fury.io/js/react-native-web.svg
[npm-url]: https://npmjs.org/package/react-native-web
[react-native-url]: https://facebook.github.io/react-native/
[travis-image]: https://travis-ci.org/necolas/react-native-web.svg?branch=master
[travis-url]: https://travis-ci.org/necolas/react-native-web
