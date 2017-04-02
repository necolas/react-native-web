# Image

An accessibile image component with support for image resizing, default image,
and child content.

Unsupported React Native props:
`capInsets` (ios),
`onProgress` (ios)

## Props

**accessibilityLabel**: ?string

The text that's read by a screenreader when someone interacts with the image.

**accessible**: ?boolean

When `true`, indicates the image is an accessibility element.

**children**: ?any

Content to display over the image.

**defaultSource**: ?object

An image to display as a placeholder while downloading the final image off the
network. `{ uri: string, width, height }`

**onError**: ?function

Invoked on load error with `{nativeEvent: {error}}`.

**onLayout**: ?function

Invoked on mount and layout changes with `{ nativeEvent: { layout: { x, y, width,
height } } }`, where `x` and `y` are the offsets from the parent node.

**onLoad**: ?function

Invoked when load completes successfully.

**onLoadEnd**: ?function

Invoked when load either succeeds or fails,

**onLoadStart**: ?function

Invoked on load start.

**resizeMode**: ?enum('center', 'contain', 'cover', 'none', 'repeat', 'stretch') = 'cover'

Determines how to resize the image when the frame doesn't match the raw image
dimensions.

**source**: ?object

`uri` is a string representing the resource identifier for the image, which
could be an http address or a base64 encoded image. `{ uri: string, width, height }`

**style**: ?style

+ ...[View#style](./View.md)
+ `resizeMode`

**testID**: ?string

Used to locate a view in end-to-end tests.

## Properties

static **resizeMode**: object

Example usage:

```
<Image resizeMode={Image.resizeMode.contain} />
```

## Methods

static **getSize**(uri: string, success: (width, height) => {}, failure: function)

Retrieve the width and height (in pixels) of an image prior to displaying it.
This method can fail if the image cannot be found, or fails to download.

(In order to retrieve the image dimensions, the image may first need to be
loaded or downloaded, after which it will be cached. This means that in
principle you could use this method to preload images, however it is not
optimized for that purpose, and may in future be implemented in a way that does
not fully load/download the image data.)

static **prefetch**(url: string): Promise

Prefetches a remote image for later use by downloading it.

## Examples

```js
import placeholderAvatar from './placeholderAvatar.png'
import React, { Component } from 'react'
import { Image, PropTypes, StyleSheet } from 'react-native'

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
