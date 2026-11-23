/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import normalizeColor from '@react-native/normalize-colors';

import type { Nullable } from '../../types';

const processColor = (color?: string | number): Nullable<number> => {
  if (color == null) {
    return color;
  }

  // convert number and hex
  let int32Color = normalizeColor(color);
  if (int32Color === undefined || int32Color === null) {
    return undefined;
  }

  int32Color = ((int32Color << 24) | (int32Color >>> 8)) >>> 0;

  return int32Color;
};

export default processColor;
