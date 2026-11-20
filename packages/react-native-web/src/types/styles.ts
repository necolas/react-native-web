/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { StyleValue } from '../exports/StyleSheet/compiler/normalizeValueWithProperty';
import type { ColorValue, DimensionValue, Nullable } from './index';

type NumberOrString = number | string;

/**
 * Animations and transitions
 */

type AnimationDirection =
  'alternate' | 'alternate-reverse' | 'normal' | 'reverse';
type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';
type AnimationIterationCount = number | 'infinite';
type AnimationKeyframes =
  string | Readonly<Record<string, Readonly<Record<string, StyleValue>>>>;
type AnimationPlayState = 'paused' | 'running';

export type AnimationStyles = {
  animationDelay?: Nullable<string | Array<string>>;
  animationDirection?: Nullable<AnimationDirection | Array<AnimationDirection>>;
  animationDuration?: Nullable<string | Array<string>>;
  animationFillMode?: Nullable<AnimationFillMode | Array<AnimationFillMode>>;
  animationIterationCount?: Nullable<
    AnimationIterationCount | Array<AnimationIterationCount>
  >;
  animationKeyframes?: Nullable<
    AnimationKeyframes | ReadonlyArray<AnimationKeyframes>
  >;
  animationPlayState?: Nullable<AnimationPlayState | Array<AnimationPlayState>>;
  animationTimingFunction?: Nullable<string | Array<string>>;
  transitionDelay?: Nullable<string | Array<string>>;
  transitionDuration?: Nullable<string | Array<string>>;
  transitionProperty?: Nullable<string | Array<string>>;
  transitionTimingFunction?: Nullable<string | Array<string>>;
};

/**
 * Border
 */

type BorderRadiusValue = number | string;
type BorderStyleValue = 'solid' | 'dotted' | 'dashed';

export type BorderStyles = {
  // color
  borderColor?: Nullable<ColorValue>;
  borderBlockColor?: Nullable<ColorValue>;
  borderBlockEndColor?: Nullable<ColorValue>;
  borderBlockStartColor?: Nullable<ColorValue>;
  borderBottomColor?: Nullable<ColorValue>;
  borderInlineColor?: Nullable<ColorValue>;
  borderInlineEndColor?: Nullable<ColorValue>;
  borderInlineStartColor?: Nullable<ColorValue>;
  borderLeftColor?: Nullable<ColorValue>;
  borderRightColor?: Nullable<ColorValue>;
  borderTopColor?: Nullable<ColorValue>;
  // radius
  borderRadius?: Nullable<BorderRadiusValue>;
  borderEndEndRadius?: Nullable<BorderRadiusValue>;
  borderEndStartRadius?: Nullable<BorderRadiusValue>;
  borderStartEndRadius?: Nullable<BorderRadiusValue>;
  borderStartStartRadius?: Nullable<BorderRadiusValue>;
  borderBottomLeftRadius?: Nullable<BorderRadiusValue>;
  borderBottomRightRadius?: Nullable<BorderRadiusValue>;
  borderTopLeftRadius?: Nullable<BorderRadiusValue>;
  borderTopRightRadius?: Nullable<BorderRadiusValue>;
  // style
  borderStyle?: Nullable<BorderStyleValue>;
  borderBlockStyle?: Nullable<BorderStyleValue>;
  borderBlockEndStyle?: Nullable<BorderStyleValue>;
  borderBlockStartStyle?: Nullable<BorderStyleValue>;
  borderBottomStyle?: Nullable<BorderStyleValue>;
  borderInlineStyle?: Nullable<BorderStyleValue>;
  borderInlineEndStyle?: Nullable<BorderStyleValue>;
  borderInlineStartStyle?: Nullable<BorderStyleValue>;
  borderLeftStyle?: Nullable<BorderStyleValue>;
  borderRightStyle?: Nullable<BorderStyleValue>;
  borderTopStyle?: Nullable<BorderStyleValue>;
  // deprecated
  borderEndColor?: Nullable<ColorValue>;
  borderStartColor?: Nullable<ColorValue>;
  borderEndStyle?: Nullable<BorderStyleValue>;
  borderStartStyle?: Nullable<BorderStyleValue>;
  borderBottomEndRadius?: Nullable<BorderRadiusValue>;
  borderBottomStartRadius?: Nullable<BorderRadiusValue>;
  borderTopEndRadius?: Nullable<BorderRadiusValue>;
  borderTopStartRadius?: Nullable<BorderRadiusValue>;
};

