# react-web-sdk

**Experimental / Proof of concept**

A React SDK (~9KB gzipped) for creating web applications and toolkits. Inspired by `react-native`.

It includes the following components:

* `Image`: an image primitive
* `Text`: a text primitive
* `TextInput`: a text input primitive
* `View`: a flexbox primitive

And uses a [styling strategy](docs/styling-strategy.md) that maps inline styles
to single-purpose CSS rules.

This proof of concept uses a CSS bundle (~4.5KB gzipped) of 300+ precomputed
declarations. A more sophisticated implementation is likely to produce a
slightly larger CSS file and fewer inline styles.

## Components

All components define explicit `style` PropTypes according to the [`StyleProp`
spec](docs/StyleProp.spec.md).

### View

TODO

A flexbox container; foundational layout building block.

[`View` spec](docs/View.spec.md)

See this [guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

### Text

TODO

[`Text` spec](docs/Text.spec.md)

### TextInput

TODO

[`Text` spec](docs/TextInput.spec.md)

### Image

TODO

[`Image` spec](docs/Image.spec.md)

## Styling

Styling is identical to using inline styles in React, but most inline styles
are converted to unique CSS classes.

The companion stylesheet can be referenced as an external resource, inlined, or
injected by JS.

See the [styling strategy docs](docs/styling-strategy.md) for more details.

### Use plain JavaScript objects

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

### Use the `style` attribute

The `style` attribute is a simple API for creating element-scoped styles.

```js
import { View } from 'react-web-sdk';

class Example extends React.Component {
  render() {
    return (
      <View style={style.root}>...</View>
    );
  }
}
```

Combine and override style objects:

```js
import baseStyle from './baseStyle';

const buttonStyle = {
  ...baseStyle,
  backgroundColor: '#333',
  color: '#fff'
}
```

The styling strategy can be applied directly to non-SDK elements:

```js
import { stylingStrategy } from 'react-web-sdk';

class Example extends React.Component {
  render() {
    return (
      <div {...stylingStrategy({
        style: {
          opacity: 0.5
        }
      })} />
    );
  }
}
```


## Utilities

#### `getOtherProps(reactComponentInstance)`

Returns an object containing all the props from `this.props` that are not
defined in `propTypes`.

#### `omitProps(obj, arrayOfExcludedProps)`

Returns an object with the specified props excluded.

#### `pickProps(obj, arrayOfIncludedProps)`

Returns an object with the specified props included.

## Development

```
npm install
npm run build:example:watch
open example/index.html
```
