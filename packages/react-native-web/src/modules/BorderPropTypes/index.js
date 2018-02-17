/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import ColorPropType from '../../exports/ColorPropType';
import { number, oneOf, oneOfType, string } from 'prop-types';

const numberOrString = oneOfType([number, string]);
const BorderStylePropType = oneOf(['solid', 'dotted', 'dashed']);

const BorderPropTypes = {
  borderColor: ColorPropType,
  borderBottomColor: ColorPropType,
  borderEndColor: ColorPropType,
  borderLeftColor: ColorPropType,
  borderRightColor: ColorPropType,
  borderStartColor: ColorPropType,
  borderTopColor: ColorPropType,
  borderRadius: numberOrString,
  borderBottomEndRadius: numberOrString,
  borderBottomLeftRadius: numberOrString,
  borderBottomRightRadius: numberOrString,
  borderBottomStartRadius: numberOrString,
  borderTopEndRadius: numberOrString,
  borderTopLeftRadius: numberOrString,
  borderTopRightRadius: numberOrString,
  borderTopStartRadius: numberOrString,
  borderStyle: BorderStylePropType,
  borderBottomStyle: BorderStylePropType,
  borderEndStyle: BorderStylePropType,
  borderLeftStyle: BorderStylePropType,
  borderRightStyle: BorderStylePropType,
  borderStartStyle: BorderStylePropType,
  borderTopStyle: BorderStylePropType
};

export default BorderPropTypes;
