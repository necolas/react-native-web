/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
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
type idRef = string;
type idRefList = idRef | Array<idRef>;

export type AccessibilityProps = {|
  accessibilityActiveDescendant?: ?idRef,
  accessibilityAtomic?: ?boolean,
  accessibilityAutoComplete?: ?('none' | 'list' | 'inline' | 'both'),
  accessibilityBusy?: ?boolean,
  accessibilityChecked?: ?(boolean | 'mixed'),
  accessibilityColumnCount?: ?number,
  accessibilityColumnIndex?: ?number,
  accessibilityColumnSpan?: ?number,
  accessibilityControls?: ?idRefList,
  accessibilityCurrent?: ?(
    | boolean
    | 'page'
    | 'step'
    | 'location'
    | 'date'
    | 'time'
  ),
  accessibilityDescribedBy?: ?idRefList,
  accessibilityDetails?: ?idRef,
  accessibilityDisabled?: ?boolean,
  accessibilityErrorMessage?: ?idRef,
  accessibilityExpanded?: ?boolean,
  accessibilityFlowTo?: ?idRefList,
  accessibilityHasPopup?: ?(
    | 'dialog'
    | 'grid'
    | 'listbox'
    | 'menu'
    | 'tree'
    | false
  ),
  accessibilityHidden?: ?boolean,
  accessibilityInvalid?: ?boolean,
  accessibilityKeyShortcuts?: ?Array<string>,
  accessibilityLabel?: ?string,
  accessibilityLabelledBy?: ?idRefList,
  accessibilityLevel?: ?number,
  accessibilityLiveRegion?: ?('assertive' | 'none' | 'polite'),
  accessibilityModal?: ?boolean,
  accessibilityMultiline?: ?boolean,
  accessibilityMultiSelectable?: ?boolean,
  accessibilityOrientation?: ?('horizontal' | 'vertical'),
  accessibilityOwns?: ?idRefList,
  accessibilityPlaceholder?: ?string,
  accessibilityPosInSet?: ?number,
  accessibilityPressed?: ?(boolean | 'mixed'),
  accessibilityReadOnly?: ?boolean,
  accessibilityRequired?: ?boolean,
  accessibilityRole?: ?string,
  accessibilityRoleDescription?: ?string,
  accessibilityRowCount?: ?number,
  accessibilityRowIndex?: ?number,
  accessibilityRowSpan?: ?number,
  accessibilitySelected?: ?boolean,
  accessibilitySetSize?: ?number,
  accessibilitySort?: ?('ascending' | 'descending' | 'none' | 'other'),
  accessibilityValueMax?: ?number,
  accessibilityValueMin?: ?number,
  accessibilityValueNow?: ?number,
  accessibilityValueText?: ?string,
  dataSet?: { ... },
  focusable?: ?boolean,
  nativeID?: ?string
|};

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
  ...AccessibilityProps,
  children?: ?any,
  dir?: 'ltr' | 'rtl',
  focusable?: ?boolean,
  lang?: string,
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
  onResponderGrant?: (e: any) => void | boolean,
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
  hrefAttrs?: ?{ download?: ?boolean, rel?: ?string, target?: ?string }
};
