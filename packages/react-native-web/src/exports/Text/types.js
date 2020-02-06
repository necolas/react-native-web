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
import type { ViewStyle } from '../View/types';

type FontWeightValue =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export type TextStyle = {
  ...ViewStyle,
  color?: ColorValue,
  fontFamily?: string,
  fontFeatureSettings?: string,
  fontSize?: number | string,
  fontStyle?: 'italic' | 'normal',
  fontWeight?: FontWeightValue,
  fontVariant?: $ReadOnlyArray<
    'small-caps' | 'oldstyle-nums' | 'lining-nums' | 'tabular-nums' | 'proportional-nums'
  >,
  letterSpacing?: number | string,
  lineHeight?: number | string,
  textAlign?: 'center' | 'end' | 'inherit' | 'justify' | 'justify-all' | 'left' | 'right' | 'start',
  textAlignVertical?: string,
  textDecorationColor?: ColorValue,
  textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through',
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed',
  textIndent?: number | string,
  textOverflow?: string,
  textRendering?: 'auto' | 'geometricPrecision' | 'optimizeLegibility' | 'optimizeSpeed',
  textShadowColor?: ColorValue,
  textShadowOffset?: {| width?: number, height?: number |},
  textShadowRadius?: number,
  textTransform?: 'capitalize' | 'lowercase' | 'none' | 'uppercase',
  unicodeBidi?: 'normal' | 'bidi-override' | 'embed' | 'isolate' | 'isolate-override' | 'plaintext',
  whiteSpace?: string,
  wordBreak?: 'normal' | 'break-all' | 'break-word' | 'keep-all',
  wordWrap?: string,
  writingDirection?: 'auto' | 'ltr' | 'rtl',
  /* @platform web */
  MozOsxFontSmoothing?: string,
  WebkitFontSmoothing?: string
};

export type TextProps = {
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
  accessibilityRole?:
    | 'button'
    | 'header'
    | 'heading'
    | 'label'
    | 'link'
    | 'listitem'
    | 'none'
    | 'text',
  accessibilityState?: {
    busy?: ?boolean,
    checked?: ?boolean | 'mixed',
    disabled?: ?boolean,
    expanded?: ?boolean,
    grabbed?: ?boolean,
    hidden?: ?boolean,
    invalid?: ?boolean,
    pressed?: ?boolean,
    readonly?: ?boolean,
    required?: ?boolean,
    selected?: ?boolean
  },
  accessible?: boolean,
  children?: any,
  dir?: 'auto' | 'ltr' | 'rtl',
  forwardedRef?: any,
  importantForAccessibility?: 'auto' | 'yes' | 'no' | 'no-hide-descendants',
  nativeID?: string,
  numberOfLines?: number,
  onBlur?: (e: any) => void,
  onFocus?: (e: any) => void,
  onLayout?: (e: LayoutEvent) => void,
  onPress?: (e: any) => void,
  onMoveShouldSetResponder?: (e: any) => boolean,
  onMoveShouldSetResponderCapture?: (e: any) => boolean,
  onResponderEnd?: (e: any) => void,
  onResponderGrant?: (e: any) => void,
  onResponderMove?: (e: any) => void,
  onResponderReject?: (e: any) => void,
  onResponderRelease?: (e: any) => void,
  onResponderStart?: (e: any) => void,
  onResponderTerminate?: (e: any) => void,
  onResponderTerminationRequest?: (e: any) => void,
  onScrollShouldSetResponder?: (e: any) => boolean,
  onScrollShouldSetResponderCapture?: (e: any) => boolean,
  onSelectionChangeShouldSetResponder?: (e: any) => boolean,
  onSelectionChangeShouldSetResponderCapture?: (e: any) => boolean,
  onStartShouldSetResponder?: (e: any) => boolean,
  onStartShouldSetResponderCapture?: (e: any) => boolean,
  selectable?: boolean,
  style?: GenericStyleProp<TextStyle>,
  testID?: string,
  // unstable
  onContextMenu?: (e: any) => void,
  onKeyDown?: (e: any) => void,
  onKeyPress?: (e: any) => void,
  onKeyUp?: (e: any) => void,
  onMouseDown?: (e: any) => void,
  onMouseEnter?: (e: any) => void,
  onMouseLeave?: (e: any) => void,
  onMouseMove?: (e: any) => void,
  onMouseOver?: (e: any) => void,
  onMouseOut?: (e: any) => void,
  onMouseUp?: (e: any) => void,
  onTouchCancel?: (e: any) => void,
  onTouchCancelCapture?: (e: any) => void,
  onTouchEnd?: (e: any) => void,
  onTouchEndCapture?: (e: any) => void,
  onTouchMove?: (e: any) => void,
  onTouchMoveCapture?: (e: any) => void,
  onTouchStart?: (e: any) => void,
  onTouchStartCapture?: (e: any) => void,
  href?: string,
  itemID?: string,
  itemRef?: string,
  itemProp?: string,
  itemScope?: string,
  itemType?: string,
  rel?: string,
  target?: string,
  unstable_ariaSet?: Object,
  unstable_dataSet?: Object
};
