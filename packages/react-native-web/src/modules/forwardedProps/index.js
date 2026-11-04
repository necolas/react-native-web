/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

export const defaultProps = [
  'children',
  'dataSet',
  'dir',
  'id',
  'ref',
  'suppressHydrationWarning',
  'tabIndex',
  'testID',
  'title',
  // @deprecated
  'focusable',
  'nativeID'
];

export const accessibilityProps = [
  'accessibilityHint',
  'accessibilityLabel',
  'accessibilityLabelledBy',
  'accessibilityLiveRegion',
  'accessibilityRole',
  'accessibilityState',
  'accessibilityValue',
  'aria-activedescendant',
  'aria-atomic',
  'aria-autocomplete',
  'aria-busy',
  'aria-checked',
  'aria-colcount',
  'aria-colindex',
  'aria-colspan',
  'aria-controls',
  'aria-current',
  'aria-describedby',
  'aria-details',
  'aria-disabled',
  'aria-errormessage',
  'aria-expanded',
  'aria-flowto',
  'aria-haspopup',
  'aria-hidden',
  'aria-invalid',
  'aria-keyshortcuts',
  'aria-label',
  'aria-labelledby',
  'aria-level',
  'aria-live',
  'aria-modal',
  'aria-multiline',
  'aria-multiselectable',
  'aria-orientation',
  'aria-owns',
  'aria-placeholder',
  'aria-posinset',
  'aria-pressed',
  'aria-readonly',
  'aria-required',
  'aria-roledescription',
  'aria-rowcount',
  'aria-rowindex',
  'aria-rowspan',
  'aria-selected',
  'aria-setsize',
  'aria-sort',
  'aria-valuemax',
  'aria-valuemin',
  'aria-valuenow',
  'aria-valuetext',
  'inert',
  'role'
];

export const clickProps = [
  'onAuxClick',
  'onClick',
  'onContextMenu',
  'onGotPointerCapture',
  'onLostPointerCapture',
  'onPointerCancel',
  'onPointerDown',
  'onPointerEnter',
  'onPointerLeave',
  'onPointerMove',
  'onPointerOut',
  'onPointerOver',
  'onPointerUp'
];

export const focusProps = ['onBlur', 'onFocus'];

export const keyboardProps = [
  'onKeyDown',
  'onKeyDownCapture',
  'onKeyUp',
  'onKeyUpCapture'
];

export const mouseProps = [
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp'
];

export const touchProps = [
  'onTouchCancel',
  'onTouchCancelCapture',
  'onTouchEnd',
  'onTouchEndCapture',
  'onTouchMove',
  'onTouchMoveCapture',
  'onTouchStart',
  'onTouchStartCapture'
];

export const styleProps = ['style'];
