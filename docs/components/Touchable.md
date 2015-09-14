# Touchable

A wrapper for making views respond to mouse, keyboard, and touch presses. On
press in, the touchable area can display a highlight color, and the opacity of
the wrapped view can be decreased.

## Props

**accessibilityLabel** string

Overrides the text that's read by the screen reader when the user interacts
with the element.

**accessibilityRole** oneOf(roles)

Allows assistive technologies to present and support interaction with the view
in a manner that is consistent with user expectations for similar views of that
type. For example, marking a touchable view with an `accessibilityRole` of
`button`. (This is implemented using [ARIA roles](http://www.w3.org/TR/wai-aria/roles#role_definitions)).

Note: Avoid changing `accessibilityRole` values over time or after user
actions. Generally, accessibility APIs do not provide a means of notifying
assistive technologies of a `role` value change.

**accessible** bool

When `false`, the view is hidden from screenreaders. Default: `true`.

**activeHighlight** string

Sets the color of the background highlight when `onPressIn` is called. The
highlight is removed when `onPressOut` is called. Default: `transparent`.

**activeOpacity** number

Sets the opacity of the child view when `onPressIn` is called. The opacity is
reset when `onPressOut` is called. Default: `1`.

**children** element

A single child element.

**delayLongPress** number

Delay in ms, from `onPressIn`, before `onLongPress` is called. Default: `1000`.

**delayPressIn** number (TODO)

Delay in ms, from the start of the touch, before `onPressIn` is called. Default: `0`.

**delayPressOut** number (TODO)

Delay in ms, from the release of the touch, before `onPressOut` is called. Default: `0`.

**onLongPress** function

**onPress** function

**onPressIn** function

**onPressOut** function

**style** style

[View](View.md) style

## Examples

```js
import React, { Touchable } from 'react-native-web'

const { Component, PropTypes } = React;

class Example extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  render() {
    return (
      <Touchable />
    )
  }
}
```
