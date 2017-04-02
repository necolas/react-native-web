# ScrollView

A scrollable `View` that provides itegration with the touch-locking "responder"
system. `ScrollView`'s must have a bounded height: either set the height of the
view directly (discouraged) or make sure all parent views have bounded height
(e.g., transfer `{ flex: 1}` down the view stack).

## Props

[...View props](./View.md)

**contentContainerStyle**: ?style

These styles will be applied to the scroll view content container which wraps
all of the child views.

**horizontal**: ?boolean = false

When `true`, the scroll view's children are arranged horizontally in a row
instead of vertically in a column.

**keyboardDismissMode**: ?enum('none', 'on-drag') = 'none'

Determines whether the keyboard gets dismissed in response to a scroll drag.

* `none` (the default), drags do not dismiss the keyboard.
* `on-drag`, the keyboard is dismissed when a drag begins.
* `interactive` (not supported on web; same as `none`)

**onContentSizeChange**: ?function

Called when scrollable content view of the `ScrollView` changes. It's
implemented using the `onLayout` handler attached to the content container
which this `ScrollView` renders.

**onScroll**: ?function

Fires at most once per frame during scrolling. The frequency of the events can
be contolled using the `scrollEventThrottle` prop.

Invoked on scroll with the following event:

```js
{
  nativeEvent: {
    contentOffset: { x, y },
    contentSize: { height, width },
    layoutMeasurement: { height, width }
  }
}
```

**refreshControl**: ?element

TODO

A [RefreshControl](../RefreshControl) component, used to provide
pull-to-refresh functionality for the `ScrollView`.

**scrollEnabled**: ?boolean = true

When false, the content does not scroll.

**scrollEventThrottle**: ?number = 0

This controls how often the scroll event will be fired while scrolling (as a
time interval in ms). A lower number yields better accuracy for code that is
tracking the scroll position, but can lead to scroll performance problems. The
default value is `0`, which means the scroll event will be sent only once each
time the view is scrolled.

## Instance methods

**getInnerViewNode()**: any

Returns a reference to the underlying content container DOM node within the `ScrollView`.

**getScrollableNode()**: any

Returns a reference to the underlying scrollable DOM node.

**getScrollResponder()**: Component

Returns a reference to the underlying scroll responder, which supports
operations like `scrollTo`. All `ScrollView`-like components should implement
this method so that they can be composed while providing access to the
underlying scroll responder's methods.

**scrollTo(options: { x: number = 0; y: number = 0; animated: boolean = true })**

Scrolls to a given `x`, `y` offset (animation is not currently supported).

## Examples

```js
import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import Item from './Item'

export default class ScrollViewExample extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      items: Array.from(new Array(20)).map((_, i) => ({ id: i }))
    }
  }

  onScroll(e) {
    console.log(e)
  }

  render() {
    return (
      <ScrollView
        children={this.state.items.map((item) => <Item {...item} />)}
        contentContainerStyle={styles.container}
        horizontal
        onScroll={(e) => this.onScroll(e)}
        scrollEventThrottle={100}
        style={styles.root}
      />
    )
  }
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1
  },
  container: {
    padding: 10
  }
})
```
