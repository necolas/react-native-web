/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import ColorPropType from '../../propTypes/ColorPropType';
import ViewStylePropTypes from '../View/ViewStylePropTypes';
import { number, oneOf, oneOfType, shape, string } from 'prop-types';

const numberOrString = oneOfType([number, string]);

const ShadowOffsetPropType = shape({ width: number, height: number });
const TextAlignPropType = oneOf(['center', 'inherit', 'justify', 'justify-all', 'left', 'right']);
const WritingDirectionPropType = oneOf(['auto', 'ltr', 'rtl']);

const TextStylePropTypes = {
  ...ViewStylePropTypes,
  color: ColorPropType,
  fontFamily: string,
  fontFeatureSettings: string,
  fontSize: numberOrString,
  fontStyle: string,
  fontWeight: string,
  letterSpacing: numberOrString,
  lineHeight: numberOrString,
  textAlign: TextAlignPropType,
  textAlignVertical: string,
  textDecorationColor: ColorPropType,
  textDecorationLine: string,
  textDecorationStyle: string,
  textShadowColor: ColorPropType,
  textShadowOffset: ShadowOffsetPropType,
  textShadowRadius: number,
  writingDirection: WritingDirectionPropType,
  /* @platform web */
  textIndent: numberOrString,
  textOverflow: string,
  textRendering: oneOf(['auto', 'geometricPrecision', 'optimizeLegibility', 'optimizeSpeed']),
  textTransform: oneOf(['capitalize', 'lowercase', 'none', 'uppercase']),
  unicodeBidi: oneOf([
    'normal',
    'bidi-override',
    'embed',
    'isolate',
    'isolate-override',
    'plaintext'
  ]),
  whiteSpace: string,
  wordWrap: string,
  MozOsxFontSmoothing: string,
  WebkitFontSmoothing: string
};

export default TextStylePropTypes;
