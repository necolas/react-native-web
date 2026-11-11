/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {
  FocusEvent,
  Node,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  TouchEvent,
  UIEvent,
  WheelEvent
} from 'react';
import type { ResponderEvent } from '../../modules/useResponderEvents/createResponderEvent';
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
type PointerEventsValue = 'box-none' | 'none' | 'box-only' | 'auto';

export type AccessibilityProps = {
  'aria-activedescendant'?: ?string,
  'aria-atomic'?: ?boolean,
  'aria-autocomplete'?: ?('none' | 'list' | 'inline' | 'both'),
  'aria-busy'?: ?boolean,
  'aria-checked'?: ?(boolean | 'mixed'),
  'aria-colcount'?: ?number,
  'aria-colindex'?: ?number,
  'aria-colspan'?: ?number,
  'aria-controls'?: ?string,
  'aria-current'?: ?(boolean | 'page' | 'step' | 'location' | 'date' | 'time'),
  'aria-describedby'?: ?string,
  'aria-description'?: ?string,
  'aria-details'?: ?string,
  'aria-disabled'?: ?boolean,
  'aria-errormessage'?: ?string,
  'aria-expanded'?: ?boolean,
  'aria-flowto'?: ?string,
  'aria-haspopup'?: ?('dialog' | 'grid' | 'listbox' | 'menu' | 'tree' | false),
  'aria-hidden'?: ?boolean,
  'aria-invalid'?: ?boolean,
  'aria-keyshortcuts'?: ?string,
  'aria-label'?: ?string,
  'aria-labelledby'?: ?string,
  'aria-level'?: ?number,
  'aria-live'?: ?('assertive' | 'off' | 'polite'),
  'aria-modal'?: ?boolean,
  'aria-multiline'?: ?boolean,
  'aria-multiselectable'?: ?boolean,
  'aria-orientation'?: ?('horizontal' | 'vertical'),
  'aria-owns'?: ?string,
  'aria-placeholder'?: ?string,
  'aria-posinset'?: ?number,
  'aria-pressed'?: ?(boolean | 'mixed'),
  'aria-readonly'?: ?boolean,
  'aria-required'?: ?boolean,
  'aria-roledescription'?: ?string,
  'aria-rowcount'?: ?number,
  'aria-rowindex'?: ?number,
  'aria-rowspan'?: ?number,
  'aria-selected'?: ?boolean,
  'aria-setsize'?: ?number,
  'aria-sort'?: ?('ascending' | 'descending' | 'none' | 'other'),
  'aria-valuemax'?: ?number,
  'aria-valuemin'?: ?number,
  'aria-valuenow'?: ?number,
  'aria-valuetext'?: ?string,
  role?: ?string,

  accessibilityHint?: ?string,
  accessibilityLabel?: ?string,
  accessibilityLabelledBy?: ?(string | Array<string>),
  accessibilityLiveRegion?: ?('assertive' | 'none' | 'polite'),
  accessibilityRole?: ?string,
  accessibilityState?: ?{
    busy?: ?boolean,
    checked?: ?(boolean | 'mixed'),
    disabled?: ?boolean,
    expanded?: ?boolean,
    selected?: ?boolean
  },
  accessibilityValue?: ?{
    max?: ?number,
    min?: ?number,
    now?: ?number,
    text?: ?string
  }
};

type FocusHandler = (e: FocusEvent<HTMLElement>) => void;
type KeyboardHandler = (e: KeyboardEvent<HTMLElement>) => void;
type MouseHandler = (e: MouseEvent<HTMLElement>) => void;
type PointerHandler = (e: PointerEvent<HTMLElement>) => void;
type ResponderHandler = (e: ResponderEvent) => void;
type ShouldSetResponderHandler = (e: ResponderEvent) => boolean;
type TouchHandler = (e: TouchEvent<HTMLElement>) => void;

