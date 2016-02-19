# Image

An accessibile image component with support for image resizing, default image,
and child content.

Unsupported React Native props:
`capInsets` (ios),
`onProgress` (ios)

## Props

**accessibilityLabel**: string

The text that's read by a screenreader when someone interacts with the image.

**accessible**: bool

When `false`, the view is hidden from screenreaders. Default: `true`.

**children**: any

Content to display over the image.

**defaultSource**: { uri: string }

An image to display as a placeholder while downloading the final image off the network.

**onError**: function

Invoked on load error with `{nativeEvent: {error}}`.

**onLayout**: function

TODO

**onLoad**: function

Invoked when load completes successfully.

**onLoadEnd**: function

Invoked when load either succeeds or fails,

**onLoadStart**: function

Invoked on load start.

**resizeMode**: oneOf('contain', 'cover', 'none', 'stretch') = 'stretch'

Determines how to resize the image when the frame doesn't match the raw image
dimensions.

**source**: { uri: string }

`uri` is a string representing the resource identifier for the image, which
could be an http address or a base64 encoded image.

**style**: style

+ ...[View#style](View.md)

Defaults:

```js
{
  alignSelf: 'flex-start',
  backgroundColor: 'transparent'
}
```

**testID**: string

Used to locate a view in end-to-end tests.

## Examples

```js
import placeholderAvatar from './placeholderAvatar.png'
import React, { Component, Image, PropTypes, StyleSheet } from 'react-native'

export default class ImageExample extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = { loading: true }
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
    this.setState({ loading: false })
  }

  render() {
    const { size, testID, user } = this.props
    const loadingStyle = this.state.loading ? { styles.loading } : { }

    return (
      <Image
        accessibilityLabel={`${user.name}'s profile picture`}
        defaultSource={{ uri: placeholderAvatar }}
        onLoad={this._onLoad.bind(this)}
        resizeMode='cover'
        source={{ uri: user.avatarUrl }}
        style={[
          styles.base,
          styles[size],
          loadingStyle
        ]}
      />
    )
  }
}

const styles = StyleSheet.create({
  base: {
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 5
  },
  loading: {
    opacity: 0.5
  },
  small: {
    height: 32,
    width: 32
  },
  normal: {
    height: 48,
    width: 48
  },
  large: {
    height: 64,
    width: 64
  }
})
```
