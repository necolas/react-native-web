/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import ColorPropType from '../ColorPropType';
import ViewStylePropTypes from '../View/ViewStylePropTypes';
import { array, number, oneOf, oneOfType, shape, string } from 'prop-types';

const numberOrString = oneOfType([number, string]);

const TextStylePropTypes = {
  ...ViewStylePropTypes,
  color: ColorPropType,
  fontFamily: string,
  fontFeatureSettings: string,
  fontSize: numberOrString,
  fontStyle: string,
  fontWeight: string,
  fontVariant: array,
  letterSpacing: numberOrString,
  lineHeight: numberOrString,
  textAlign: oneOf([
    'center',
    'end',
    'inherit',
    'justify',
    'justify-all',
    'left',
    'right',
    'start'
  ]),
  textAlignVertical: string,
  textDecorationColor: ColorPropType,
  textDecorationLine: string,
  textDecorationStyle: string,
  textShadowColor: ColorPropType,
  textShadowOffset: shape({ width: number, height: number }),
  textShadowRadius: number,
  textTransform: oneOf(['capitalize', 'lowercase', 'none', 'uppercase']),
  writingDirection: oneOf(['auto', 'ltr', 'rtl']),
  /* @platform web */
  textIndent: numberOrString,
  textOverflow: string,
  textRendering: oneOf(['auto', 'geometricPrecision', 'optimizeLegibility', 'optimizeSpeed']),
  unicodeBidi: oneOf([
    'normal',
    'bidi-override',
    'embed',
    'isolate',
    'isolate-override',
    'plaintext'
  ]),
  whiteSpace: string,
  wordBreak: oneOf(['normal', 'break-all', 'break-word', 'keep-all']),
  wordWrap: string,
  MozOsxFontSmoothing: string,
  WebkitFontSmoothing: string
};

export default TextStylePropTypes;
