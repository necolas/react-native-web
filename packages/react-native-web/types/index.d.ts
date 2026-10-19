/**
 * Augments the types of `react-native` (>= 0.88) with the props and styles
 * that react-native-web supports.
 *
 * Usage, in a `.d.ts` file of your project:
 *   /// <reference types="react-native-web/types" />
 * Or in `tsconfig.json`:
 *   "compilerOptions": { "types": ["react-native-web/types"] }
 */

import type {
  MouseEventHandler,
  UIEventHandler,
  WheelEventHandler
} from 'react';
import type {
  ColorValue,
  DimensionValue,
  GestureResponderEvent,
  Role
} from 'react-native';

type idRef = string;
type idRefList = idRef | Array<idRef>;
type NumberOrString = number | string;

// Roles that react-native-web renders as a specific HTML element.
// See src/modules/AccessibilityUtil/propsToAccessibilityComponent.js
type WebRole =
  | 'blockquote'
  | 'code'
  | 'deletion'
  | 'emphasis'
  | 'insertion'
  | 'label'
  | 'paragraph'
  | 'strong';

// See src/exports/View/types.js
interface WebAccessibilityProps {
  'aria-activedescendant'?: idRef | undefined;
  'aria-atomic'?: boolean | undefined;
  'aria-autocomplete'?: 'none' | 'list' | 'inline' | 'both' | undefined;
  'aria-colcount'?: number | undefined;
  'aria-colindex'?: number | undefined;
  'aria-colspan'?: number | undefined;
  'aria-controls'?: idRef | undefined;
  'aria-current'?:
    boolean | 'page' | 'step' | 'location' | 'date' | 'time' | undefined;
  'aria-describedby'?: idRef | undefined;
  'aria-details'?: idRef | undefined;
  'aria-errormessage'?: idRef | undefined;
  'aria-flowto'?: idRef | undefined;
  'aria-haspopup'?:
    'dialog' | 'grid' | 'listbox' | 'menu' | 'tree' | false | undefined;
  'aria-invalid'?: boolean | undefined;
  'aria-keyshortcuts'?: Array<string> | undefined;
  'aria-level'?: number | undefined;
  'aria-multiline'?: boolean | undefined;
  'aria-multiselectable'?: boolean | undefined;
  'aria-orientation'?: 'horizontal' | 'vertical' | undefined;
  'aria-owns'?: idRef | undefined;
  'aria-placeholder'?: string | undefined;
  'aria-posinset'?: number | undefined;
  'aria-pressed'?: boolean | 'mixed' | undefined;
  'aria-readonly'?: boolean | undefined;
  'aria-required'?: boolean | undefined;
  'aria-roledescription'?: string | undefined;
  'aria-rowcount'?: number | undefined;
  'aria-rowindex'?: number | undefined;
  'aria-rowspan'?: number | undefined;
  'aria-setsize'?: number | undefined;
  'aria-sort'?: 'ascending' | 'descending' | 'none' | 'other' | undefined;
  inert?: boolean | undefined;

