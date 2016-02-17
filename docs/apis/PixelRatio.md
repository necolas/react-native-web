# PixelRatio

`PixelRatio` gives access to the device pixel density.

## Methods

static **get**()

Returns the device pixel density. Some examples:

* PixelRatio.get() === 1
  * mdpi Android devices (160 dpi)
* PixelRatio.get() === 1.5
  * hdpi Android devices (240 dpi)
* PixelRatio.get() === 2
  * iPhone 4, 4S
  * iPhone 5, 5c, 5s
  * iPhone 6
  * xhdpi Android devices (320 dpi)
* PixelRatio.get() === 3
  * iPhone 6 plus
  * xxhdpi Android devices (480 dpi)
* PixelRatio.get() === 3.5
  * Nexus 6

static **getPixelSizeForLayoutSize**(layoutSize: number)

Converts a layout size (dp) to pixel size (px). Guaranteed to return an integer
number.

static **roundToNearestPixel**(layoutSize: number)

Rounds a layout size (dp) to the nearest layout size that corresponds to an
integer number of pixels. For example, on a device with a PixelRatio of 3,
`PixelRatio.roundToNearestPixel(8.4)` = `8.33`, which corresponds to exactly
`(8.33 * 3)` = `25` pixels.

## Examples

Fetching a correctly sized image. You should get a higher resolution image if
you are on a high pixel density device. A good rule of thumb is to multiply the
size of the image you display by the pixel ratio.

```js
const image = getImage({
  width: PixelRatio.getPixelSizeForLayoutSize(200),
  height: PixelRatio.getPixelSizeForLayoutSize(100),
});

<Image source={image} style={{ width: 200, height: 100 }} />
```
