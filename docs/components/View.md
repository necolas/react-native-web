# View

`View` is the fundamental UI building block. It is a component that supports
style, layout with flexbox, and accessibility controls.  It can be nested
inside another `View` and has 0-to-many children of any type.

## Props

**accessibilityLabel** string

Overrides the text that's read by the screen reader when the user interacts
with the element. This is implemented using `aria-label`.

**component** function, string

Default is `div`.

**pointerEvents** oneOf('auto', 'box-only', 'box-none', 'none')

We deviate from the CSS spec by supporting additional `pointerEvents` modes,
therefore `pointerEvents` is excluded from `style`.

`box-none` is the equivalent of:

```css
.box-none { pointer-events: none }
.box-none * { pointer-events: auto }
```

`box-only` is the equivalent of:

```css
.box-only { pointer-events: auto }
.box-only * { pointer-events: none }
```

**style** style

+ `alignContent`
+ `alignItems`
+ `alignSelf`
+ `backfaceVisibility`
+ `backgroundAttachment`
+ `backgroundClip`
+ `backgroundColor`
+ `backgroundImage`
+ `backgroundOrigin`
+ `backgroundPosition`
+ `backgroundRepeat`
+ `backgroundSize`
+ `borderColor`
+ `borderRadius`
+ `borderStyle`
+ `borderWidth`
+ `bottom`
+ `boxShadow`
+ `boxSizing`
+ `flexBasis`
+ `flexDirection`
+ `flexGrow`
+ `flexShrink`
+ `flexWrap`
+ `height`
+ `justifyContent`
+ `left`
+ `margin`
+ `maxHeight`
+ `maxWidth`
+ `minHeight`
+ `minWidth`
+ `opacity`
+ `order`
+ `overflow`
+ `overflowX`
+ `overflowY`
+ `padding`
+ `position`
+ `right`
+ `top`
+ `transform`
+ `userSelect`
+ `visibility`
+ `width`
+ `zIndex`

Default:

```js
{
  alignItems: 'stretch',
  borderWidth: 0,
  borderStyle: 'solid',
  boxSizing: 'border-box',
  display: 'flex',
  flexBasis: 'auto',
  flexDirection: 'column',
  flexShrink: 0,
  margin: 0,
  padding: 0,
  position: 'relative'
};
```

(See [facebook/css-layout](https://github.com/facebook/css-layout)).

**testID** string

Used to locate this view in end-to-end tests.

## Examples

```js
import React, { View } from 'react-native-web'

const { Component, PropTypes } = React

class Example extends Component {
  render() {
    return (
      <View style={styles.row}>
        {
          ['1', '2', '3', '4', '5'].map((value, i) => {
            return <View children={value} key={i} style={styles.cell} />
          })
        }
      </View>
    );
  }
}

const styles = {
  row: {
    flexDirection: 'row'
  },
  cell: {
    flexGrow: 1
  }
}

export default Example
```
