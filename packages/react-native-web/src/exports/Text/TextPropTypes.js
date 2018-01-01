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

import StyleSheetPropType from '../../modules/StyleSheetPropType';
import TextStylePropTypes from './TextStylePropTypes';
import { any, array, bool, func, number, oneOf, oneOfType, string } from 'prop-types';

const TextPropTypes = {
  accessibilityComponentType: string,
  accessibilityLabel: string,
  accessibilityLiveRegion: oneOf(['assertive', 'none', 'polite']),
  accessibilityRole: oneOf(['button', 'heading', 'label', 'link', 'listitem']),
  accessibilityTraits: oneOfType([array, string]),
  accessible: bool,
  children: any,
  importantForAccessibility: oneOf(['auto', 'no', 'no-hide-descendants', 'yes']),
  numberOfLines: number,
  onLayout: func,
  onPress: func,
  selectable: bool,
  style: StyleSheetPropType(TextStylePropTypes),
  testID: string
};

export default TextPropTypes;