  /** @deprecated Use `aria-activedescendant`. */
  accessibilityActiveDescendant?: idRef | undefined;
  /** @deprecated Use `aria-atomic`. */
  accessibilityAtomic?: boolean | undefined;
  /** @deprecated Use `aria-autocomplete`. */
  accessibilityAutoComplete?: 'none' | 'list' | 'inline' | 'both' | undefined;
  /** @deprecated Use `aria-busy`. */
  accessibilityBusy?: boolean | undefined;
  /** @deprecated Use `aria-checked`. */
  accessibilityChecked?: boolean | 'mixed' | undefined;
  /** @deprecated Use `aria-colcount`. */
  accessibilityColumnCount?: number | undefined;
  /** @deprecated Use `aria-colindex`. */
  accessibilityColumnIndex?: number | undefined;
  /** @deprecated Use `aria-colspan`. */
  accessibilityColumnSpan?: number | undefined;
  /** @deprecated Use `aria-controls`. */
  accessibilityControls?: idRefList | undefined;
  /** @deprecated Use `aria-current`. */
  accessibilityCurrent?:
    boolean | 'page' | 'step' | 'location' | 'date' | 'time' | undefined;
  /** @deprecated Use `aria-describedby`. */
  accessibilityDescribedBy?: idRefList | undefined;
  /** @deprecated Use `aria-details`. */
  accessibilityDetails?: idRef | undefined;
  /** @deprecated Use `aria-disabled`. */
  accessibilityDisabled?: boolean | undefined;
  /** @deprecated Use `aria-errormessage`. */
  accessibilityErrorMessage?: idRef | undefined;
  /** @deprecated Use `aria-expanded`. */
  accessibilityExpanded?: boolean | undefined;
  /** @deprecated Use `aria-flowto`. */
  accessibilityFlowTo?: idRefList | undefined;
  /** @deprecated Use `aria-haspopup`. */
  accessibilityHasPopup?:
    'dialog' | 'grid' | 'listbox' | 'menu' | 'tree' | false | undefined;
  /** @deprecated Use `aria-hidden`. */
  accessibilityHidden?: boolean | undefined;
  /** @deprecated Use `aria-invalid`. */
  accessibilityInvalid?: boolean | undefined;
  /** @deprecated Use `aria-keyshortcuts`. */
  accessibilityKeyShortcuts?: Array<string> | undefined;
  /** @deprecated Use `aria-level`. */
  accessibilityLevel?: number | undefined;
  /** @deprecated Use `aria-modal`. */
  accessibilityModal?: boolean | undefined;
  /** @deprecated Use `aria-multiline`. */
  accessibilityMultiline?: boolean | undefined;
  /** @deprecated Use `aria-multiselectable`. */
  accessibilityMultiSelectable?: boolean | undefined;
  /** @deprecated Use `aria-orientation`. */
  accessibilityOrientation?: 'horizontal' | 'vertical' | undefined;
  /** @deprecated Use `aria-owns`. */
  accessibilityOwns?: idRefList | undefined;
  /** @deprecated Use `aria-placeholder`. */
  accessibilityPlaceholder?: string | undefined;
  /** @deprecated Use `aria-posinset`. */
  accessibilityPosInSet?: number | undefined;
  /** @deprecated Use `aria-pressed`. */
  accessibilityPressed?: boolean | 'mixed' | undefined;
  /** @deprecated Use `aria-readonly`. */
  accessibilityReadOnly?: boolean | undefined;
  /** @deprecated Use `aria-required`. */
  accessibilityRequired?: boolean | undefined;
  /** @deprecated Use `aria-roledescription`. */
  accessibilityRoleDescription?: string | undefined;
  /** @deprecated Use `aria-rowcount`. */
  accessibilityRowCount?: number | undefined;
  /** @deprecated Use `aria-rowindex`. */
  accessibilityRowIndex?: number | undefined;
  /** @deprecated Use `aria-rowspan`. */
  accessibilityRowSpan?: number | undefined;
  /** @deprecated Use `aria-selected`. */
  accessibilitySelected?: boolean | undefined;
  /** @deprecated Use `aria-setsize`. */
  accessibilitySetSize?: number | undefined;
  /** @deprecated Use `aria-sort`. */
  accessibilitySort?: 'ascending' | 'descending' | 'none' | 'other' | undefined;
  /** @deprecated Use `aria-valuemax`. */
  accessibilityValueMax?: number | undefined;
  /** @deprecated Use `aria-valuemin`. */
  accessibilityValueMin?: number | undefined;
  /** @deprecated Use `aria-valuenow`. */
  accessibilityValueNow?: number | undefined;
  /** @deprecated Use `aria-valuetext`. */
  accessibilityValueText?: string | undefined;
}

// Events that react-native does not declare.
// See src/exports/View/types.js and src/modules/forwardedProps/index.js
interface WebEventProps {
  onAuxClick?: MouseEventHandler | undefined;
  onContextMenu?: MouseEventHandler | undefined;
  onMouseDown?: MouseEventHandler | undefined;
  onMouseMove?: MouseEventHandler | undefined;
  onMouseOut?: MouseEventHandler | undefined;
  onMouseOver?: MouseEventHandler | undefined;
  onMouseUp?: MouseEventHandler | undefined;
  onScroll?: UIEventHandler | undefined;
  onWheel?: WheelEventHandler | undefined;
  onScrollShouldSetResponder?:
    ((event: GestureResponderEvent) => boolean) | undefined;
  onScrollShouldSetResponderCapture?:
    ((event: GestureResponderEvent) => boolean) | undefined;
  onSelectionChangeShouldSetResponder?:
    ((event: GestureResponderEvent) => boolean) | undefined;
  onSelectionChangeShouldSetResponderCapture?:
    ((event: GestureResponderEvent) => boolean) | undefined;
}

