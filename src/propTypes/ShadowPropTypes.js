/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import ColorPropType from './ColorPropType';
import { number, oneOfType, shape, string } from 'prop-types';
const numberOrString = oneOfType([number, string]);

const ShadowPropTypes = {
  shadowColor: ColorPropType,
  shadowOffset: shape({
    width: numberOrString,
    height: numberOrString
  }),
  shadowOpacity: number,
  shadowRadius: numberOrString,
  shadowSpread: numberOrString
};

export default ShadowPropTypes;
