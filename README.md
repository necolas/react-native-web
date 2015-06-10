# react-web-sdk

**Experimental / API proof of concept**

Components for building web applications and SDKs. Based on `react-native`'s
components.

1. Styles are plain JavaScript objects.
2. Styles are passed to a component's `style` prop.
3. Non-dynamic styles rely on static CSS classes.
4. Dynamic styles are written as inline styles on the DOM node.

Each Component defines `StylePropTypes` and filters out any style properties
that are not part of its style API. For example, `View` does not support any
typographic properties. You must use `Text` to wrap and style any text strings.

### Implementation notes

The current implementation uses a prebuilt CSS library – 200+ single-purpose,
obfuscated selectors. It provides a large number of common, knowable styles
needed to build apps. This makes the foundational CSS fixed (~5KB gzipped) and
highly cachable. Inline styles are used for anything the CSS library doesn't
provide, but their use is significantly reduced.

A better implementation would generate the CSS library from the declarations
defined in the source code, replace static variables (use webpack's
`DefinePlugin`?), and only use inline-styles for dynamic, instance-specific
styles.

What about media queries? Perhaps rely on `mediaMatch` and re-render when the
`style` prop needs to change; works better with DOM-related changes that need
to happen at breakpoints.  And that would avoid the need for any additional
CSS. Alternatively, rely on something similar to `react-style`'s approach and
duplicate the single-purpose classes within static CSS media queries.

### Example

```js
import React from 'react';
import {Image, Text, View} from 'react-web-sdk';

class Example extends React.Component {
  render() {
    return (
      <View element="main" style={{ ...style.common, ...style.root }}>
        <Image alt="accessibility text" src="/image.png" style={style.image} />
        <Text style={{ ...style.common, ...(Math.random() > 0.5 && style.text) }}>
          Example component
        </Text>
      </View>
    );
  }
}

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

export default Example;
```

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
import {Component, getOtherProps, pickProps} from 'react-web-sdk';
import React, {PropTypes} from 'react';

const ExampleStylePropTypes = {
  opacity: PropTypes.number
};

const ExampleStyleDefaultProps = {
  opacity: 1
};

class Example extends React.Component {
  static propTypes = {
    anExampleProp: PropTypes.number,
    someExampleProp: PropTypes.string,
    style: PropTypes.shape(ExampleStylePropTypes)
  }

  static defaultProps = {
    style: ExampleStyleDefaultProps
  }

  render() {
    const other = getOtherProps(this);
    const supportedStyle = pickProps(this.props.style, ExampleStylePropTypes);
    const style = { ...ExampleStyleDefaultProps, ...supportedStyle }

    return (
      <Component
        {...other}
        className={`Example`}
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

+ `alt`: `string`
+ `async`: `bool` (TODO)
+ `className`: `string`
+ `src`: `string`
+ `style`: `ImageStylePropTypes`

#### ImageStylePropTypes

+ `BackgroundPropTypes`
+ `BorderThemePropTypes`
+ `LayoutPropTypes`
+ `opacity`: `string`


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
