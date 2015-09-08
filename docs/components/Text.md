# Text

`Text` is component for displaying text. It supports style, basic touch
handling, and inherits typographic styles from ancestor elements. In a
divergence from React Native, components other than `Text` can be children of a
`Text` component.

The `Text` is unique relative to layout: child elements use text layout
(`inline-block`) rather than flexbox layout. This means that elements inside of
a `Text` are not rectangles, as they wrap when reaching the edge of their
container.

## Props

NOTE: `Text` will transfer all other props to the rendered HTML element.

**children** any

Child content.

**component** function or string

Default is `span`.

**numberOfLines** number.

Truncates the text with an ellipsis after this many lines.

**onPress** function

This function is called on press.

**style** style

+ `backgroundColor`
+ `color`
+ `direction`
+ `fontFamily`
+ `fontSize`
+ `fontStyle`
+ `fontWeight`
+ `letterSpacing`
+ `lineHeight`
+ `margin`
+ `padding`
+ `textAlign`
+ `textDecoration`
+ `textTransform`
+ `whiteSpace`
+ `wordWrap`

**testID** string

Used to locate this view in end-to-end tests.

## Examples

```js
import React, { Text } from 'react-native-web'

const { Component, PropTypes } = React

class PrettyText extends Component {
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