/**
 * Interactions
 */

type CursorValue =
  | 'alias'
  | 'all-scroll'
  | 'auto'
  | 'cell'
  | 'context-menu'
  | 'copy'
  | 'crosshair'
  | 'default'
  | 'grab'
  | 'grabbing'
  | 'help'
  | 'pointer'
  | 'progress'
  | 'wait'
  | 'text'
  | 'vertical-text'
  | 'move'
  | 'none'
  | 'no-drop'
  | 'not-allowed'
  | 'zoom-in'
  | 'zoom-out'
  // resize
  | 'col-resize'
  | 'e-resize'
  | 'ew-resize'
  | 'n-resize'
  | 'ne-resize'
  | 'ns-resize'
  | 'nw-resize'
  | 'row-resize'
  | 's-resize'
  | 'se-resize'
  | 'sw-resize'
  | 'w-resize'
  | 'nesw-resize'
  | 'nwse-resize';

type TouchActionValue =
  | 'auto'
  | 'inherit'
  | 'manipulation'
  | 'none'
  | 'pan-down'
  | 'pan-left'
  | 'pan-right'
  | 'pan-up'
  | 'pan-x'
  | 'pan-y'
  | 'pinch-zoom';

type UserSelect = 'all' | 'auto' | 'contain' | 'none' | 'text';

export type InteractionStyles = {
  // https://developer.mozilla.org/en-US/docs/Web/CSS/cursor#Formal_syntax
  cursor?: Nullable<CursorValue>;
  // https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action#Formal_syntax
  touchAction?: Nullable<TouchActionValue>;
  // https://developer.mozilla.org/en-US/docs/Web/CSS/user-select#Formal_syntax_2
  userSelect?: Nullable<UserSelect>;
  willChange?: Nullable<string>;
};

/**
 * Layout
 */

type OverflowValue = 'auto' | 'hidden' | 'scroll' | 'visible';
type VisiblilityValue = 'hidden' | 'visible';

