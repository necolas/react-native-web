/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ViewPropTypes
 * @flow
 */

import EdgeInsetsPropType, { type EdgeInsetsProp } from '../EdgeInsetsPropType';
import StyleSheetPropType from '../../modules/StyleSheetPropType';
import ViewStylePropTypes from './ViewStylePropTypes';
import { any, array, bool, func, oneOf, oneOfType, string } from 'prop-types';

const stylePropType = StyleSheetPropType(ViewStylePropTypes);

export type ViewLayout = {
  x: number,
  y: number,
  width: number,
  height: number
};

export type ViewLayoutEvent = {
  nativeEvent: {
    layout: ViewLayout
  }
};

export type ViewProps = {
  accessibilityComponentType?: string,
  accessibilityLabel?: string,
  accessibilityLiveRegion?: 'none' | 'polite' | 'assertive',
  accessibilityRole?: string,
  accessibilityTraits?: string | Array<string>,
  accessible?: boolean,
  children?: any,
  collapsable?: boolean,
  hitSlop?: EdgeInsetsProp,
  importantForAccessibility?: 'auto' | 'yes' | 'no' | 'no-hide-descendants',
  onAccessibilityTap?: Function,
  onClick?: Function,
  onClickCapture?: Function,
  onLayout?: (event: ViewLayoutEvent) => void,
  onMagicTap?: Function,
  onResponderGrant?: Function,
  onResponderMove?: Function,
  onResponderReject?: Function,
  onResponderRelease?: Function,
  onResponderTerminate?: Function,
  onResponderTerminationRequest?: Function,
  onStartShouldSetResponder?: Function,
  onStartShouldSetResponderCapture?: Function,
  onMoveShouldSetResponder?: Function,
  onMoveShouldSetResponderCapture?: Function,
  onTouchCancel?: Function,
  onTouchCancelCapture?: Function,
  onTouchEnd?: Function,
  onTouchEndCapture?: Function,
  onTouchMove?: Function,
  onTouchMoveCapture?: Function,
  onTouchStart?: Function,
  onTouchStartCapture?: Function,
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto',
  removeClippedSubviews?: boolean,
  style?: stylePropType,
  testID?: string
};

const ViewPropTypes = {
  accessibilityComponentType: string,
  accessibilityLabel: string,
  accessibilityLiveRegion: oneOf(['assertive', 'none', 'polite']),
  accessibilityRole: string,
  accessibilityTraits: oneOfType([array, string]),
  accessible: bool,
  children: any,
  collapsable: bool,
  hitSlop: EdgeInsetsPropType,
  importantForAccessibility: oneOf(['auto', 'no', 'no-hide-descendants', 'yes']),
  onClick: func,
  onClickCapture: func,
  onLayout: func,
  onMoveShouldSetResponder: func,
  onMoveShouldSetResponderCapture: func,
  onResponderGrant: func,
  onResponderMove: func,
  onResponderReject: func,
  onResponderRelease: func,
  onResponderTerminate: func,
  onResponderTerminationRequest: func,
  onStartShouldSetResponder: func,
  onStartShouldSetResponderCapture: func,
  onTouchCancel: func,
  onTouchCancelCapture: func,
  onTouchEnd: func,
  onTouchEndCapture: func,
  onTouchMove: func,
  onTouchMoveCapture: func,
  onTouchStart: func,
  onTouchStartCapture: func,
  pointerEvents: oneOf(['auto', 'box-none', 'box-only', 'none']),
  style: stylePropType,
  testID: string
};

export default ViewPropTypes;
