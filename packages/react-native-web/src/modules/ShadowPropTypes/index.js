/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import ColorPropType from '../../exports/ColorPropType';
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