export type LayoutStyles = {
  alignContent?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'stretch';
  alignItems?: Nullable<
    'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch'
  >;
  alignSelf?: Nullable<
    'auto' | 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch'
  >;
  aspectRatio?: Nullable<NumberOrString>;
  backfaceVisibility?: Nullable<VisiblilityValue>;
  borderWidth?: Nullable<DimensionValue>;
  borderBlockWidth?: Nullable<DimensionValue>;
  borderBlockEndWidth?: Nullable<DimensionValue>;
  borderBlockStartWidth?: Nullable<DimensionValue>;
  borderBottomWidth?: Nullable<DimensionValue>;
  borderInlineWidth?: Nullable<DimensionValue>;
  borderInlineEndWidth?: Nullable<DimensionValue>;
  borderInlineStartWidth?: Nullable<DimensionValue>;
  borderLeftWidth?: Nullable<DimensionValue>;
  borderRightWidth?: Nullable<DimensionValue>;
  borderTopWidth?: Nullable<DimensionValue>;
  bottom?: Nullable<DimensionValue>;
  boxSizing?: Nullable<'border-box' | 'content-box' | 'padding-box'>;
  columnGap?: Nullable<DimensionValue>;
  direction?: Nullable<'inherit' | 'ltr' | 'rtl'>;
  display?: Nullable<string>;
  flex?: Nullable<number>;
  flexBasis?: Nullable<DimensionValue>;
  flexDirection?: Nullable<'column' | 'column-reverse' | 'row' | 'row-reverse'>;
  flexGrow?: Nullable<number>;
  flexShrink?: Nullable<number>;
  flexWrap?: Nullable<'nowrap' | 'wrap' | 'wrap-reverse'>;
  gap?: Nullable<DimensionValue>;
  height?: Nullable<DimensionValue>;
  inset?: Nullable<DimensionValue>;
  insetBlock?: Nullable<DimensionValue>;
  insetBlockEnd?: Nullable<DimensionValue>;
  insetBlockStart?: Nullable<DimensionValue>;
  insetInline?: Nullable<DimensionValue>;
  insetInlineEnd?: Nullable<DimensionValue>;
  insetInlineStart?: Nullable<DimensionValue>;
  justifyContent?: Nullable<
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
  >;
  left?: Nullable<DimensionValue>;
  margin?: Nullable<DimensionValue>;
  marginBlock?: Nullable<DimensionValue>;
  marginBlockEnd?: Nullable<DimensionValue>;
  marginBlockStart?: Nullable<DimensionValue>;
  marginBottom?: Nullable<DimensionValue>;
  marginInline?: Nullable<DimensionValue>;
  marginInlineEnd?: Nullable<DimensionValue>;
  marginInlineStart?: Nullable<DimensionValue>;
  marginLeft?: Nullable<DimensionValue>;
  marginRight?: Nullable<DimensionValue>;
  marginTop?: Nullable<DimensionValue>;
  maxHeight?: Nullable<DimensionValue>;
  maxWidth?: Nullable<DimensionValue>;
  minHeight?: Nullable<DimensionValue>;
  minWidth?: Nullable<DimensionValue>;
  order?: Nullable<number>;
  overflow?: Nullable<OverflowValue>;
  overflowX?: Nullable<OverflowValue>;
  overflowY?: Nullable<OverflowValue>;
  padding?: Nullable<DimensionValue>;
  paddingBlock?: Nullable<DimensionValue>;
  paddingBlockEnd?: Nullable<DimensionValue>;
  paddingBlockStart?: Nullable<DimensionValue>;
  paddingBottom?: Nullable<DimensionValue>;
  paddingInline?: Nullable<DimensionValue>;
  paddingInlineEnd?: Nullable<DimensionValue>;
  paddingInlineStart?: Nullable<DimensionValue>;
  paddingLeft?: Nullable<DimensionValue>;
  paddingRight?: Nullable<DimensionValue>;
  paddingTop?: Nullable<DimensionValue>;
  position?: Nullable<'absolute' | 'fixed' | 'relative' | 'static' | 'sticky'>;
  right?: Nullable<DimensionValue>;
  rowGap?: Nullable<DimensionValue>;
  top?: Nullable<DimensionValue>;
  visibility?: Nullable<VisiblilityValue>;
  width?: Nullable<DimensionValue>;
  zIndex?: Nullable<number>;
  /**
   * @platform web
   */
  gridAutoColumns?: Nullable<string>;
  gridAutoFlow?: Nullable<string>;
  gridAutoRows?: Nullable<string>;
  gridColumnEnd?: Nullable<string>;
  gridColumnGap?: Nullable<string>;
  gridColumnStart?: Nullable<string>;
  gridRowEnd?: Nullable<string>;
  gridRowGap?: Nullable<string>;
  gridRowStart?: Nullable<string>;
  gridTemplateColumns?: Nullable<string>;
  gridTemplateRows?: Nullable<string>;
  gridTemplateAreas?: Nullable<string>;
  /**
   * @deprecated
   */
  borderEndWidth?: Nullable<DimensionValue>;
  borderStartWidth?: Nullable<DimensionValue>;
  end?: Nullable<DimensionValue>;
  marginHorizontal?: Nullable<DimensionValue>;
  marginEnd?: Nullable<DimensionValue>;
  marginStart?: Nullable<DimensionValue>;
  marginVertical?: Nullable<DimensionValue>;
  paddingHorizontal?: Nullable<DimensionValue>;
  paddingStart?: Nullable<DimensionValue>;
  paddingEnd?: Nullable<DimensionValue>;
  paddingVertical?: Nullable<DimensionValue>;
  start?: Nullable<DimensionValue>;
};

/**
 * Shadows
 */

export type ShadowStyles = {
  // @deprecated
  shadowColor?: Nullable<ColorValue>;
  shadowOffset?: Nullable<{
    width?: DimensionValue;
    height?: DimensionValue;
  }>;
  shadowOpacity?: Nullable<number>;
  shadowRadius?: Nullable<DimensionValue>;
};

/**
 * Transforms
 */

export type TransformStyles = {
  perspective?: Nullable<NumberOrString>;
  perspectiveOrigin?: Nullable<string>;
  transform?: Nullable<
    | string
    | Array<
        | { readonly perspective: NumberOrString }
        | { readonly rotate: string }
        | { readonly rotateX: string }
        | { readonly rotateY: string }
        | { readonly rotateZ: string }
        | { readonly scale: number }
        | { readonly scaleX: number }
        | { readonly scaleY: number }
        | { readonly scaleZ: number }
        | { readonly scale3d: string }
        | { readonly skewX: string }
        | { readonly skewY: string }
        | { readonly translateX: NumberOrString }
        | { readonly translateY: NumberOrString }
        | { readonly translateZ: NumberOrString }
        | { readonly translate3d: string }
      >
  >;
  transformOrigin?: Nullable<string | Array<NumberOrString>>;
  transformStyle?: Nullable<'flat' | 'preserve-3d'>;
};
