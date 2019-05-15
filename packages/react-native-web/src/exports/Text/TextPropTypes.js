/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
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
  accessibilityRole: oneOf([
    'button',
    'header',
    'heading',
    'label',
    'link',
    'listitem',
    'none',
    'text'
  ]),
  accessibilityTraits: oneOfType([array, string]),
  accessible: bool,
  children: any,
  importantForAccessibility: oneOf(['auto', 'no', 'no-hide-descendants', 'yes']),
  maxFontSizeMultiplier: number,
  nativeID: string,
  numberOfLines: number,
  onBlur: func,
  onFocus: func,
  onLayout: func,
  onPress: func,
  selectable: bool,
  style: StyleSheetPropType(TextStylePropTypes),
  testID: string,
  // web extensions
  onContextMenu: func,
  itemID: string,
  itemRef: string,
  itemProp: string,
  itemScope: string,
  itemType: string
};

export default TextPropTypes;
