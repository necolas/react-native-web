# Touchable

A wrapper for making views respond to mouse, keyboard, and touch presses. On
press in, the touchable area can display a highlight color, and the opacity of
the wrapped view can be decreased.

## Props

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
