/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ColorValue, DimensionValue } from './index';

type NumberOrString = number | string;

/**
 * Animations and transitions
 */

type AnimationDirection = 'alternate' | 'alternate-reverse' | 'normal' | 'reverse';
type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';
type AnimationIterationCount = number | 'infinite';
type AnimationKeyframes = string | Object;
type AnimationPlayState = 'paused' | 'running';

export type AnimationStyles = {|
  animationDelay?: string | Array<string>,
  animationDirection?: AnimationDirection | Array<AnimationDirection>,
  animationDuration?: string | Array<string>,
  animationFillMode?: AnimationFillMode | Array<AnimationFillMode>,
  animationIterationCount?: AnimationIterationCount | Array<AnimationIterationCount>,
  animationKeyframes?: AnimationKeyframes | Array<AnimationKeyframes>,
  animationPlayState?: AnimationPlayState | Array<AnimationPlayState>,
  animationTimingFunction?: string | Array<string>,
  transitionDelay?: string | Array<string>,
  transitionDuration?: string | Array<string>,
  transitionProperty?: string | Array<string>,
  transitionTimingFunction?: string | Array<string>
|};

/**
 * Border
 */

type BorderRadiusValue = number | string;
type BorderStyleValue = 'solid' | 'dotted' | 'dashed';

export type BorderStyles = {|
  borderColor?: ColorValue,
  borderBottomColor?: ColorValue,
  borderEndColor?: ColorValue,
  borderLeftColor?: ColorValue,
  borderRightColor?: ColorValue,
  borderStartColor?: ColorValue,
  borderTopColor?: ColorValue,
  borderRadius?: BorderRadiusValue,
  borderBottomEndRadius?: BorderRadiusValue,
  borderBottomLeftRadius?: BorderRadiusValue,
  borderBottomRightRadius?: BorderRadiusValue,
  borderBottomStartRadius?: BorderRadiusValue,
  borderTopEndRadius?: BorderRadiusValue,
  borderTopLeftRadius?: BorderRadiusValue,
  borderTopRightRadius?: BorderRadiusValue,
  borderTopStartRadius?: BorderRadiusValue,
  borderStyle?: BorderStyleValue,
  borderBottomStyle?: BorderStyleValue,
  borderEndStyle?: BorderStyleValue,
  borderLeftStyle?: BorderStyleValue,
  borderRightStyle?: BorderStyleValue,
  borderStartStyle?: BorderStyleValue,
  borderTopStyle?: BorderStyleValue
|};

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

export type InteractionStyles = {|
  // https://developer.mozilla.org/en-US/docs/Web/CSS/cursor#Formal_syntax
  cursor?: CursorValue,
  // https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action#Formal_syntax
  touchAction?: TouchActionValue,
  // https://developer.mozilla.org/en-US/docs/Web/CSS/user-select#Formal_syntax_2
  userSelect?: UserSelect,
  willChange?: string
|};

/**
 * Layout
 */

type OverflowValue = 'auto' | 'hidden' | 'scroll' | 'visible';
type VisiblilityValue = 'hidden' | 'visible';

export type LayoutStyles = {|
  alignContent?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'stretch',
  alignItems?: 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch',
  alignSelf?: 'auto' | 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch',
  backfaceVisibility?: VisiblilityValue,
  borderWidth?: DimensionValue,
  borderBottomWidth?: DimensionValue,
  borderEndWidth?: DimensionValue,
  borderLeftWidth?: DimensionValue,
  borderRightWidth?: DimensionValue,
  borderStartWidth?: DimensionValue,
  borderTopWidth?: DimensionValue,
  bottom?: DimensionValue,
  boxSizing?: 'border-box' | 'content-box' | 'padding-box',
  direction?: 'inherit' | 'ltr' | 'rtl',
  display?: string,
  end?: DimensionValue,
  flex?: number,
  flexBasis?: DimensionValue,
  flexDirection?: 'column' | 'column-reverse' | 'row' | 'row-reverse',
  flexGrow?: number,
  flexShrink?: number,
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse',
  height?: DimensionValue,
  justifyContent?:
    | 'center'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
    | 'space-evenly',
  left?: DimensionValue,
  margin?: DimensionValue,
  marginBottom?: DimensionValue,
  marginHorizontal?: DimensionValue,
  marginEnd?: DimensionValue,
  marginLeft?: DimensionValue,
  marginRight?: DimensionValue,
  marginStart?: DimensionValue,
  marginTop?: DimensionValue,
  marginVertical?: DimensionValue,
  maxHeight?: DimensionValue,
  maxWidth?: DimensionValue,
  minHeight?: DimensionValue,
  minWidth?: DimensionValue,
  order?: number,
  overflow?: OverflowValue,
  overflowX?: OverflowValue,
  overflowY?: OverflowValue,
  padding?: DimensionValue,
  paddingBottom?: DimensionValue,
  paddingHorizontal?: DimensionValue,
  paddingEnd?: DimensionValue,
  paddingLeft?: DimensionValue,
  paddingRight?: DimensionValue,
  paddingStart?: DimensionValue,
  paddingTop?: DimensionValue,
  paddingVertical?: DimensionValue,
  position?: 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky',
  right?: DimensionValue,
  start?: DimensionValue,
  top?: DimensionValue,
  visibility?: VisiblilityValue,
  width?: DimensionValue,
  zIndex?: number,
  /**
   * @platform unsupported
   */
  aspectRatio?: number,
  /**
   * @platform web
   */
  gridAutoColumns?: string,
  gridAutoFlow?: string,
  gridAutoRows?: string,
  gridColumnEnd?: string,
  gridColumnGap?: string,
  gridColumnStart?: string,
  gridRowEnd?: string,
  gridRowGap?: string,
  gridRowStart?: string,
  gridTemplateColumns?: string,
  gridTemplateRows?: string,
  gridTemplateAreas?: string
|};

/**
 * Shadows
 */

export type ShadowStyles = {|
  shadowColor?: ColorValue,
  shadowOffset?: {|
    width?: DimensionValue,
    height?: DimensionValue
  |},
  shadowOpacity?: number,
  shadowRadius?: DimensionValue
|};

/**
 * Transforms
 */

export type TransformStyles = {|
  perspective?: NumberOrString,
  perspectiveOrigin?: string,
  transform?: Array<
    | {| +perspective: NumberOrString |}
    | {| +rotate: string |}
    | {| +rotateX: string |}
    | {| +rotateY: string |}
    | {| +rotateZ: string |}
    | {| +scale: number |}
    | {| +scaleX: number |}
    | {| +scaleY: number |}
    | {| +scaleZ: number |}
    | {| +scale3d: string |}
    | {| +skewX: string |}
    | {| +skewY: string |}
    | {| +translateX: NumberOrString |}
    | {| +translateY: NumberOrString |}
    | {| +translateZ: NumberOrString |}
    | {| +translate3d: string |}
  >,
  transformOrigin?: string,
  transformStyle?: 'flat' | 'preserve-3d'
|};