interface WebSharedProps extends WebEventProps {
  dataSet?: Record<string, unknown> | undefined;
  lang?: string | undefined;
  suppressHydrationWarning?: boolean | undefined;
  /** @unstable */
  href?: string | undefined;
  /** @unstable */
  hrefAttrs?:
    | {
        download?: boolean | undefined;
        rel?: string | undefined;
        target?: string | undefined;
      }
    | undefined;
}

// Styles that react-native does not declare.
// See src/exports/View/types.js and src/types/styles.js
type AnimationDirection =
  'alternate' | 'alternate-reverse' | 'normal' | 'reverse';

type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';
type AnimationIterationCount = number | 'infinite';
type AnimationKeyframes = string | Record<string, unknown>;
type AnimationPlayState = 'paused' | 'running';
type BorderStyleValue = 'solid' | 'dotted' | 'dashed';

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

type OverflowValue = 'auto' | 'hidden' | 'scroll' | 'visible';
type OverscrollBehaviorValue = 'auto' | 'contain' | 'none';

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

interface WebViewStyle {
  animationDelay?: string | Array<string> | undefined;
  animationDirection?:
    AnimationDirection | Array<AnimationDirection> | undefined;
  animationDuration?: string | Array<string> | undefined;
  animationFillMode?: AnimationFillMode | Array<AnimationFillMode> | undefined;
  animationIterationCount?:
    AnimationIterationCount | Array<AnimationIterationCount> | undefined;
  animationKeyframes?:
    AnimationKeyframes | Array<AnimationKeyframes> | undefined;
  animationPlayState?:
    AnimationPlayState | Array<AnimationPlayState> | undefined;
  animationTimingFunction?: string | Array<string> | undefined;
  appearance?: string | undefined;
  backdropFilter?: string | undefined;
  backgroundAttachment?: string | undefined;
  backgroundBlendMode?: string | undefined;
  backgroundClip?: string | undefined;
  backgroundOrigin?: 'border-box' | 'content-box' | 'padding-box' | undefined;
  borderBlockEndStyle?: BorderStyleValue | undefined;
  borderBlockEndWidth?: DimensionValue | undefined;
  borderBlockStartStyle?: BorderStyleValue | undefined;
  borderBlockStartWidth?: DimensionValue | undefined;
  borderBlockStyle?: BorderStyleValue | undefined;
  borderBlockWidth?: DimensionValue | undefined;
  borderBottomStyle?: BorderStyleValue | undefined;
  borderInlineColor?: ColorValue | undefined;
  borderInlineEndColor?: ColorValue | undefined;
  borderInlineEndStyle?: BorderStyleValue | undefined;
  borderInlineEndWidth?: DimensionValue | undefined;
  borderInlineStartColor?: ColorValue | undefined;
  borderInlineStartStyle?: BorderStyleValue | undefined;
  borderInlineStartWidth?: DimensionValue | undefined;
  borderInlineStyle?: BorderStyleValue | undefined;
  borderInlineWidth?: DimensionValue | undefined;
  borderLeftStyle?: BorderStyleValue | undefined;
  borderRightStyle?: BorderStyleValue | undefined;
  borderTopStyle?: BorderStyleValue | undefined;
  /** @deprecated */
  borderEndStyle?: BorderStyleValue | undefined;
  /** @deprecated */
  borderStartStyle?: BorderStyleValue | undefined;
  boxDecorationBreak?: 'clone' | 'slice' | undefined;
  clip?: string | undefined;
  forcedColorAdjust?: 'auto' | 'none' | undefined;
  gridAutoColumns?: string | undefined;
  gridAutoFlow?: string | undefined;
  gridAutoRows?: string | undefined;
  gridColumnEnd?: string | undefined;
  gridColumnGap?: string | undefined;
  gridColumnStart?: string | undefined;
  gridRowEnd?: string | undefined;
  gridRowGap?: string | undefined;
  gridRowStart?: string | undefined;
  gridTemplateAreas?: string | undefined;
  gridTemplateColumns?: string | undefined;
  gridTemplateRows?: string | undefined;
  mask?: string | undefined;
  maskClip?: string | undefined;
  maskComposite?: string | undefined;
  maskImage?: string | undefined;
  maskOrigin?: string | undefined;
  maskPosition?: string | undefined;
  maskRepeat?: string | undefined;
  maskSize?: string | undefined;
  order?: number | undefined;
  overflowX?: OverflowValue | undefined;
  overflowY?: OverflowValue | undefined;
  overscrollBehavior?: OverscrollBehaviorValue | undefined;
  overscrollBehaviorX?: OverscrollBehaviorValue | undefined;
  overscrollBehaviorY?: OverscrollBehaviorValue | undefined;
  perspective?: NumberOrString | undefined;
  perspectiveOrigin?: string | undefined;
  printColorAdjust?: 'economy' | 'exact' | undefined;
  scrollbarWidth?: 'auto' | 'none' | 'thin' | undefined;
  scrollSnapAlign?: string | undefined;
  scrollSnapType?: string | undefined;
  touchAction?: TouchActionValue | undefined;
  transformStyle?: 'flat' | 'preserve-3d' | undefined;
  transitionDelay?: string | Array<string> | undefined;
  transitionDuration?: string | Array<string> | undefined;
  transitionProperty?: string | Array<string> | undefined;
  transitionTimingFunction?: string | Array<string> | undefined;
  visibility?: 'hidden' | 'visible' | undefined;
  willChange?: string | undefined;
  WebkitMaskImage?: string | undefined;
  WebkitOverflowScrolling?: 'auto' | 'touch' | undefined;
}

