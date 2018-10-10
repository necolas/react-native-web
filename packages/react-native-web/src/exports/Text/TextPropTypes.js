/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
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
  nativeID: string,
  numberOfLines: number,
  onBlur: func,
  onContextMenu: func,
  onFocus: func,
  onLayout: func,
  onPress: func,
  selectable: bool,
  style: StyleSheetPropType(TextStylePropTypes),
  testID: string
};

export default TextPropTypes;
