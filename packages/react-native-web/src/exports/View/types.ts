/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
  ReactNode,
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

type OverscrollBehaviorValue = 'auto' | 'contain' | 'none';
type PointerEventsValue = 'box-none' | 'none' | 'box-only' | 'auto';

export type GradientColorStop = {
  color: ColorValue;
  positions?: ReadonlyArray<string>;
};

export type BackgroundPositionValue =
  | { top: number | string; left: number | string }
  | { top: number | string; right: number | string }
  | { bottom: number | string; left: number | string }
  | { bottom: number | string; right: number | string };

export type BackgroundImageValue =
  | {
      type: 'linear-gradient';
      direction?: string;
      colorStops: ReadonlyArray<GradientColorStop>;
    }
  | {
      type: 'radial-gradient';
      shape: 'circle' | 'ellipse';
      size:
        | 'closest-corner'
        | 'closest-side'
        | 'farthest-corner'
        | 'farthest-side'
        | { x: number | string; y: number | string };
      position: BackgroundPositionValue;
      colorStops: ReadonlyArray<GradientColorStop>;
    };

type BackgroundRepeatKeyword = 'no-repeat' | 'repeat' | 'round' | 'space';

export type BackgroundRepeatValue = {
  x: BackgroundRepeatKeyword;
  y: BackgroundRepeatKeyword;
};

export type BackgroundSizeValue = {
  x: number | string;
  y: number | string;
};

export type DropShadowValue = {
  color?: ColorValue;
  offsetX: number | string;
  offsetY: number | string;
  standardDeviation?: number | string;
};

export type FilterFunction =
  | { blur: number | string }
  | { brightness: number | string }
  | { contrast: number | string }
  | { dropShadow: DropShadowValue | string }
  | { grayscale: number | string }
  | { hueRotate: number | string }
  | { invert: number | string }
  | { opacity: number | string }
  | { saturate: number | string }
  | { sepia: number | string };

export type AccessibilityProps = {
  'aria-activedescendant'?: string;
  'aria-atomic'?: boolean;
  'aria-autocomplete'?: 'none' | 'list' | 'inline' | 'both';
  'aria-busy'?: boolean;
  'aria-checked'?: boolean | 'mixed';
  'aria-colcount'?: number;
  'aria-colindex'?: number;
  'aria-colspan'?: number;
  'aria-controls'?: string;
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  'aria-describedby'?: string;
  'aria-description'?: string;
  'aria-details'?: string;
  'aria-disabled'?: boolean;
  'aria-errormessage'?: string;
  'aria-expanded'?: boolean;
  'aria-flowto'?: string;
  'aria-haspopup'?: 'dialog' | 'grid' | 'listbox' | 'menu' | 'tree' | false;
  'aria-hidden'?: boolean;
  'aria-invalid'?: boolean;
  'aria-keyshortcuts'?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-level'?: number;
  'aria-live'?: 'assertive' | 'off' | 'polite';
  'aria-modal'?: boolean;
  'aria-multiline'?: boolean;
  'aria-multiselectable'?: boolean;
  'aria-orientation'?: 'horizontal' | 'vertical';
  'aria-owns'?: string;
  'aria-placeholder'?: string;
  'aria-posinset'?: number;
  'aria-pressed'?: boolean | 'mixed';
  'aria-readonly'?: boolean;
  'aria-required'?: boolean;
  'aria-roledescription'?: string;
  'aria-rowcount'?: number;
  'aria-rowindex'?: number;
  'aria-rowspan'?: number;
  'aria-selected'?: boolean;
  'aria-setsize'?: number;
  'aria-sort'?: 'ascending' | 'descending' | 'none' | 'other';
  'aria-valuemax'?: number;
  'aria-valuemin'?: number;
  'aria-valuenow'?: number;
  'aria-valuetext'?: string;
  role?: string;

  accessibilityHint?: string;
  accessibilityLabel?: string;
  accessibilityLabelledBy?: string | Array<string>;
  accessibilityLiveRegion?: 'assertive' | 'none' | 'polite';
  accessibilityRole?: string;
  accessibilityState?: {
    busy?: boolean;
    checked?: boolean | 'mixed';
    disabled?: boolean;
    expanded?: boolean;
    selected?: boolean;
  };
  accessibilityValue?: {
    max?: number;
    min?: number;
    now?: number;
    text?: string;
  };
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
  onResponderGrant?: (e: ResponderEvent) => void;
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
    appearance?: string;
    backdropFilter?: string;
    backgroundAttachment?: string;
    backgroundBlendMode?: string;
    backgroundClip?: string;
    backgroundColor?: ColorValue;
    backgroundImage?: string | ReadonlyArray<BackgroundImageValue>;
    backgroundOrigin?: 'border-box' | 'content-box' | 'padding-box';
    backgroundPosition?: string | ReadonlyArray<BackgroundPositionValue>;
    backgroundRepeat?: string | ReadonlyArray<BackgroundRepeatValue>;
    backgroundSize?: string | ReadonlyArray<BackgroundSizeValue>;
    boxDecorationBreak?: 'clone' | 'slice';
    boxShadow?: string;
    clip?: string;
    filter?: string | ReadonlyArray<FilterFunction>;
    mask?: string;
    maskClip?: string;
    maskComposite?: string;
    maskImage?: string;
    maskOrigin?: string;
    maskPosition?: string;
    maskRepeat?: string;
    maskSize?: string;
    forcedColorAdjust?: 'auto' | 'none';
    opacity?: number;
    outlineColor?: ColorValue;
    outlineOffset?: number | string;
    outlineStyle?: string;
    outlineWidth?: number | string;
    overscrollBehavior?: OverscrollBehaviorValue;
    overscrollBehaviorX?: OverscrollBehaviorValue;
    overscrollBehaviorY?: OverscrollBehaviorValue;
    pointerEvents?: PointerEventsValue;
    printColorAdjust?: 'economy' | 'exact';
    scrollbarWidth?: 'auto' | 'none' | 'thin';
    scrollSnapAlign?: string;
    scrollSnapType?: string;
    WebkitMaskImage?: string;
    WebkitOverflowScrolling?: 'auto' | 'touch';
  };

export type ViewProps = AccessibilityProps &
  EventProps & {
    children?: ReactNode;
    collapsable?: boolean;
    dataSet?: Readonly<Record<string, unknown>>;
    dir?: 'ltr' | 'rtl';
    focusable?: boolean;
    id?: string;
    lang?: string;
    nativeID?: string;
    pointerEvents?: PointerEventsValue;
    style?: GenericStyleProp<ViewStyle>;
    tabIndex?: 0 | -1;
    suppressHydrationWarning?: boolean;
    testID?: string;
    title?: string;
    // unstable
    disabled?: boolean;
    href?: string;
    hrefAttrs?: {
      download?: boolean | string;
      rel?: string;
      target?: string;
    };
    unstable_type?: 'button' | 'reset' | 'submit';
  };
