# Text

`Text` is component for displaying text. It supports style, basic touch
handling, and inherits typographic styles from ancestor elements.

The `Text` is unique relative to layout: child elements use text layout
(`inline`) rather than flexbox layout. This means that elements inside of a
`Text` are not rectangles, as they wrap when reaching the edge of their
container.

Unsupported React Native props:
`allowFontScaling` (ios),
`suppressHighlighting` (ios)

## Props

NOTE: `Text` will transfer all other props to the rendered HTML element.

(web) **accessibilityLabel**: ?string

Overrides the text that's read by a screen reader when the user interacts
with the element. (This is implemented using `aria-label`.)

See the [Accessibility guide](../guides/accessibility) for more information.

(web) **accessibilityRole**: ?oneOf(roles)

Allows assistive technologies to present and support interaction with the view
in a manner that is consistent with user expectations for similar views of that
type. For example, marking a touchable view with an `accessibilityRole` of
`button`. (This is implemented using [ARIA roles](http://www.w3.org/TR/wai-aria/roles#role_definitions)).

See the [Accessibility guide](../guides/accessibility) for more information.

**accessible**: ?boolean

When `true`, indicates that the view is an accessibility element (i.e.,
focusable) and groups its child content. By default, all the touchable elements
and elements with `accessibilityRole` of `button` and `link` are accessible.
(This is implemented using `tabindex`.)

See the [Accessibility guide](../guides/accessibility) for more information.

**children**: ?any

Child content.

**importantForAccessibility**: ?enum('auto', 'no-hide-descendants', 'yes')

A value of `no` will remove the element from the tab flow.

A value of `no-hide-descendants` will hide the element and its children from
assistive technologies. (This is implemented using `aria-hidden`.)

See the [Accessibility guide](../guides/accessibility) for more information.

**numberOfLines**: ?number

Truncates the text with an ellipsis after this many lines. Currently only supports `1`.

**onLayout**: ?function

Invoked on mount and layout changes with `{ nativeEvent: { layout: { x, y, width,
height } } }`, where `x` and `y` are the offsets from the parent node.

**onPress**: ?function

This function is called on press.

**selectable**: ?boolean

When `false`, the text is not selectable.

**style**: ?style

+ ...[View#style](View.md)
+ `color`
+ `fontFamily`
+ `fontFeatureSettings` ‡
+ `fontSize`
+ `fontStyle`
+ `fontWeight`
+ `letterSpacing`
+ `lineHeight`
+ `textAlign`
+ `textAlignVertical`
+ `textDecorationLine`
+ `textOverflow` ‡
+ `textRendering` ‡
+ `textShadowColor`
+ `textShadowOffset`
+ `textShadowRadius`
+ `textTransform` ‡
+ `unicodeBidi` ‡
+ `whiteSpace`
+ `wordWrap` ‡
+ `writingDirection`

‡ web only.

**testID**: ?string

Used to locate this view in end-to-end tests.

## Examples

```js
import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text } from 'react-native'

export default class PrettyText extends Component {
  static propTypes = {
    ...Text.propTypes,
    color: PropTypes.oneOf(['white', 'gray', 'red']),
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    weight: PropTypes.oneOf(['light', 'normal', 'bold'])
  };

  static defaultProps = {
    ...Text.defaultProps,
    color: 'gray',
    size: 'normal',
    weight: 'normal'
  };

  render() {
    const { color, size, style, weight, ...other } = this.props;

    return (
      <Text
        ...other
        style={[
          style,
          colorStyles[color],
          sizeStyles[size],
          weightStyles[weight]
        ]}
      />
    );
  }
}

const colorStyles = StyleSheet.create({
  white: { color: 'white' },
  gray: { color: 'gray' },
  red: { color: 'red' }
})

const sizeStyles = StyleSheet.create({
  small: { fontSize: '0.85rem', padding: '0.5rem' },
  normal: { fontSize: '1rem', padding: '0.75rem' },
  large: { fontSize: '1.5rem', padding: '1rem' }
})

const weightStyles = StyleSheet.create({
  light: { fontWeight: '300' },
  normal: { fontWeight: '400' },
  bold: { fontWeight: '700' }
})
```
