# Image spec

#### PropTypes

All other props are transferred to the resulting `img`.

+ `accessibilityLabel`: `string`
+ `source`: `object`
+ `style`: `ImageStylePropTypes`

#### ImageStylePropTypes

+ `BackgroundPropTypes`
+ `BorderThemePropTypes`
+ `LayoutPropTypes`
+ `opacity`: `string`

#### Examples

```js
import React, { Image } from 'react-native-web'

const { Component, PropTypes } = React;

class Avatar extends Component {
  static propTypes = {
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    user: PropTypes.object
  }

  static defaultProps = {
    size: 'normal'
  }

  render() {
    return (
      <Image
        accessibilityLabel={`${user.name}'s profile picture`}
        source={{ uri: user.avatarUrl }}
        style={ ...style.base, ...style[this.props.size] }
      />
    )
  }
}

const style = {
  base: {
    borderColor: 'white',
    borderRadius: '5px',
    borderWidth: '5px'
  },
  small: {
    height: '32px',
    width: '32px'
  },
  normal: {
    height: '48px',
    width: '48px'
  },
  large: {
    height: '64px',
    width: '32px'
  }
}
```
