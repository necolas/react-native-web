# Image

An accessibile image component with support for image resizing, default image,
and child content.

## Props

**accessibilityLabel** string

The text that's read by the screen reader when the user interacts with the image.

**children** any

Content to display over the image.

**defaultSource** { uri: string }

An image to display as a placeholder while downloading the final image off the network.

**onError** function

Invoked on load error with `{nativeEvent: {error}}`.

**onLoad** function

Invoked when load completes successfully.

**onLoadEnd** function

Invoked when load either succeeds or fails,

**onLoadStart** function

Invoked on load start.

**resizeMode** oneOf('clip', 'contain', 'cover', 'stretch')

Determines how to resize the image when the frame doesn't match the raw image
dimensions. Default: `cover`.

**source** { uri: string }

`uri` is a string representing the resource identifier for the image, which
could be an http address or a base64 encoded image.

**style** style

[View](View.md) style

Defaults:

```js
{
  alignSelf: 'flex-start',
  backgroundColor: 'lightGray'
}
```

**testID** string

Used to locate a view in end-to-end tests.

## Examples

```js
import placeholderAvatar from './placeholderAvatar.png'
import React, { Image } from 'react-native-web'

const { Component, PropTypes } = React;

class Avatar extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { isLoaded: false }
  }

  static propTypes = {
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    testID: Image.propTypes.testID,
    user: PropTypes.object
  }

  static defaultProps = {
    size: 'normal'
  }

  _onLoad(e) {
    console.log('Avatar.onLoad', e)
    this.setState({ isLoaded: true })
  }

  render() {
    const { size, testID, user } = this.props
    const { isLoaded } = this.state

    return (
      <Image
        accessibilityLabel={`${user.name}'s profile picture`}
        defaultSource={{ uri: placeholderAvatar }}
        onLoad={this._onLoad.bind(this)}
        resizeMode='cover'
        source={{ uri: user.avatarUrl }}
        style={ ...style.base, ...style[size], ...style[isLoaded] }
      />
    )
  }
}

const style = {
  base: {
    borderColor: 'white',
    borderRadius: '5px',
    borderWidth: '5px',
    opacity: 0.5,
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
    width: '64px'
  }
  isLoaded: {
    opacity: 1
  }
}
```
