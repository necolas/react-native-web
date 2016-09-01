# ActivityIndicator

## Props

[...View props](./View.md)

**animating**: bool = true

Whether to show the indicator or hide it.

**color**: string = '#1976D2'

The foreground color of the spinner.

**hidesWhenStopped**: bool = true

Whether the indicator should hide when not animating.

**size**: oneOf('small, 'large') | number = 'small'

Size of the indicator. Small has a height of `20`, large has a height of `36`.

## Examples

```js
import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

class ToggleAnimatingActivityIndicator extends Component {
  constructor(props) {
    super(props)
    this.state = { animating: true }
  }

  componentDidMount: function() {
    this.setToggleTimeout();
  }

  render() {
    return (
      <ActivityIndicator
        animating={this.state.animating}
        size="large"
        style={[styles.centering, { height: 80 }]}
      />
    );
  }

  _setToggleTimeout() {
    setTimeout(() => {
      this.setState({ animating: !this.state.animating })
      this._setToggleTimeout()
    }, 1200)
  }
})

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  gray: {
    backgroundColor: '#cccccc'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
```
