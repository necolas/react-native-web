/**
 * Copyright (c) 2018-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import normalizeColor from '../../modules/normalizeColor';
import normalizeValue from './normalizeValue';

const defaultOffset = { height: 0, width: 0 };

const resolveShadowValue = (style: Object) => {
  const { shadowColor, shadowOffset, shadowOpacity, shadowRadius } = style;
  const { height, width } = shadowOffset || defaultOffset;
  const offsetX = normalizeValue(null, width);
  const offsetY = normalizeValue(null, height);
  const blurRadius = normalizeValue(null, shadowRadius || 0);
  const color = normalizeColor(shadowColor || 'black', shadowOpacity);
  if (color) {
    return `${offsetX} ${offsetY} ${blurRadius} ${color}`;
  }
};

export default resolveShadowValue;
