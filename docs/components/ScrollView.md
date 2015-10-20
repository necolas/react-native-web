# ScrollView

Scrollable `View` for use with bounded height, either by setting the height of
the view directly (discouraged) or by bounding the height of ancestor views.

## Props

**children**: any

Child content.

**contentContainerStyle**: style

These styles will be applied to the scroll view content container which wraps
all of the child views.

**horizontal**: bool = false

When true, the scroll view's children are arranged horizontally in a row
instead of vertically in a column.

**onScroll**: function

Fires at most once per frame during scrolling. The frequency of the events can
be contolled using the `scrollEventThrottle` prop.

**scrollEnabled**: bool = true

When false, the content does not scroll.

**scrollEventThrottle**: number = 0

This controls how often the scroll event will be fired while scrolling (in
events per seconds). A higher number yields better accuracy for code that is
tracking the scroll position, but can lead to scroll performance problems. The
default value is `0`, which means the scroll event will be sent only once each
time the view is scrolled.

**style**: style

[View](View.md) style

## Examples

```js
import React, { ScrollView, StyleSheet } from 'react-native-web'

import Item from './Item'

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      items: Array.from({ length: 20 }).map((_, i) => ({ id: i }))
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
        scrollEventThrottle={60}
        style={styles.root}
      />
    )
  }
}

const styles = StyleSheet.create({
  root: {
    borderWidth: '1px'
  },
  container: {
    padding: '10px'
  }
})
```
