/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
  FocusEvent,
  ReactNode,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  TouchEvent,
  UIEvent,
  WheelEvent
} from 'react';
import type { ResponderEvent } from '../../modules/useResponderEvents/createResponderEvent';
import type {
  ColorValue,
  GenericStyleProp,
  LayoutEvent,
  Nullable
} from '../../types';

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
  'aria-activedescendant'?: Nullable<string>;
  'aria-atomic'?: Nullable<boolean>;
  'aria-autocomplete'?: Nullable<'none' | 'list' | 'inline' | 'both'>;
  'aria-busy'?: Nullable<boolean>;
  'aria-checked'?: Nullable<boolean | 'mixed'>;
  'aria-colcount'?: Nullable<number>;
  'aria-colindex'?: Nullable<number>;
  'aria-colspan'?: Nullable<number>;
  'aria-controls'?: Nullable<string>;
  'aria-current'?: Nullable<
    boolean | 'page' | 'step' | 'location' | 'date' | 'time'
  >;
  'aria-describedby'?: Nullable<string>;
  'aria-description'?: Nullable<string>;
  'aria-details'?: Nullable<string>;
  'aria-disabled'?: Nullable<boolean>;
  'aria-errormessage'?: Nullable<string>;
  'aria-expanded'?: Nullable<boolean>;
  'aria-flowto'?: Nullable<string>;
  'aria-haspopup'?: Nullable<
    'dialog' | 'grid' | 'listbox' | 'menu' | 'tree' | false
  >;
  'aria-hidden'?: Nullable<boolean>;
  'aria-invalid'?: Nullable<boolean>;
  'aria-keyshortcuts'?: Nullable<string>;
  'aria-label'?: Nullable<string>;
  'aria-labelledby'?: Nullable<string>;
  'aria-level'?: Nullable<number>;
  'aria-live'?: Nullable<'assertive' | 'off' | 'polite'>;
  'aria-modal'?: Nullable<boolean>;
  'aria-multiline'?: Nullable<boolean>;
  'aria-multiselectable'?: Nullable<boolean>;
  'aria-orientation'?: Nullable<'horizontal' | 'vertical'>;
  'aria-owns'?: Nullable<string>;
  'aria-placeholder'?: Nullable<string>;
  'aria-posinset'?: Nullable<number>;
  'aria-pressed'?: Nullable<boolean | 'mixed'>;
  'aria-readonly'?: Nullable<boolean>;
  'aria-required'?: Nullable<boolean>;
  'aria-roledescription'?: Nullable<string>;
  'aria-rowcount'?: Nullable<number>;
  'aria-rowindex'?: Nullable<number>;
  'aria-rowspan'?: Nullable<number>;
  'aria-selected'?: Nullable<boolean>;
  'aria-setsize'?: Nullable<number>;
  'aria-sort'?: Nullable<'ascending' | 'descending' | 'none' | 'other'>;
  'aria-valuemax'?: Nullable<number>;
  'aria-valuemin'?: Nullable<number>;
  'aria-valuenow'?: Nullable<number>;
  'aria-valuetext'?: Nullable<string>;
  role?: Nullable<string>;

  accessibilityHint?: Nullable<string>;
  accessibilityLabel?: Nullable<string>;
  accessibilityLabelledBy?: Nullable<string | Array<string>>;
  accessibilityLiveRegion?: Nullable<'assertive' | 'none' | 'polite'>;
  accessibilityRole?: Nullable<string>;
  accessibilityState?: Nullable<{
    busy?: Nullable<boolean>;
    checked?: Nullable<boolean | 'mixed'>;
    disabled?: Nullable<boolean>;
    expanded?: Nullable<boolean>;
    selected?: Nullable<boolean>;
  }>;
  accessibilityValue?: Nullable<{
    max?: Nullable<number>;
    min?: Nullable<number>;
    now?: Nullable<number>;
    text?: Nullable<string>;
  }>;
};

type FocusHandler = (e: FocusEvent<HTMLElement>) => void;
type KeyboardHandler = (e: KeyboardEvent<HTMLElement>) => void;
type MouseHandler = (e: MouseEvent<HTMLElement>) => void;
type PointerHandler = (e: PointerEvent<HTMLElement>) => void;
type ResponderHandler = (e: ResponderEvent) => void;
type ShouldSetResponderHandler = (e: ResponderEvent) => boolean;
type TouchHandler = (e: TouchEvent<HTMLElement>) => void;

