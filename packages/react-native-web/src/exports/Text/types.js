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
  selectable?: boolean,
  style?: GenericStyleProp<TextStyle>,
  testID?: string,
  // web extensions
  onContextMenu?: (e: any) => void,
  itemID?: string,
  itemRef?: string,
  itemProp?: string,
  itemScope?: string,
  itemType?: string
};
