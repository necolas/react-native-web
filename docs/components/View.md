# View

`View` is the fundamental UI building block. It is a component that supports
style, layout with flexbox, and accessibility controls. It can be nested
inside another `View` and has 0-to-many children of any type.

Also, refer to React Native's documentation about the [Gesture Responder
System](http://facebook.github.io/react-native/releases/0.22/docs/gesture-responder-system.html).

Unsupported React Native props:
`onAccessibilityTap`,
`hitSlop`,
`onMagicTap`

## Props

NOTE: `View` will transfer all other props to the rendered HTML element.

**accessibilityLabel**: string

Overrides the text that's read by the screen reader when the user interacts
with the element. By default, the label is constructed by traversing all the
children and accumulating all the `Text` nodes separated by space. (This is
implemented using `aria-label`.)

**accessibilityLiveRegion**: oneOf('assertive', 'off', 'polite') = 'off'

Indicates to assistive technologies whether to notify the user when the view
changes. The values of this attribute are expressed in degrees of importance.
When regions are specified as `polite` (recommended), updates take low
priority. When regions are specified as `assertive`, assistive technologies
will interrupt and immediately notify the user. (This is implemented using
[`aria-live`](http://www.w3.org/TR/wai-aria/states_and_properties#aria-live).)

(web) **accessibilityRole**: oneOf(roles)

Allows assistive technologies to present and support interaction with the view
in a manner that is consistent with user expectations for similar views of that
type. For example, marking a touchable view with an `accessibilityRole` of
`button`. (This is implemented using [ARIA roles](http://www.w3.org/TR/wai-aria/roles#role_definitions)).

Note: Avoid changing `accessibilityRole` values over time or after user
actions. Generally, accessibility APIs do not provide a means of notifying
assistive technologies of a `role` value change.

**accessible**: bool = true

When `false`, the view is hidden from assistive technologies. (This is
implemented using `aria-hidden`.)

**hitSlop**: {top: number, left: number, bottom: number, right: number}

This defines how far a touch event can start away from the view. Typical
interface guidelines recommend touch targets that are at least 30 - 40
points/density-independent pixels.

For example, if a touchable view has a height of 20 the touchable height can be
extended to 40 with `hitSlop={{top: 10, bottom: 10, left: 0, right: 0}}`.

**onLayout**: function

Invoked on mount and layout changes with `{ nativeEvent: { layout: { x, y, width,
height } } }`, where `x` and `y` are the offsets from the parent node.

**onMoveShouldSetResponder**: function

**onMoveShouldSetResponderCapture**: function

**onResponderGrant**: function

For most touch interactions, you'll simply want to wrap your component in
`TouchableHighlight` or `TouchableOpacity`.

**onResponderMove**: function

**onResponderReject**: function

**onResponderRelease**: function

**onResponderTerminate**: function

**onResponderTerminationRequest**: function

**onStartShouldSetResponder**: function

**onStartShouldSetResponderCapture**: function

**pointerEvents**: oneOf('auto', 'box-only', 'box-none', 'none') = 'auto'

Configure the `pointerEvents` of the view. The enhanced `pointerEvents` modes
provided are not part of the CSS spec, therefore, `pointerEvents` is excluded
from `style`.

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

**style**: style

+ `alignContent`
+ `alignItems`
+ `alignSelf`
+ `animationDelay` ‡
+ `animationDirection` ‡
+ `animationDuration` ‡
+ `animationFillMode` ‡
+ `animationIterationCount` ‡
+ `animationName` ‡
+ `animationPlayState` ‡
+ `animationTimingFunction` ‡
+ `backfaceVisibility`
+ `backgroundAttachment` ‡
+ `backgroundClip` ‡
+ `backgroundColor`
+ `backgroundImage` ‡
+ `backgroundOrigin` ‡
+ `backgroundPosition` ‡
+ `backgroundRepeat` ‡
+ `backgroundSize` ‡
+ `borderColor` (single value)
+ `borderTopColor`
+ `borderBottomColor`
+ `borderRightColor`
+ `borderLeftColor`
+ `borderRadius` (single value)
+ `borderTopLeftRadius`
+ `borderTopRightRadius`
+ `borderBottomLeftRadius`
+ `borderBottomRightRadius`
+ `borderStyle` (single value)
+ `borderTopStyle`
+ `borderRightStyle`
+ `borderBottomStyle`
+ `borderLeftStyle`
+ `borderWidth` (single value)
+ `borderBottomWidth`
+ `borderLeftWidth`
+ `borderRightWidth`
+ `borderTopWidth`
+ `bottom`
+ `boxShadow`
+ `boxSizing`
+ `cursor` ‡
+ `display` ‡
+ `flex` (number)
+ `flexBasis`
+ `flexDirection`
+ `flexGrow`
+ `flexShrink`
+ `flexWrap`
+ `height`
+ `justifyContent`
+ `left`
+ `margin` (single value)
+ `marginBottom`
+ `marginHorizontal`
+ `marginLeft`
+ `marginRight`
+ `marginTop`
+ `marginVertical`
+ `maxHeight`
+ `maxWidth`
+ `minHeight`
+ `minWidth`
+ `opacity`
+ `order`
+ `outline` ‡
+ `overflow`
+ `overflowX` ‡
+ `overflowY` ‡
+ `padding` (single value)
+ `paddingBottom`
+ `paddingHorizontal`
+ `paddingLeft`
+ `paddingRight`
+ `paddingTop`
+ `paddingVertical`
+ `perspective` ‡
+ `perspectiveOrigin` ‡
+ `position`
+ `right`
+ `top`
+ `transform`
+ `transformOrigin` ‡
+ `transitionDelay` ‡
+ `transitionDuration` ‡
+ `transitionProperty` ‡
+ `transitionTimingFunction` ‡
+ `userSelect` ‡
+ `visibility` ‡
+ `width`
+ `willChange` ‡
+ `zIndex`

‡ web only.

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

**testID**: string

Used to locate this view in end-to-end tests.

## Examples

```js
import React, { Component, PropTypes } from 'react'
import { StyleSheet, View } from 'react-native'

export default class ViewExample extends Component {
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

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  cell: {
    flexGrow: 1
  }
})
```
