# Touchable

A wrapper for making views respond to mouse, keyboard, and touch presses. On
press in, the touchable area can display a highlight color, and the opacity of
the wrapped view can be decreased.

This component combines the various `Touchable*` components from React Native.

Unsupported React Native props:
`accessibilityComponentType` (android) – use `accessibilityRole`,
`accessibilityTraits` (ios) – use `accessibilityRole`,
`onHideUnderlay` – use `onPressOut`,
`onShowUnderlay` – use `onPressIn`,
`underlayColor` – use `activeUnderlayColor`

## Props

**accessibilityLabel**: string

Overrides the text that's read by the screen reader when the user interacts
with the element.

(web) **accessibilityRole**: oneOf(roles) = 'button'

Allows assistive technologies to present and support interaction with the view
in a manner that is consistent with user expectations for similar views of that
type. For example, marking a touchable view with an `accessibilityRole` of
`button`. (This is implemented using [ARIA roles](http://www.w3.org/TR/wai-aria/roles#role_definitions)).

Note: Avoid changing `accessibilityRole` values over time or after user
actions. Generally, accessibility APIs do not provide a means of notifying
assistive technologies of a `role` value change.

**accessible**: bool = true

When `false`, the view is hidden from screenreaders.

**activeOpacity**: number = 0.8

Sets the opacity of the child view when `onPressIn` is called. The opacity is
reset when `onPressOut` is called.

(web) **activeUnderlayColor**: string = 'black'

Sets the color of the background highlight when `onPressIn` is called. The
highlight is removed when `onPressOut` is called.

**children**: element

A single child element.

**delayLongPress**: number = 500

Delay in ms, from `onPressIn`, before `onLongPress` is called.

**delayPressIn**: number = 0

(TODO)

Delay in ms, from the start of the touch, before `onPressIn` is called.

**delayPressOut**: number = 100

(TODO)

Delay in ms, from the release of the touch, before `onPressOut` is called.

**onLayout**: function

(TODO)

**onLongPress**: function

**onPress**: function

**onPressIn**: function

**onPressOut**: function

**style**: style

+ ...[View#style](View.md)

## Examples

```js
import React, { Component, PropTypes, Touchable } from 'react-native'

export default class Example extends Component {
  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <Touchable />
    )
  }
}
```