export type EventProps = {
  onAuxClick?: MouseHandler;
  onBlur?: FocusHandler;
  onClick?: MouseHandler;
  onContextMenu?: MouseHandler;
  onFocus?: FocusHandler;
  onGotPointerCapture?: PointerHandler;
  onKeyDown?: KeyboardHandler;
  onKeyUp?: KeyboardHandler;
  onLayout?: (e: LayoutEvent) => void;
  onLostPointerCapture?: PointerHandler;
  onMoveShouldSetResponder?: ShouldSetResponderHandler;
  onMoveShouldSetResponderCapture?: ShouldSetResponderHandler;
  onPointerCancel?: PointerHandler;
  onPointerDown?: PointerHandler;
  onPointerEnter?: PointerHandler;
  onPointerMove?: PointerHandler;
  onPointerLeave?: PointerHandler;
  onPointerOut?: PointerHandler;
  onPointerOver?: PointerHandler;
  onPointerUp?: PointerHandler;
  onResponderEnd?: ResponderHandler;
  onResponderGrant?: (e: ResponderEvent) => void | boolean;
  onResponderMove?: ResponderHandler;
  onResponderReject?: ResponderHandler;
  onResponderRelease?: ResponderHandler;
  onResponderStart?: ResponderHandler;
  onResponderTerminate?: ResponderHandler;
  onResponderTerminationRequest?: ShouldSetResponderHandler;
  onScrollShouldSetResponder?: ShouldSetResponderHandler;
  onScrollShouldSetResponderCapture?: ShouldSetResponderHandler;
  onSelectionChangeShouldSetResponder?: ShouldSetResponderHandler;
  onSelectionChangeShouldSetResponderCapture?: ShouldSetResponderHandler;
  onStartShouldSetResponder?: ShouldSetResponderHandler;
  onStartShouldSetResponderCapture?: ShouldSetResponderHandler;
  // unstable
  onMouseDown?: MouseHandler;
  onMouseEnter?: MouseHandler;
  onMouseLeave?: MouseHandler;
  onMouseMove?: MouseHandler;
  onMouseOver?: MouseHandler;
  onMouseOut?: MouseHandler;
  onMouseUp?: MouseHandler;
  onScroll?: (e: UIEvent<HTMLElement>) => void;
  onTouchCancel?: TouchHandler;
  onTouchCancelCapture?: TouchHandler;
  onTouchEnd?: TouchHandler;
  onTouchEndCapture?: TouchHandler;
  onTouchMove?: TouchHandler;
  onTouchMoveCapture?: TouchHandler;
  onTouchStart?: TouchHandler;
  onTouchStartCapture?: TouchHandler;
  onWheel?: (e: WheelEvent<HTMLElement>) => void;
};

export type ViewStyle = AnimationStyles &
  BorderStyles &
  InteractionStyles &
  LayoutStyles &
  ShadowStyles &
  TransformStyles & {
    appearance?: Nullable<string>;
    backdropFilter?: Nullable<string>;
    backgroundAttachment?: Nullable<string>;
    backgroundBlendMode?: Nullable<string>;
    backgroundClip?: Nullable<string>;
    backgroundColor?: Nullable<ColorValue>;
    backgroundImage?: Nullable<string>;
    backgroundOrigin?: 'border-box' | 'content-box' | 'padding-box';
    backgroundPosition?: Nullable<string>;
    backgroundRepeat?: Nullable<string>;
    backgroundSize?: Nullable<string>;
    boxDecorationBreak?: 'clone' | 'slice';
    boxShadow?: Nullable<string>;
    clip?: Nullable<string>;
    filter?: Nullable<string>;
    mask?: Nullable<string>;
    maskClip?: Nullable<string>;
    maskComposite?: Nullable<string>;
    maskImage?: Nullable<string>;
    maskOrigin?: Nullable<string>;
    maskPosition?: Nullable<string>;
    maskRepeat?: Nullable<string>;
    maskSize?: Nullable<string>;
    forcedColorAdjust?: 'auto' | 'none';
    opacity?: Nullable<number>;
    outlineColor?: Nullable<ColorValue>;
    outlineOffset?: Nullable<NumberOrString>;
    outlineStyle?: Nullable<string>;
    outlineWidth?: Nullable<NumberOrString>;
    overscrollBehavior?: Nullable<OverscrollBehaviorValue>;
    overscrollBehaviorX?: Nullable<OverscrollBehaviorValue>;
    overscrollBehaviorY?: Nullable<OverscrollBehaviorValue>;
    pointerEvents?: PointerEventsValue;
    printColorAdjust?: 'economy' | 'exact';
    scrollbarWidth?: 'auto' | 'none' | 'thin';
    scrollSnapAlign?: Nullable<string>;
    scrollSnapType?: Nullable<string>;
    WebkitMaskImage?: Nullable<string>;
    WebkitOverflowScrolling?: 'auto' | 'touch';
  };

export type ViewProps = AccessibilityProps &
  EventProps & {
    children?: Nullable<ReactNode>;
    collapsable?: Nullable<boolean>;
    dataSet?: Readonly<Record<string, unknown>>;
    dir?: 'ltr' | 'rtl';
    id?: Nullable<string>;
    lang?: string;
    style?: GenericStyleProp<ViewStyle>;
    tabIndex?: Nullable<0 | -1>;
    suppressHydrationWarning?: Nullable<boolean>;
    testID?: Nullable<string>;
    title?: Nullable<string>;
    // unstable
    disabled?: Nullable<boolean>;
    href?: Nullable<string>;
    hrefAttrs?: Nullable<{
      download?: Nullable<boolean | string>;
      rel?: Nullable<string>;
      target?: Nullable<string>;
    }>;
    type?: Nullable<'button' | 'reset' | 'submit'>;
    // @deprecated
    focusable?: Nullable<boolean>;
    pointerEvents?: PointerEventsValue;
    nativeID?: Nullable<string>;
  };
