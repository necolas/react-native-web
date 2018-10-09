/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import ColorPropType from '../ColorPropType';
import TextStylePropTypes from '../Text/TextStylePropTypes';
import { oneOf } from 'prop-types';

const TextInputStylePropTypes = {
  ...TextStylePropTypes,
  /* @platform web */
  caretColor: ColorPropType,
  resize: oneOf(['none', 'vertical', 'horizontal', 'both'])
};

export default TextInputStylePropTypes;