// See src/exports/Text/types.js and src/exports/TextInput/types.js
interface WebTextStyle {
  fontFeatureSettings?: string | undefined;
  hyphenateCharacter?: string | undefined;
  hyphens?: 'auto' | 'manual' | 'none' | undefined;
  initialLetter?: NumberOrString | undefined;
  lineClamp?: number | undefined;
  rubyPosition?: 'alternate' | 'over' | 'under' | undefined;
  textEmphasis?: string | undefined;
  textEmphasisColor?: ColorValue | undefined;
  textEmphasisPosition?: string | undefined;
  textEmphasisStyle?: string | undefined;
  textIndent?: NumberOrString | undefined;
  textOverflow?: string | undefined;
  textRendering?:
    | 'auto'
    | 'geometricPrecision'
    | 'optimizeLegibility'
    | 'optimizeSpeed'
    | undefined;
  textShadow?: string | undefined;
  textSizeAdjust?: string | undefined;
  unicodeBidi?:
    | 'normal'
    | 'bidi-override'
    | 'embed'
    | 'isolate'
    | 'isolate-override'
    | 'plaintext'
    | undefined;
  whiteSpace?: string | undefined;
  wordBreak?: 'normal' | 'break-all' | 'break-word' | 'keep-all' | undefined;
  wordWrap?: string | undefined;
  MozOsxFontSmoothing?: string | undefined;
  WebkitFontSmoothing?: string | undefined;
  /** TextInput only. */
  caretColor?: ColorValue | undefined;
  /** TextInput only. */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both' | undefined;
}

declare module 'react-native' {
  interface AccessibilityProps extends WebAccessibilityProps {
    'aria-live'?: 'assertive' | 'none' | 'off' | 'polite' | undefined;
    role?: Role | WebRole | undefined;
  }

  interface ViewProps extends WebSharedProps {
    dir?: 'ltr' | 'rtl' | undefined;
  }

