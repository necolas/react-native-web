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
import AccessibilityPropType, {
  type AccessibilityComponentType,
  type AccessibilityTrait,
  type AccessibilityRole,
  type AccessibilityState
} from './ViewAccessibility';

import PropTypes from 'prop-types';

const stylePropType = StyleSheetPropType(ViewStylePropTypes);

export type Layout = $ReadOnly<{|
  x: number,
  y: number,
  width: number,
  height: number
|}>;

export type LayoutEvent = SyntheticEvent<
  $ReadOnly<{|
    layout: Layout
  |}>
>;

export type ViewLayout = Layout;
export type ViewLayoutEvent = LayoutEvent;

type DirectEventProps = $ReadOnly<{|
  onAccessibilityAction?: Function,
  onAccessibilityTap?: Function,
  onLayout?: ?(event: LayoutEvent) => void,
  onMagicTap?: Function
|}>;

type TouchEventProps = $ReadOnly<{|
  onTouchCancel?: ?Function,
  onTouchCancelCapture?: ?Function,
  onTouchEnd?: ?Function,
  onTouchEndCapture?: ?Function,
  onTouchMove?: ?Function,
  onTouchMoveCapture?: ?Function,
  onTouchStart?: ?Function,
  onTouchStartCapture?: ?Function
|}>;

type GestureResponderEventProps = $ReadOnly<{|
  onMoveShouldSetResponder?: ?Function,
  onMoveShouldSetResponderCapture?: ?Function,
  onResponderGrant?: ?Function,
  onResponderMove?: ?Function,
  onResponderReject?: ?Function,
  onResponderRelease?: ?Function,
  onResponderStart?: ?Function,
  onResponderTerminate?: ?Function,
  onResponderTerminationRequest?: ?Function,
  onStartShouldSetResponder?: ?Function,
  onStartShouldSetResponderCapture?: ?Function
|}>;

export type ViewProps = $ReadOnly<{|
  ...DirectEventProps,
  ...TouchEventProps,
  ...GestureResponderEventProps,

  accessible?: boolean,
  accessibilityLabel?: null | string | Array<any> | any,
  accessibilityHint?: string,
  accessibilityActions?: Array<string>,
  accessibilityComponentType?: AccessibilityComponentType,
  accessibilityLiveRegion?: 'none' | 'polite' | 'assertive',
  importantForAccessibility?: 'auto' | 'yes' | 'no' | 'no-hide-descendants',
  accessibilityIgnoresInvertColors?: boolean,
  accessibilityTraits?: AccessibilityTrait | Array<AccessibilityTrait>,
  accessibilityRole?: AccessibilityRole,
  accessibilityStates?: Array<AccessibilityState>,
  accessibilityViewIsModal?: boolean,
  accessibilityElementsHidden?: boolean,
  children?: any,
  testID?: ?string,
  nativeID?: string,
  hitSlop?: ?EdgeInsetsProp,
  pointerEvents?: null | 'box-none' | 'none' | 'box-only' | 'auto',
  style?: stylePropType,
  removeClippedSubviews?: boolean,
  renderToHardwareTextureAndroid?: boolean,
  shouldRasterizeIOS?: boolean,
  collapsable?: boolean,
  needsOffscreenAlphaCompositing?: boolean,
  onBlur?: Function,
  onClick?: Function,
  onClickCapture?: Function,
  onContextMenu?: Function,
  onFocus?: Function
|}>;

const ViewPropTypes = {
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onClickCapture: PropTypes.func,
  onContextMenu: PropTypes.func,
  onFocus: PropTypes.func,

  accessible: PropTypes.bool,
  accessibilityLabel: PropTypes.node,
  accessibilityHint: PropTypes.string,
  accessibilityActions: PropTypes.arrayOf(PropTypes.string),
  accessibilityIgnoresInvertColors: PropTypes.bool,
  accessibilityComponentType: PropTypes.oneOf(AccessibilityPropType.AccessibilityComponentTypes),
  accessibilityRole: PropTypes.oneOf(AccessibilityPropType.AccessibilityRoles),
  accessibilityStates: PropTypes.arrayOf(
    PropTypes.oneOf(AccessibilityPropType.AccessibilityStates)
  ),
  accessibilityLiveRegion: PropTypes.oneOf(['none', 'polite', 'assertive']),
  importantForAccessibility: PropTypes.oneOf(['auto', 'yes', 'no', 'no-hide-descendants']),
  accessibilityTraits: PropTypes.oneOfType([
    PropTypes.oneOf(AccessibilityPropType.AccessibilityTraits),
    PropTypes.arrayOf(PropTypes.oneOf(AccessibilityPropType.AccessibilityTraits))
  ]),
  accessibilityViewIsModal: PropTypes.bool,
  accessibilityElementsHidden: PropTypes.bool,
  onAccessibilityAction: PropTypes.func,
  onAccessibilityTap: PropTypes.func,
  onMagicTap: PropTypes.func,
  testID: PropTypes.string,
  nativeID: PropTypes.string,
  onResponderGrant: PropTypes.func,
  onResponderMove: PropTypes.func,
  onResponderReject: PropTypes.func,
  onResponderRelease: PropTypes.func,
  onResponderTerminate: PropTypes.func,
  onResponderTerminationRequest: PropTypes.func,
  onStartShouldSetResponder: PropTypes.func,
  onStartShouldSetResponderCapture: PropTypes.func,
  onMoveShouldSetResponder: PropTypes.func,
  onMoveShouldSetResponderCapture: PropTypes.func,
  hitSlop: EdgeInsetsPropType,
  onLayout: PropTypes.func,
  pointerEvents: PropTypes.oneOf(['box-none', 'none', 'box-only', 'auto']),
  style: stylePropType,
  removeClippedSubviews: PropTypes.bool,
  renderToHardwareTextureAndroid: PropTypes.bool,
  shouldRasterizeIOS: PropTypes.bool,
  collapsable: PropTypes.bool,
  needsOffscreenAlphaCompositing: PropTypes.bool
};

export default ViewPropTypes;
