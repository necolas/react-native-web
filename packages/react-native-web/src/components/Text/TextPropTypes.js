/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule TextPropTypes
 * @flow
 */

import BaseComponentPropTypes from '../../propTypes/BaseComponentPropTypes';
import StyleSheetPropType from '../../propTypes/StyleSheetPropType';
import TextStylePropTypes from './TextStylePropTypes';
import { any, bool, func, number, oneOf } from 'prop-types';

const TextPropTypes = {
  ...BaseComponentPropTypes,
  accessibilityRole: oneOf(['button', 'heading', 'label', 'link', 'listitem']),
  children: any,
  numberOfLines: number,
  onLayout: func,
  onPress: func,
  selectable: bool,
  style: StyleSheetPropType(TextStylePropTypes)
};

export default TextPropTypes;
