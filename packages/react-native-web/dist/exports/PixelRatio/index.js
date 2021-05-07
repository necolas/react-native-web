/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import Dimensions from '../Dimensions';
/**
 * PixelRatio gives access to the device pixel density.
 */

var PixelRatio = /*#__PURE__*/function () {
  function PixelRatio() {}

  /**
   * Returns the device pixel density.
   */
  PixelRatio.get = function get() {
    return Dimensions.get('window').scale;
  }
  /**
   * No equivalent for Web
   */
  ;

  PixelRatio.getFontScale = function getFontScale() {
    return Dimensions.get('window').fontScale || PixelRatio.get();
  }
  /**
   * Converts a layout size (dp) to pixel size (px).
   * Guaranteed to return an integer number.
   */
  ;

  PixelRatio.getPixelSizeForLayoutSize = function getPixelSizeForLayoutSize(layoutSize) {
    return Math.round(layoutSize * PixelRatio.get());
  }
  /**
   * Rounds a layout size (dp) to the nearest layout size that corresponds to
   * an integer number of pixels. For example, on a device with a PixelRatio
   * of 3, `PixelRatio.roundToNearestPixel(8.4) = 8.33`, which corresponds to
   * exactly (8.33 * 3) = 25 pixels.
   */
  ;

  PixelRatio.roundToNearestPixel = function roundToNearestPixel(layoutSize) {
    var ratio = PixelRatio.get();
    return Math.round(layoutSize * ratio) / ratio;
  };

  return PixelRatio;
}();

export { PixelRatio as default };