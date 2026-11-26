/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import processColor from '../../../exports/processColor';
import isWebColor from '../../../modules/isWebColor';
import { getSystemColor } from '../../../modules/systemColors';
import type { Nullable } from '../../../types';

const normalizeColor = (
  color?: Nullable<number | string>,
  opacity: number | null = 1
): string | undefined => {
  if (color == null) return;

  let value: Nullable<string>;

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
      const alpha = (a * (opacity as number)).toFixed(2);
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
