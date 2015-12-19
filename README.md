# React Native for Web

[![Build Status][travis-image]][travis-url]
[![npm version][npm-image]][npm-url]
![gzipped size](https://img.shields.io/badge/gzipped-~18.6k-blue.svg)

[React Native][react-native-url] components and APIs for the Web.

* [Discord: #react-native-web on reactiflux][discord-url]
* [Gitter: react-native-web][gitter-url]

## Table of contents

* [Install](#install)
* [Example](#example)
* [APIs](#apis)
* [Components](#components)
* [Styling](#styling)
* [Accessibility](#accessibility)
* [Contributing](#contributing)
* [Thanks](#thanks)
* [License](#license)

## Install

```
npm install --save react react-dom react-native-web
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
      <meta charSet="utf-8" />
      <meta content="initial-scale=1,width=device-width" name="viewport" />
      <style id="react-stylesheet" dangerouslySetInnerHTML={{ __html: css } />
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
import ReactDOM from 'react-dom'

const reactRoot = document.getElementById('react-root')
const reactStyleSheet = document.getElementById('react-stylesheet')

ReactDOM.render(<App />, reactRoot)
reactStyleSheet.textContent = StyleSheet.renderToString()
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

## Styling

React Native for Web relies on styles being defined in JavaScript. Styling
components can be achieved with inline styles or the use of
[StyleSheet](docs/apis/StyleSheet.md).

The `View` component makes it easy to build common layouts with flexbox, such
as stacked and nested boxes with margin and padding. See this [guide to
flexbox][flexbox-guide-url].

### Media Queries, pseudo-classes, and pseudo-elements


Changing styles and/or the render tree in response to device adaptation can be
controlled in JavaScript, e.g.,
[react-media-queries](https://github.com/bloodyowl/react-media-queries),
[media-query-fascade](https://github.com/tanem/media-query-facade), or
[react-responsive](https://github.com/contra/react-responsive). This has the
benefit of co-locating breakpoint-specific DOM and style changes.

Pseudo-classes like `:hover` and `:focus` can be implemented with the `onHover`
and `onFocus` events.

Pseudo-elements are not supported.

## Accessibility

On the Web, assistive technologies derive useful information about the
structure, purpose, and interactivity of apps from their [HTML
elements][html-accessibility-url], attributes, and [ARIA in
HTML][aria-in-html-url].

The most common and best supported accessibility features of the Web are
exposed as the props: `accessible`, `accessibilityLabel`,
`accessibilityLiveRegion`, and `accessibilityRole`.

React Native for Web does not provide a way to directly control the rendered
HTML element. The `accessibilityRole` prop is used to infer an [analogous HTML
element][html-aria-url] to use in addition, where possible. While this may
contradict some ARIA recommendations, it also helps avoid certain HTML5
conformance errors and accessibility anti-patterns (e.g., giving a `heading`
role to a `button` element).

For example:

* `<View accessibilityRole='article' />` => `<article role='article' />`.
* `<View accessibilityRole='banner' />` => `<header role='banner' />`.
* `<View accessibilityRole='button' />` => `<button type='button' role='button' />`.
* `<Text accessibilityRole='link' href='/' />` => `<a role='link' href='/' />`.
* `<View accessibilityRole='main' />` => `<main role='main' />`.

See the component documentation for more details.

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

[aria-in-html-url]: https://w3c.github.io/aria-in-html/
[contributing-url]: https://github.com/necolas/react-native-web/blob/master/CONTRIBUTING.md
[discord-url]: http://join.reactiflux.com
[flexbox-guide-url]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
[gitter-url]: https://gitter.im/necolas/react-native-web
[html-accessibility-url]: http://www.html5accessibility.com/
[html-aria-url]: http://www.w3.org/TR/html-aria/
[npm-image]: https://badge.fury.io/js/react-native-web.svg
[npm-url]: https://npmjs.org/package/react-native-web
[react-native-url]: https://facebook.github.io/react-native/
[travis-image]: https://travis-ci.org/necolas/react-native-web.svg?branch=master
[travis-url]: https://travis-ci.org/necolas/react-native-web
