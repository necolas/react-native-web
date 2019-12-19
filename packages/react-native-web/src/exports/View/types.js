/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ColorValue, EdgeInsetsValue, GenericStyleProp, LayoutEvent } from '../../types';

import type {
  AnimationStyles,
  BorderStyles,
  InteractionStyles,
  LayoutStyles,
  ShadowStyles,
  TransformStyles
} from '../../types/styles';

type OverscrollBehaviorValue = 'auto' | 'contain' | 'none';

export type ViewStyle = {
  ...AnimationStyles,
  ...BorderStyles,
  ...InteractionStyles,
  ...LayoutStyles,
  ...ShadowStyles,
  ...TransformStyles,
  backdropFilter?: string,
  backgroundAttachment?: string,
  backgroundBlendMode?: string,
  backgroundClip?: string,
  backgroundColor?: ColorValue,
  backgroundImage?: string,
  backgroundOrigin?: 'border-box' | 'content-box' | 'padding-box',
  backgroundPosition?: string,
  backgroundRepeat?: string,
  backgroundSize?: string,
  boxShadow?: string,
  clip?: string,
  filter?: string,
  opacity?: number,
  outlineColor?: ColorValue,
  outlineOffset?: string | number,
  outlineStyle?: string,
  outlineWidth?: string | number,
  overscrollBehavior?: OverscrollBehaviorValue,
  overscrollBehaviorX?: OverscrollBehaviorValue,
  overscrollBehaviorY?: OverscrollBehaviorValue,
  scrollbarWidth?: 'auto' | 'none' | 'thin',
  scrollSnapAlign?: string,
  scrollSnapType?: string,
  WebkitMaskImage?: string,
  WebkitOverflowScrolling?: 'auto' | 'touch'
};

export type ViewProps = {
  accessibilityLabel?: string,
  accessibilityLiveRegion?: 'none' | 'polite' | 'assertive',
  accessibilityRelationship?: {
    activedescendant?: ?string,
    controls?: ?string,
    describedby?: ?string,
    details?: ?string,
    haspopup?: ?string,
    labelledby?: ?string,
    owns?: ?string
  },
  accessibilityRole?: string,
  accessibilityState?: {
    busy?: ?boolean,
    checked?: ?boolean | 'mixed',
    disabled?: ?boolean,
    expanded?: ?boolean,
    grabbed?: ?boolean,
    hidden?: ?boolean,
    invalid?: ?boolean,
    modal?: ?boolean,
    pressed?: ?boolean,
    readonly?: ?boolean,
    required?: ?boolean,
    selected?: ?boolean
  },
  accessible?: boolean,
  children?: any,
  forwardedRef?: any,
  hitSlop?: EdgeInsetsValue,
  importantForAccessibility?: 'auto' | 'yes' | 'no' | 'no-hide-descendants',
  nativeID?: string,
  onBlur?: (e: any) => void,
  onClick?: (e: any) => void,
  onClickCapture?: (e: any) => void,
  onFocus?: (e: any) => void,
  onLayout?: (e: LayoutEvent) => void,
  onResponderGrant?: (e: any) => void,
  onResponderMove?: (e: any) => void,
  onResponderReject?: (e: any) => void,
  onResponderRelease?: (e: any) => void,
  onResponderTerminate?: (e: any) => void,
  onResponderTerminationRequest?: (e: any) => void,
  onStartShouldSetResponder?: (e: any) => boolean,
  onStartShouldSetResponderCapture?: (e: any) => boolean,
  onMoveShouldSetResponder?: (e: any) => boolean,
  onMoveShouldSetResponderCapture?: (e: any) => boolean,
  onTouchCancel?: (e: any) => void,
  onTouchCancelCapture?: (e: any) => void,
  onTouchEnd?: (e: any) => void,
  onTouchEndCapture?: (e: any) => void,
  onTouchMove?: (e: any) => void,
  onTouchMoveCapture?: (e: any) => void,
  onTouchStart?: (e: any) => void,
  onTouchStartCapture?: (e: any) => void,
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto',
  style?: GenericStyleProp<ViewStyle>,
  testID?: string,
  // web extensions
  onContextMenu?: (e: any) => void,
  itemID?: string,
  itemRef?: string,
  itemProp?: string,
  itemScope?: string,
  itemType?: string
};