export type EventProps = {
  onAuxClick?: MouseHandler,
  onBlur?: FocusHandler,
  onClick?: MouseHandler,
  onContextMenu?: MouseHandler,
  onFocus?: FocusHandler,
  onGotPointerCapture?: PointerHandler,
  onKeyDown?: KeyboardHandler,
  onKeyUp?: KeyboardHandler,
  onLayout?: (e: LayoutEvent) => void,
  onLostPointerCapture?: PointerHandler,
  onMoveShouldSetResponder?: ShouldSetResponderHandler,
  onMoveShouldSetResponderCapture?: ShouldSetResponderHandler,
  onPointerCancel?: PointerHandler,
  onPointerDown?: PointerHandler,
  onPointerEnter?: PointerHandler,
  onPointerMove?: PointerHandler,
  onPointerLeave?: PointerHandler,
  onPointerOut?: PointerHandler,
  onPointerOver?: PointerHandler,
  onPointerUp?: PointerHandler,
  onResponderEnd?: ResponderHandler,
  onResponderGrant?: (e: ResponderEvent) => void | boolean,
  onResponderMove?: ResponderHandler,
  onResponderReject?: ResponderHandler,
  onResponderRelease?: ResponderHandler,
  onResponderStart?: ResponderHandler,
  onResponderTerminate?: ResponderHandler,
  onResponderTerminationRequest?: ShouldSetResponderHandler,
  onScrollShouldSetResponder?: ShouldSetResponderHandler,
  onScrollShouldSetResponderCapture?: ShouldSetResponderHandler,
  onSelectionChangeShouldSetResponder?: ShouldSetResponderHandler,
  onSelectionChangeShouldSetResponderCapture?: ShouldSetResponderHandler,
  onStartShouldSetResponder?: ShouldSetResponderHandler,
  onStartShouldSetResponderCapture?: ShouldSetResponderHandler,
  // unstable
  onMouseDown?: MouseHandler,
  onMouseEnter?: MouseHandler,
  onMouseLeave?: MouseHandler,
  onMouseMove?: MouseHandler,
  onMouseOver?: MouseHandler,
  onMouseOut?: MouseHandler,
  onMouseUp?: MouseHandler,
  onScroll?: (e: UIEvent<HTMLElement>) => void,
  onTouchCancel?: TouchHandler,
  onTouchCancelCapture?: TouchHandler,
  onTouchEnd?: TouchHandler,
  onTouchEndCapture?: TouchHandler,
  onTouchMove?: TouchHandler,
  onTouchMoveCapture?: TouchHandler,
  onTouchStart?: TouchHandler,
  onTouchStartCapture?: TouchHandler,
  onWheel?: (e: WheelEvent<HTMLElement>) => void
};

export type ViewStyle = {
  ...AnimationStyles,
  ...BorderStyles,
  ...InteractionStyles,
  ...LayoutStyles,
  ...ShadowStyles,
  ...TransformStyles,
  appearance?: ?string,
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
  boxDecorationBreak?: 'clone' | 'slice',
  boxShadow?: ?string,
  clip?: ?string,
  filter?: ?string,
  mask?: ?string,
  maskClip?: ?string,
  maskComposite?: ?string,
  maskImage?: ?string,
  maskOrigin?: ?string,
  maskPosition?: ?string,
  maskRepeat?: ?string,
  maskSize?: ?string,
  forcedColorAdjust?: 'auto' | 'none',
  opacity?: ?number,
  outlineColor?: ?ColorValue,
  outlineOffset?: ?NumberOrString,
  outlineStyle?: ?string,
  outlineWidth?: ?NumberOrString,
  overscrollBehavior?: ?OverscrollBehaviorValue,
  overscrollBehaviorX?: ?OverscrollBehaviorValue,
  overscrollBehaviorY?: ?OverscrollBehaviorValue,
  pointerEvents?: PointerEventsValue,
  printColorAdjust?: 'economy' | 'exact',
  scrollbarWidth?: 'auto' | 'none' | 'thin',
  scrollSnapAlign?: ?string,
  scrollSnapType?: ?string,
  WebkitMaskImage?: ?string,
  WebkitOverflowScrolling?: 'auto' | 'touch'
};

export type ViewProps = {
  ...AccessibilityProps,
  ...EventProps,
  children?: ?Node,
  collapsable?: ?boolean,
  dataSet?: Readonly<Record<string, unknown>>,
  dir?: 'ltr' | 'rtl',
  id?: ?string,
  lang?: string,
  style?: GenericStyleProp<ViewStyle>,
  tabIndex?: ?(0 | -1),
  suppressHydrationWarning?: ?boolean,
  testID?: ?string,
  title?: ?string,
  // unstable
  disabled?: ?boolean,
  href?: ?string,
  hrefAttrs?: ?{ download?: ?boolean, rel?: ?string, target?: ?string },
  type?: ?('button' | 'reset' | 'submit'),
  // @deprecated
  focusable?: ?boolean,
  pointerEvents?: PointerEventsValue,
  nativeID?: ?string
};
