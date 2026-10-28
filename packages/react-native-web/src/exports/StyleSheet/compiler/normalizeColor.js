/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { getSystemColor } from '../../../modules/systemColors';
import isWebColor from '../../../modules/isWebColor';
import processColor from '../../../exports/processColor';

const normalizeColor = (
  color?: number | string,
  opacity?: number = 1
): void | string => {
  if (color == null) return;

  let value: ?string;

  if (typeof color === 'string' && isWebColor(color)) {
    // The opacity warning is only for system colors (PlatformColor output)
    if (!color.startsWith('var(--rnw-')) {
      return color;
    }
    value = color;
  } else {
    const colorInt = processColor(color);

    if (colorInt != null) {
      const r = (colorInt >> 16) & 255;
      const g = (colorInt >> 8) & 255;
      const b = colorInt & 255;
      const a = ((colorInt >> 24) & 255) / 255;
      const alpha = (a * opacity).toFixed(2);
      return `rgba(${r},${g},${b},${alpha})`;
    }

    // System colors are checked last, as they are less common
    if (typeof color === 'string') {
      value = getSystemColor(color);
    }
  }

  if (value != null) {
    if (process.env.NODE_ENV !== 'production') {
      if (opacity != null && opacity !== 1) {
        console.error(
          `Opacity is not supported for the color "${color}". It is ignored.`
        );
      }
    }

    return value;
  }
};

export default normalizeColor;
