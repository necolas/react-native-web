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

import BaseComponentPropTypes from '../../propTypes/BaseComponentPropTypes';
import EdgeInsetsPropType, { type EdgeInsetsProp } from '../../propTypes/EdgeInsetsPropType';
import StyleSheetPropType from '../../propTypes/StyleSheetPropType';
import ViewStylePropTypes from './ViewStylePropTypes';
import { any, bool, func, oneOf } from 'prop-types';

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
  accessible?: bool,
  children?: any,
  collapsable?: bool,
  hitSlop?: EdgeInsetsProp,
  importantForAccessibility?: 'auto'| 'yes'| 'no'| 'no-hide-descendants',
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
  pointerEvents?: 'box-none'| 'none'| 'box-only'| 'auto',
  removeClippedSubviews?: boolean,
  style?: stylePropType,
  testID?: string,
}

const ViewPropTypes = {
  ...BaseComponentPropTypes,
  children: any,
  collapsable: bool,
  hitSlop: EdgeInsetsPropType,
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
  style: stylePropType
};

export default ViewPropTypes;
