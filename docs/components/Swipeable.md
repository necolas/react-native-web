# Swipeable

Unique to web.

## Props

**delta**: number = 10

Number of pixels that must be swiped before events are dispatched.

**flickThreshold**: number = 0.6

The velocity threshold at which a swipe is considered a flick.

**onSwiped**: function

(SyntheticTouchEvent, deltaX, deltaY, isFlick) => swipeHandler

Called once a swipe has ended.

**onSwipedDown**: function

(SyntheticTouchEvent, delta, isFlick) => swipeHandler

Called once a swipe-down has ended.

**onSwipedLeft**: function

(SyntheticTouchEvent, delta, isFlick) => swipeHandler

Called once a swipe-left has ended.

**onSwipedUp**: function

(SyntheticTouchEvent, delta, isFlick) => swipeHandler

Called once a swipe-up has ended.

**onSwipedRight**: function

(SyntheticTouchEvent, delta, isFlick) => swipeHandler

Called once a swipe-right has ended.

**onSwipingDown**: function

(SyntheticTouchEvent, delta, isFlick) => swipeHandler

Called while a swipe-down is in progress.

**onSwipingLeft**: function

(SyntheticTouchEvent, delta, isFlick) => swipeHandler

Called while a swipe-left is in progress.

**onSwipingRight**: function

(SyntheticTouchEvent, delta, isFlick) => swipeHandler

Called while a swipe-right is in progress.

**onSwipingUp**: function

(SyntheticTouchEvent, delta, isFlick) => swipeHandler

Called while a swipe-up is in progress.

## Examples

```js
import React, { Swipeable } from 'react-native-web'

const { Component, PropTypes } = React;

class Example extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  _onSwiped(event, x, y, isFlick) {

  }

  render() {
    return (
      <Swipeable
        onSwiped={this._onSwiped.bind(this)}
      />
    )
  }
}
```
