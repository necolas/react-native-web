/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import EdgeInsetsPropType, { type EdgeInsetsProp } from '../EdgeInsetsPropType';
import StyleSheetPropType from '../../modules/StyleSheetPropType';
import ViewStylePropTypes from './ViewStylePropTypes';
import { any, array, bool, func, object, oneOf, oneOfType, string } from 'prop-types';

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
  hitSlop?: EdgeInsetsProp,
  importantForAccessibility?: 'auto' | 'yes' | 'no' | 'no-hide-descendants',
  nativeID?: string,
  onBlur?: Function,
  onClick?: Function,
  onClickCapture?: Function,
  onContextMenu?: Function,
  onFocus?: Function,
  onLayout?: (event: ViewLayoutEvent) => void,
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
  style?: stylePropType,
  testID?: string,
  // compatibility with React Native
  accessibilityViewIsModal?: boolean,
  collapsable?: boolean,
  needsOffscreenAlphaCompositing?: boolean,
  onAccessibilityTap?: Function,
  onMagicTap?: Function,
  removeClippedSubviews?: boolean,
  renderToHardwareTextureAndroid?: boolean,
  shouldRasterizeIOS?: boolean,
  tvParallaxProperties?: {}
};

const ViewPropTypes = {
  accessibilityComponentType: string,
  accessibilityLabel: string,
  accessibilityLiveRegion: oneOf(['assertive', 'none', 'polite']),
  accessibilityRole: string,
  accessibilityTraits: oneOfType([array, string]),
  accessible: bool,
  children: any,
  hitSlop: EdgeInsetsPropType,
  importantForAccessibility: oneOf(['auto', 'no', 'no-hide-descendants', 'yes']),
  nativeID: string,
  onBlur: func,
  onClick: func,
  onClickCapture: func,
  onContextMenu: func,
  onFocus: func,
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
  testID: string,
  // compatibility with React Native
  accessibilityViewIsModal: bool,
  collapsable: bool,
  needsOffscreenAlphaCompositing: bool,
  onAccessibilityTap: func,
  onMagicTap: func,
  removeClippedSubviews: bool,
  renderToHardwareTextureAndroid: bool,
  shouldRasterizeIOS: bool,
  tvParallaxProperties: object
};

export default ViewPropTypes;
