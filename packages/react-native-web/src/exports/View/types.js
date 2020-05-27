/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ColorValue, GenericStyleProp, LayoutEvent } from '../../types';

import type {
  AnimationStyles,
  BorderStyles,
  InteractionStyles,
  LayoutStyles,
  ShadowStyles,
  TransformStyles
} from '../../types/styles';

type NumberOrString = number | string;

type OverscrollBehaviorValue = 'auto' | 'contain' | 'none';

export type ViewStyle = {
  ...AnimationStyles,
  ...BorderStyles,
  ...InteractionStyles,
  ...LayoutStyles,
  ...ShadowStyles,
  ...TransformStyles,
  backdropFilter?: ?string,
  backgroundAttachment?: ?string,
  backgroundBlendMode?: ?string,
  backgroundClip?: ?string,
  backgroundColor?: ?ColorValue,
  backgroundImage?: ?string,
  backgroundOrigin?: 'border-box' | 'content-box' | 'padding-box',
  backgroundPosition?: ?string,
  backgroundRepeat?: ?string,
  backgroundSize?: ?string,
  boxShadow?: ?string,
  clip?: ?string,
  filter?: ?string,
  opacity?: ?number,
  outlineColor?: ?ColorValue,
  outlineOffset?: ?NumberOrString,
  outlineStyle?: ?string,
  outlineWidth?: ?NumberOrString,
  overscrollBehavior?: ?OverscrollBehaviorValue,
  overscrollBehaviorX?: ?OverscrollBehaviorValue,
  overscrollBehaviorY?: ?OverscrollBehaviorValue,
  scrollbarWidth?: 'auto' | 'none' | 'thin',
  scrollSnapAlign?: ?string,
  scrollSnapType?: ?string,
  WebkitMaskImage?: ?string,
  WebkitOverflowScrolling?: 'auto' | 'touch'
};

export type ViewProps = {
  accessibilityLabel?: ?string,
  accessibilityLiveRegion?: 'none' | 'polite' | 'assertive',
  accessibilityRole?: ?string,
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
  accessibilityValue?: {
    max?: ?number,
    min?: ?number,
    now?: ?number,
    text?: ?string
  },
  accessible?: boolean,
  children?: ?any,
  importantForAccessibility?: 'auto' | 'yes' | 'no' | 'no-hide-descendants',
  nativeID?: ?string,
  onBlur?: (e: any) => void,
  onClick?: (e: any) => void,
  onClickCapture?: (e: any) => void,
  onContextMenu?: (e: any) => void,
  onFocus?: (e: any) => void,
  onKeyDown?: (e: any) => void,
  onKeyUp?: (e: any) => void,
  onLayout?: (e: LayoutEvent) => void,
  onMoveShouldSetResponder?: (e: any) => boolean,
  onMoveShouldSetResponderCapture?: (e: any) => boolean,
  onResponderEnd?: (e: any) => void,
  onResponderGrant?: (e: any) => void,
  onResponderMove?: (e: any) => void,
  onResponderReject?: (e: any) => void,
  onResponderRelease?: (e: any) => void,
  onResponderStart?: (e: any) => void,
  onResponderTerminate?: (e: any) => void,
  onResponderTerminationRequest?: (e: any) => boolean,
  onScrollShouldSetResponder?: (e: any) => boolean,
  onScrollShouldSetResponderCapture?: (e: any) => boolean,
  onSelectionChangeShouldSetResponder?: (e: any) => boolean,
  onSelectionChangeShouldSetResponderCapture?: (e: any) => boolean,
  onStartShouldSetResponder?: (e: any) => boolean,
  onStartShouldSetResponderCapture?: (e: any) => boolean,
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto',
  style?: GenericStyleProp<ViewStyle>,
  testID?: ?string,
  // unstable
  dataSet?: ?Object,
  onMouseDown?: (e: any) => void,
  onMouseEnter?: (e: any) => void,
  onMouseLeave?: (e: any) => void,
  onMouseMove?: (e: any) => void,
  onMouseOver?: (e: any) => void,
  onMouseOut?: (e: any) => void,
  onMouseUp?: (e: any) => void,
  onScroll?: (e: any) => void,
  onTouchCancel?: (e: any) => void,
  onTouchCancelCapture?: (e: any) => void,
  onTouchEnd?: (e: any) => void,
  onTouchEndCapture?: (e: any) => void,
  onTouchMove?: (e: any) => void,
  onTouchMoveCapture?: (e: any) => void,
  onTouchStart?: (e: any) => void,
  onTouchStartCapture?: (e: any) => void,
  onWheel?: (e: any) => void,
  href?: ?string,
  rel?: ?string,
  target?: ?string
};
