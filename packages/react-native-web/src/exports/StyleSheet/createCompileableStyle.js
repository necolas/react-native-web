/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import normalizeValueWithProperty from './normalizeValueWithProperty';
import resolveShadowValue from './resolveShadowValue';

const defaultOffset = { height: 0, width: 0 };

function boxShadowReducer(resolvedStyle, style) {
  const { boxShadow } = style;
  const shadow = resolveShadowValue(style);
  if (shadow != null) {
    resolvedStyle.boxShadow = boxShadow ? `${boxShadow}, ${shadow}` : shadow;
  }
}

function textShadowReducer(resolvedStyle, style) {
  const { textShadowColor, textShadowOffset, textShadowRadius } = style;
  const { height, width } = textShadowOffset || defaultOffset;
  const radius = textShadowRadius || 0;
  const offsetX = normalizeValueWithProperty(width);
  const offsetY = normalizeValueWithProperty(height);
  const blurRadius = normalizeValueWithProperty(radius);
  const color = normalizeValueWithProperty(textShadowColor, 'textShadowColor');

  if (
    color &&
    (height !== 0 || width !== 0 || radius !== 0) &&
    offsetX != null &&
    offsetY != null &&
    blurRadius != null
  ) {
    resolvedStyle.textShadow = `${offsetX} ${offsetY} ${blurRadius} ${color}`;
  }
}

const createCompileableStyle = (styles: Object) => {
  const {
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
    textShadowColor,
    textShadowOffset,
    textShadowRadius,
    ...nextStyles
  } = styles;

  if (
    shadowColor != null ||
    shadowOffset != null ||
    shadowOpacity != null ||
    shadowRadius != null
  ) {
    boxShadowReducer(nextStyles, styles);
  }

  if (textShadowColor != null || textShadowOffset != null || textShadowRadius != null) {
    textShadowReducer(nextStyles, styles);
  }
  return nextStyles;
};

export default createCompileableStyle;