  interface TextProps
    extends
      WebSharedProps,
      Pick<
        ViewProps,
        | 'focusable'
        | 'onBlur'
        | 'onClick'
        | 'onFocus'
        | 'onGotPointerCapture'
        | 'onKeyDown'
        | 'onKeyUp'
        | 'onLostPointerCapture'
        | 'onMouseEnter'
        | 'onMouseLeave'
        | 'onMoveShouldSetResponderCapture'
        | 'onPointerCancel'
        | 'onPointerDown'
        | 'onPointerOut'
        | 'onPointerOver'
        | 'onPointerUp'
        | 'onResponderEnd'
        | 'onResponderReject'
        | 'onResponderStart'
        | 'onStartShouldSetResponderCapture'
        | 'onTouchCancel'
        | 'onTouchCancelCapture'
        | 'onTouchEnd'
        | 'onTouchEndCapture'
        | 'onTouchMove'
        | 'onTouchMoveCapture'
        | 'onTouchStart'
        | 'onTouchStartCapture'
        | 'tabIndex'
      > {
    dir?: 'auto' | 'ltr' | 'rtl' | undefined;
  }

  interface TextInputProps {
    /** @deprecated Use `autoComplete`. */
    autoCompleteType?: string | undefined;
    dir?: 'auto' | 'ltr' | 'rtl' | undefined;
    disabled?: boolean | undefined;
  }

  interface ImageProps {
    draggable?: boolean | undefined;
  }

  interface PressableProps extends Pick<
    ViewProps,
    'onMouseEnter' | 'onMouseLeave'
  > {
    /** Duration (in milliseconds) from `onPressStart` is called after pointerdown. */
    delayPressIn?: number | undefined;
    /** Duration (in milliseconds) from `onPressEnd` is called after pointerup. */
    delayPressOut?: number | undefined;
    /** Used only for documentation or testing (e.g. snapshot testing). */
    testOnly_hovered?: boolean | undefined;
  }

  interface PressableStateCallbackType {
    readonly focused?: boolean | undefined;
    readonly hovered?: boolean | undefined;
  }

  interface ViewStyle extends WebViewStyle {
    borderBottomWidth?: DimensionValue | undefined;
    borderEndWidth?: DimensionValue | undefined;
    borderLeftWidth?: DimensionValue | undefined;
    borderRightWidth?: DimensionValue | undefined;
    borderStartWidth?: DimensionValue | undefined;
    borderTopWidth?: DimensionValue | undefined;
    borderWidth?: DimensionValue | undefined;
    bottom?: DimensionValue | undefined;
    boxSizing?: 'border-box' | 'content-box' | 'padding-box' | undefined;
    cursor?: CursorValue | undefined;
    display?: string | undefined;
    end?: DimensionValue | undefined;
    height?: DimensionValue | undefined;
    inset?: DimensionValue | undefined;
    insetBlock?: DimensionValue | undefined;
    insetBlockEnd?: DimensionValue | undefined;
    insetBlockStart?: DimensionValue | undefined;
    insetInline?: DimensionValue | undefined;
    insetInlineEnd?: DimensionValue | undefined;
    insetInlineStart?: DimensionValue | undefined;
    left?: DimensionValue | undefined;
    margin?: DimensionValue | undefined;
    marginBlock?: DimensionValue | undefined;
    marginBlockEnd?: DimensionValue | undefined;
    marginBlockStart?: DimensionValue | undefined;
    marginBottom?: DimensionValue | undefined;
    marginEnd?: DimensionValue | undefined;
    marginHorizontal?: DimensionValue | undefined;
    marginInline?: DimensionValue | undefined;
    marginInlineEnd?: DimensionValue | undefined;
    marginInlineStart?: DimensionValue | undefined;
    marginLeft?: DimensionValue | undefined;
    marginRight?: DimensionValue | undefined;
    marginStart?: DimensionValue | undefined;
    marginTop?: DimensionValue | undefined;
    marginVertical?: DimensionValue | undefined;
    maxHeight?: DimensionValue | undefined;
    maxWidth?: DimensionValue | undefined;
    minHeight?: DimensionValue | undefined;
    minWidth?: DimensionValue | undefined;
    outlineOffset?: NumberOrString | undefined;
    outlineStyle?: string | undefined;
    outlineWidth?: NumberOrString | undefined;
    overflow?: OverflowValue | undefined;
    padding?: DimensionValue | undefined;
    paddingBlock?: DimensionValue | undefined;
    paddingBlockEnd?: DimensionValue | undefined;
    paddingBlockStart?: DimensionValue | undefined;
    paddingBottom?: DimensionValue | undefined;
    paddingEnd?: DimensionValue | undefined;
    paddingHorizontal?: DimensionValue | undefined;
    paddingInline?: DimensionValue | undefined;
    paddingInlineEnd?: DimensionValue | undefined;
    paddingInlineStart?: DimensionValue | undefined;
    paddingLeft?: DimensionValue | undefined;
    paddingRight?: DimensionValue | undefined;
    paddingStart?: DimensionValue | undefined;
    paddingTop?: DimensionValue | undefined;
    paddingVertical?: DimensionValue | undefined;
    position?:
      'absolute' | 'fixed' | 'relative' | 'static' | 'sticky' | undefined;
    right?: DimensionValue | undefined;
    start?: DimensionValue | undefined;
    top?: DimensionValue | undefined;
    userSelect?: 'all' | 'auto' | 'contain' | 'none' | 'text' | undefined;
    width?: DimensionValue | undefined;
  }

