# ScrollView

TODO

## Props

**children**: any

Child content.

**contentContainerStyle**: style

These styles will be applied to the scroll view content container which wraps
all of the child views. Example:

**horizontal**: bool = false

When true, the scroll view's children are arranged horizontally in a row instead of vertically in a column. Default: `false`.

**onScroll**: function

Fires at most once per frame during scrolling. The frequency of the events can be contolled using the `scrollEventThrottle` prop.

**scrollEnabled**: bool

When false, the content does not scroll. Default: `true`.

**scrollEventThrottle**: number

This controls how often the scroll event will be fired while scrolling (in
events per seconds). A higher number yields better accuracy for code that is
tracking the scroll position, but can lead to scroll performance problems.
Default: `0` (the scroll event will be sent only once each time the view is
scrolled.)

**style**: style

[View](View.md) style

## Examples

```js
import React, { ScrollView } from 'react-native-web'

const { Component, PropTypes } = React;

class Example extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  render() {
    return (
    )
  }
}
```
