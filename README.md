# react-web-sdk

**Experimental / Proof of concept**

A component-based React SDK for building and styling web applications and SDKs.
Inspired by `react-native`.

This library provides:

* An initial implementation of the `react-native` components `Image`, `Text`,
  and `View`.
* An initial implementation of defining explicit and default `style` propTypes.
* A proof of concept implementation for converting inline `style` definitions
  to CSS classes.

This proof of concept uses a ~3KB (gzipped) precomputed CSS bundle; a complete
implementation is likely to produce a slightly larger CSS file and fewer inline
styles.

Other React styling strategies:
[react-native](https://facebook.github.io/react-native/),
[react-style](https://github.com/js-next/react-style),
[jsxstyle](https://github.com/petehunt/jsxstyle),
[react-inline](https://github.com/martinandert/react-inline), and
[react-free-style](https://github.com/blakeembrey/react-free-style/)

### 1. Write styles using plain JavaScript objects

Use JavaScript to write style definitions in React components:

```js
const style = {
  common: {
    backgroundColor: 'white',
    borderRadius: '1em'
  },
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
    opacity: 0.5
  },
  text: {
    fontWeight: '300'
  }
};
```

### 2. Set styles using the `style` attribute

The `style` attribute is a simple API for creating element-scoped styles.

```js
<View style={style.root}>...</View>

<View style={{
  flexDirection: 'row',
  justifyContent: 'space-between'
}}>
  ...
</View
```

It's easy to combine and override style objects:

```js
import baseStyle from './baseStyle';

const buttonStyle = {
  ...baseStyle,
  backgroundColor: '#333',
  color: '#fff'
}
```

So far, this is identical to using inline styles in a React component.

### 3. Map inline styles to static CSS rules

Using the `style` attribute would normally produce inline styles. Libraries
like [react-style](https://github.com/js-next/react-style) implement a
`Stylesheet.create` API and provide a means to extract styles to CSS at build
time. The extraction maps whole style objects to multi-declaration CSS rules.

For example:

```js
// relies on a new construct
Stylesheet.create({
  root: {
    background: 'transparent',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center'
  }
});
```

Yields:

```css
/* produces new css for every new style rule */
.foo {
  background: transparent;
  display: flex;
  flex-grow: 1;
  justify-content: center;
}
```

Each component adds new rules to the stylesheet. This can lead the extracted
stylesheet to become increasingly large and prone to change.

Libraries like [Atomic CSS](http://acss.io/),
[Basscss](http://www.basscss.com/), [SUIT CSS](https://suitcss.github.io/), and
[tachyons](http://tachyons.io/) are attempts to limit style scope and limit
stylesheet growth. But they are CSS utility libraries, each with a particular
set of classes and features to learn. All of them require developers to
manually connect CSS classes for given styles.

The `react-web-sdk` library's implementation is a proof-of-concept for the
strategy of automatically mapping style `key`-`value` pairs to
single-declaration CSS rules.

```css
.background-transparent { background: transparent }
.display-block { display: block }
.flexGrow-1 { flex-grow: 1 }
.justifyContent-center { justify-content: center }
```

Mapping declarations to single-purpose classes greatly reduces the total amount
of CSS needed. It avoids the repetition of declarations between rules for
unrelated elements, and prevents style collisions. A build step hashes the class names.

```html
<div class="_jsy9e _fidnk _jn78h _qqqnk">...</div>
```

The current implementation uses a precomputed CSS library of known and common
declarations – 200+ single-declaration rules, with obfuscated selectors. This
handles a signficant portion of possible declarations. But it falls through to
inline styles significantly more often than an better implementation using
static analysis to generate the CSS library at build time.

### 4. Use inline styles for dynamic values

Inline styles are used for values that cannot be resolved at build time.

```js
<Text style={{ color: (Math.random() > 0.5 ? 'red' : 'black')}}>...</Text>
```

### 5. Add `style` prop types

Each Component defines `StylePropTypes` and filters out any style properties
that are not part of its style API. For example, `View` does not support any
typographic properties.

See the section below on `StylePropTypes`.

### Media Queries?

We can use `mediaMatch` to orchestrate both style and DOM changes. The
component can be re-rendered when the styles change. This also avoids the need
for additional CSS. Adding media queries as keys on the `style` object (like
`react-style` does) might be a good, or it might not be. I'd prefer a solution
that accomodates both style and DOM changes, rather than one or the other.
Perhaps `this.context` or a higher-order component that passes viewport data to
components via `props`.

---

## Components

### `Component`

A component that manages styles across the `className` and `style` properties.
The building block upon which all other components in `react-web-sdk` are
build.

#### PropTypes

All other props are transferred directly to the `element`.

+ `className`: `string`
+ `element`: `func` or `string`
+ `style`: `object`

#### Examples

```js
import {Component, pickProps} from 'react-web-sdk';
import React, {PropTypes} from 'react';

const ExampleStylePropTypes = { opacity: PropTypes.number };
const ExampleStyleDefaultProps = { opacity: 1 };

class Example extends React.Component {
  static propTypes = {
    style: PropTypes.shape(ExampleStylePropTypes)
  }

  render() {
    // only apply supported styles
    const supportedStyle = pickProps(this.props.style, ExampleStylePropTypes);
    // merge with default styles
    const style = { ...ExampleStyleDefaultProps, ...supportedStyle }

    return (
      <Component
        children={this.props.children}
        element="main"
        style={style}
      />
    );
  }
}
```


### `Image`

TODO

#### PropTypes

All other props are transferred directly to the `element`.

+ `accessibilityLabel`: `string`
+ `async`: `bool` (TODO)
+ `className`: `string`
+ `source`: `string`
+ `style`: `ImageStylePropTypes`

#### ImageStylePropTypes

+ `BackgroundPropTypes`
+ `BorderThemePropTypes`
+ `LayoutPropTypes`
+ `opacity`: `string`

#### Examples

```js
import {Image, StylePropTypes} from 'react-web-sdk';
import React, {PropTypes} from 'react';

const AvatarStylePropTypes = {
   ...StylePropTypes.BorderThemePropTypes
};

const AvatarStyleDefaultProps = {
  borderColor: 'white',
  borderWidth: '5px'
};

class Avatar extends React.Component {
  static propTypes = {
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    style: PropTypes.shape(AvatarStylePropTypes),
    user: PropTypes.object
  }

  static defaultProps = {
    size: 'normal'
  }

  render() {
    const supportedStyle = pickProps(this.props.style, AvatarStylePropTypes);
    const style = { ...AvatarStyleDefaultProps, ...supportedStyle }

    return (
      <Image
        accessibilityLabel={`${user.name}'s profile picture`}
        source={user.avatarUrl}
        style={style}
      />
    );
  }
}
```


### `Text`

Text layout and styles.

#### PropTypes

All other props are transferred directly to the `element`.

+ `className`: `string`
+ `element`: `func` or `string` (default `"div"`)
+ `style`: `TextStylePropTypes`

#### TextStylePropTypes

+ ViewStylePropTypes
+ TypographicPropTypes

#### Examples

```js
import {StylePropTypes, Text} from 'react-web-sdk';
import React, {PropTypes} from 'react';

class PrettyText extends React.Component {
  static propTypes = {
    color: PropTypes.oneOf(['white', 'gray', 'red']),
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    weight: PropTypes.oneOf(['light', 'normal', 'bold'])
  }

  static defaultProps = {
    color: 'gray',
    size: 'normal',
    weight: 'normal'
  }

  render() {
    const { color, size, style, weight, ...other } = this.props;

    return (
      <Text
        ...other
        style={{
          ...style,
          ...localStyle.color[color],
          ...localStyle.size[size],
          ...localStyle.weight[weight]
        }}
      />
    );
  }
}

const localStyle = {
  color: {
    white: { color: 'white' },
    gray: { color: 'gray' },
    red: { color: 'red' }
  },
  size: {
    small: { fontSize: '0.85rem', padding: '0.5rem' },
    normal: { fontSize: '1rem', padding: '0.75rem' },
    large: { fontSize: '1.5rem', padding: '1rem' }
  },
  weight: {
    light: { fontWeight: '300' },
    normal: { fontWeight: '400' },
    bold: { fontWeight: '700' }
  }
}
```


### `View`

`View` is a flexbox container and the fundamental building block for UI. It is
designed to be nested inside other `View`'s and to have 0-to-many children of
any type.

#### PropTypes

All other props are transferred directly to the `element`.

+ `className`: `string`
+ `element`: `func` or `string` (default `"div"`)
+ `pointerEvents`: `oneOf('all', 'box-only', 'box-none', 'none')`
+ `style`: `ViewStylePropTypes`

#### ViewStylePropTypes

+ BackgroundPropTypes
+ BorderThemePropTypes
+ LayoutPropTypes
+ `boxShadow`: `string`
+ `color`: `string`
+ `opacity`: `number`

#### ViewStyleDefaultProps

Implements the default styles from
[facebook/css-layout](https://github.com/facebook/css-layout).

```js
const ViewStyleDefaultProps = {
  alignItems: 'stretch', // 1
  borderWidth: 0,
  borderStyle: 'solid',
  boxSizing: 'border-box', // 2
  display: 'flex', // 3
  flexBasis: 'auto', // 1
  flexDirection: 'column', // 1
  flexShrink: 0, // 1
  listStyle: 'none',
  margin: 0,
  padding: 0,
  position: 'relative' // 4
};
```

1. All the flex elements are oriented from top-to-bottom, left-to-right and do
   not shrink. This is how things are laid out using the default CSS settings
   and what you'd expect.

2. The most convenient way to express the relation between width and other
   box-model properties.

3. Everything is `display:flex` by default. All the behaviors of `block` and
   `inline-block` can be expressed in term of flex but not the opposite.

4. Everything is `position:relative`. This makes `position:absolute` target the
   direct parent and not some parent which is either relative or absolute. If
   you want to position an element relative to something else, you should move
   it in the DOM instead of relying of CSS. It also makes `top`, `left`,
   `right`, `bottom` do something when not specifying `position:absolute`.

#### Examples

```js
// TODO
```

---

## Utilities

### Object property filtering

Create a new object that includes or excludes a list of properties.

* `.getOtherProps(reactComponentInstance)` (strips propTypes from `this.props`)
* `.pickProps(obj, arrayOfIncludedProps)`
* `.omitProps(obj, arrayOfExcludedProps)`

---

## StylePropTypes

### Background

+ `backgroundColor`: `string`
+ `backgroundImage`: `string`
+ `backgroundPosition`: `string`
+ `backgroundRepeat`: `string`
+ `backgroundSize`: `string`

### BorderTheme

+ `borderColor`: `string`
+ `borderTopColor`: `string`
+ `borderRightColor`: `string`
+ `borderBottomColor`: `string`
+ `borderLeftColor`: `string`
+ `borderStyle`: `string`
+ `borderRadius`: `number` or `string`
+ `borderTopLeftRadius`: `number` or `string`
+ `borderTopRightRadius`: `number` or `string`
+ `borderBottomLeftRadius`: `number` or `string`
+ `borderBottomRightRadius`: `number` or `string`

### BoxModel

+ `borderWidth`: `number` or `string`
+ `borderTopWidth`: `number` or `string`
+ `borderRightWidth`: `number` or `string`
+ `borderBottomWidth`: `number` or `string`
+ `borderLeftWidth`: `number` or `string`
+ `boxSizing`: `oneOf('border-box', 'content-box')`
+ `display`: `oneOf('block', 'flex', 'inline', 'inline-block', 'inline-flex')`
+ `height`: `number` or `string`
+ `margin`: `number` or `string`
+ `marginTop`: `number` or `string`
+ `marginRight`: `number` or `string`
+ `marginBottom`: `number` or `string`
+ `marginLeft`: `number` or `string`
+ `padding`: `number` or `string`
+ `paddingTop`: `number` or `string`
+ `paddingRight`: `number` or `string`
+ `paddingBottom`: `number` or `string`
+ `paddingLeft`: `number` or `string`
+ `width`: `number` or `string`

### Flexbox

* `alignContent`: `oneOf('center', 'flex-end', 'flex-start', 'stretch', 'space-around', 'space-between')`
* `alignItems`: `oneOf('baseline', 'center', 'flex-end', 'flex-start', 'stretch')`
* `alignSelf`: `oneOf('auto', 'baseline', 'center', 'flex-end', 'flex-start', 'stretch')`
* `flexBasis`: `string`
* `flexDirection`: `oneOf('column', 'column-reverse', 'row', 'row-reverse')`
* `flexGrow`: `number`
* `flexShrink`: `number`
* `flexWrap`: `oneOf('nowrap', 'wrap', 'wrap-reverse')`
* `justifyContent`: `oneOf('center', 'flex-end', 'flex-start', 'space-around', 'space-between')`
* `order`: `number`

See this [guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

### Layout

* BoxModel
* Flexbox
* Position

### Position

* `position`: `oneOf('absolute', 'fixed', 'relative')`
* `bottom`: `number` or `string`
* `left`: `number` or `string`
* `right`: `number` or `string`
* `top`: `number` or `string`
* `zIndex`: `number`

### Typographic

* `direction`: `oneOf('auto', 'ltr', 'rtl')`
* `fontFamily`: `string`
* `fontSize`: `string`
* `fontWeight`: `oneOf('100', '200', '300', '400', '500', '600', '700', '800', '900', 'bold', 'normal')`
* `fontStyle`: `oneOf('normal', 'italic')`
* `letterSpacing`: `string`
* `lineHeight`: `number` or `string`
* `textAlign`: `oneOf('auto', 'left', 'right', 'center')`
* `textDecoration`: `oneOf('none', 'underline')`
* `textTransform`: `oneOf('capitalize', 'lowercase', 'none', 'uppercase')`
* `wordWrap`: `oneOf('break-word', 'normal')`

---

## Development

```
npm run build
npm run build:watch
open index.html
```