  interface TextStyle extends WebViewStyle, WebTextStyle {
    borderBottomWidth?: DimensionValue | undefined;
    borderEndWidth?: DimensionValue | undefined;
    borderLeftWidth?: DimensionValue | undefined;
    borderRightWidth?: DimensionValue | undefined;
    borderStartWidth?: DimensionValue | undefined;
    borderTopWidth?: DimensionValue | undefined;
    borderWidth?: DimensionValue | undefined;
    bottom?: DimensionValue | undefined;
    boxSizing?: 'border-box' | 'content-box' | 'padding-box' | undefined;
    cursor?: CursorValue | undefined;
    display?: string | undefined;
    end?: DimensionValue | undefined;
    fontSize?: NumberOrString | undefined;
    height?: DimensionValue | undefined;
    inset?: DimensionValue | undefined;
    insetBlock?: DimensionValue | undefined;
    insetBlockEnd?: DimensionValue | undefined;
    insetBlockStart?: DimensionValue | undefined;
    insetInline?: DimensionValue | undefined;
    insetInlineEnd?: DimensionValue | undefined;
    insetInlineStart?: DimensionValue | undefined;
    left?: DimensionValue | undefined;
    letterSpacing?: NumberOrString | undefined;
    lineHeight?: NumberOrString | undefined;
    margin?: DimensionValue | undefined;
    marginBlock?: DimensionValue | undefined;
    marginBlockEnd?: DimensionValue | undefined;
    marginBlockStart?: DimensionValue | undefined;
    marginBottom?: DimensionValue | undefined;
    marginEnd?: DimensionValue | undefined;
    marginHorizontal?: DimensionValue | undefined;
    marginInline?: DimensionValue | undefined;
    marginInlineEnd?: DimensionValue | undefined;
    marginInlineStart?: DimensionValue | undefined;
    marginLeft?: DimensionValue | undefined;
    marginRight?: DimensionValue | undefined;
    marginStart?: DimensionValue | undefined;
    marginTop?: DimensionValue | undefined;
    marginVertical?: DimensionValue | undefined;
    maxHeight?: DimensionValue | undefined;
    maxWidth?: DimensionValue | undefined;
    minHeight?: DimensionValue | undefined;
    minWidth?: DimensionValue | undefined;
    outlineOffset?: NumberOrString | undefined;
    outlineStyle?: string | undefined;
    outlineWidth?: NumberOrString | undefined;
    overflow?: OverflowValue | undefined;
    padding?: DimensionValue | undefined;
    paddingBlock?: DimensionValue | undefined;
    paddingBlockEnd?: DimensionValue | undefined;
    paddingBlockStart?: DimensionValue | undefined;
    paddingBottom?: DimensionValue | undefined;
    paddingEnd?: DimensionValue | undefined;
    paddingHorizontal?: DimensionValue | undefined;
    paddingInline?: DimensionValue | undefined;
    paddingInlineEnd?: DimensionValue | undefined;
    paddingInlineStart?: DimensionValue | undefined;
    paddingLeft?: DimensionValue | undefined;
    paddingRight?: DimensionValue | undefined;
    paddingStart?: DimensionValue | undefined;
    paddingTop?: DimensionValue | undefined;
    paddingVertical?: DimensionValue | undefined;
    position?:
      'absolute' | 'fixed' | 'relative' | 'static' | 'sticky' | undefined;
    right?: DimensionValue | undefined;
    start?: DimensionValue | undefined;
    textAlign?:
      | 'auto'
      | 'center'
      | 'end'
      | 'inherit'
      | 'justify'
      | 'justify-all'
      | 'left'
      | 'right'
      | 'start'
      | undefined;
    top?: DimensionValue | undefined;
    verticalAlign?: string | undefined;
    width?: DimensionValue | undefined;
  }

  interface ImageStyle extends WebViewStyle {
    borderBottomWidth?: DimensionValue | undefined;
    borderEndWidth?: DimensionValue | undefined;
    borderLeftWidth?: DimensionValue | undefined;
    borderRightWidth?: DimensionValue | undefined;
    borderStartWidth?: DimensionValue | undefined;
    borderTopWidth?: DimensionValue | undefined;
    borderWidth?: DimensionValue | undefined;
    bottom?: DimensionValue | undefined;
    boxSizing?: 'border-box' | 'content-box' | 'padding-box' | undefined;
    cursor?: CursorValue | undefined;
    display?: string | undefined;
    end?: DimensionValue | undefined;
    height?: DimensionValue | undefined;
    inset?: DimensionValue | undefined;
    insetBlock?: DimensionValue | undefined;
    insetBlockEnd?: DimensionValue | undefined;
    insetBlockStart?: DimensionValue | undefined;
    insetInline?: DimensionValue | undefined;
    insetInlineEnd?: DimensionValue | undefined;
    insetInlineStart?: DimensionValue | undefined;
    left?: DimensionValue | undefined;
    margin?: DimensionValue | undefined;
    marginBlock?: DimensionValue | undefined;
    marginBlockEnd?: DimensionValue | undefined;
    marginBlockStart?: DimensionValue | undefined;
    marginBottom?: DimensionValue | undefined;
    marginEnd?: DimensionValue | undefined;
    marginHorizontal?: DimensionValue | undefined;
    marginInline?: DimensionValue | undefined;
    marginInlineEnd?: DimensionValue | undefined;
    marginInlineStart?: DimensionValue | undefined;
    marginLeft?: DimensionValue | undefined;
    marginRight?: DimensionValue | undefined;
    marginStart?: DimensionValue | undefined;
    marginTop?: DimensionValue | undefined;
    marginVertical?: DimensionValue | undefined;
    maxHeight?: DimensionValue | undefined;
    maxWidth?: DimensionValue | undefined;
    minHeight?: DimensionValue | undefined;
    minWidth?: DimensionValue | undefined;
    outlineOffset?: NumberOrString | undefined;
    outlineStyle?: string | undefined;
    outlineWidth?: NumberOrString | undefined;
    overflow?: OverflowValue | undefined;
    padding?: DimensionValue | undefined;
    paddingBlock?: DimensionValue | undefined;
    paddingBlockEnd?: DimensionValue | undefined;
    paddingBlockStart?: DimensionValue | undefined;
    paddingBottom?: DimensionValue | undefined;
    paddingEnd?: DimensionValue | undefined;
    paddingHorizontal?: DimensionValue | undefined;
    paddingInline?: DimensionValue | undefined;
    paddingInlineEnd?: DimensionValue | undefined;
    paddingInlineStart?: DimensionValue | undefined;
    paddingLeft?: DimensionValue | undefined;
    paddingRight?: DimensionValue | undefined;
    paddingStart?: DimensionValue | undefined;
    paddingTop?: DimensionValue | undefined;
    paddingVertical?: DimensionValue | undefined;
    position?:
      'absolute' | 'fixed' | 'relative' | 'static' | 'sticky' | undefined;
    right?: DimensionValue | undefined;
    start?: DimensionValue | undefined;
    top?: DimensionValue | undefined;
    userSelect?: 'all' | 'auto' | 'contain' | 'none' | 'text' | undefined;
    width?: DimensionValue | undefined;
  }
}
