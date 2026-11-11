/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ElementType } from 'react';

import AccessibilityUtil from '../AccessibilityUtil';
import StyleSheet, { type StyleSheetOptions } from '../../exports/StyleSheet';

const emptyObject: Record<string, unknown> = {};
const uppercasePattern = /[A-Z]/g;

const hasOwnProperty: (
  this: Readonly<Record<string, unknown>>,
  key: string
) => boolean = Object.prototype.hasOwnProperty;

function toHyphenLower(match: string): string {
  return '-' + match.toLowerCase();
}
function hyphenateString(str: string): string {
  return str.replace(uppercasePattern, toHyphenLower);
}

const pointerEventsStyles: Readonly<
  Record<string, { readonly pointerEvents: string }>
> = StyleSheet.create({
  auto: {
    pointerEvents: 'auto'
  },
  'box-none': {
    pointerEvents: 'box-none'
  },
  'box-only': {
    pointerEvents: 'box-only'
  },
  none: {
    pointerEvents: 'none'
  }
});

const createDOMProps = (
  elementType: ElementType,
  props: ?Record<string, unknown>,
  options?: ?StyleSheetOptions
): Record<string, unknown> => {
  if (!props) {
    props = emptyObject;
  }

  const {
    'aria-disabled': ariaDisabled,
    'aria-hidden': ariaHidden,

    dataSet,
    disabled,
    focusable,
    id,
    nativeID,
    pointerEvents,
    style,
    tabIndex,
    testID,

    accessibilityHint,
    accessibilityLabel,
    accessibilityLabelledBy,
    accessibilityLiveRegion,
    accessibilityState: _accessibilityState,
    accessibilityValue: _accessibilityValue,

    /* eslint-disable no-unused-vars */
    accessibilityActions,
    accessibilityRole,
    onAccessibilityAction,
    role: _role,
    /* eslint-enable no-unused-vars */

    ...domProps
  } = props;

  const accessibilityState = _accessibilityState ?? emptyObject;
  const accessibilityValue = _accessibilityValue ?? emptyObject;

  // ACCESSIBILITY
  if (domProps['aria-busy'] == null && accessibilityState.busy != null) {
    domProps['aria-busy'] = accessibilityState.busy;
  }
  if (domProps['aria-checked'] == null && accessibilityState.checked != null) {
    domProps['aria-checked'] = accessibilityState.checked;
  }
  if (domProps['aria-description'] == null && accessibilityHint != null) {
    domProps['aria-description'] = accessibilityHint;
  }
  if (
    domProps['aria-expanded'] == null &&
    accessibilityState.expanded != null
  ) {
    domProps['aria-expanded'] = accessibilityState.expanded;
  }
  if (domProps['aria-label'] == null && accessibilityLabel != null) {
    domProps['aria-label'] = accessibilityLabel;
  }
  if (domProps['aria-labelledby'] == null && accessibilityLabelledBy != null) {
    // "accessibilityLabelledBy" accepts an array, same as React Native
    domProps['aria-labelledby'] = Array.isArray(accessibilityLabelledBy)
      ? accessibilityLabelledBy.join(' ')
      : accessibilityLabelledBy;
  }
  if (domProps['aria-live'] == null && accessibilityLiveRegion != null) {
    domProps['aria-live'] =
      accessibilityLiveRegion === 'none' ? 'off' : accessibilityLiveRegion;
  }
  if (
    domProps['aria-selected'] == null &&
    accessibilityState.selected != null
  ) {
    domProps['aria-selected'] = accessibilityState.selected;
  }
  if (domProps['aria-valuemax'] == null && accessibilityValue.max != null) {
    domProps['aria-valuemax'] = accessibilityValue.max;
  }
  if (domProps['aria-valuemin'] == null && accessibilityValue.min != null) {
    domProps['aria-valuemin'] = accessibilityValue.min;
  }
  if (domProps['aria-valuenow'] == null && accessibilityValue.now != null) {
    domProps['aria-valuenow'] = accessibilityValue.now;
  }
  if (domProps['aria-valuetext'] == null && accessibilityValue.text != null) {
    domProps['aria-valuetext'] = accessibilityValue.text;
  }

  // "false" is omitted, same as the React Native default
  if (
    ariaDisabled === true ||
    (ariaDisabled == null && accessibilityState.disabled === true)
  ) {
    domProps['aria-disabled'] = true;
  }
  if (ariaHidden === true) {
    domProps['aria-hidden'] = true;
  }

  const role = AccessibilityUtil.propsToAriaRole(props);

  if (role != null) {
    // h1-h6 already have the heading role. An explicit role="heading" on
    // them fails heading audits such as axe "page-has-heading-one".
    const isNativeHeading =
      role === 'heading' &&
      (elementType === 'h1' ||
        elementType === 'h2' ||
        elementType === 'h3' ||
        elementType === 'h4' ||
        elementType === 'h5' ||
        elementType === 'h6');

    if (!isNativeHeading) {
      // 'presentation' synonym has wider browser support
      domProps['role'] = role === 'none' ? 'presentation' : role;
    }
  }

  // "dataSet" replaced with "data-*"
  if (dataSet != null) {
    // $FlowFixMe[invalid-in-rhs] dataSet is not checked to be an object at runtime
    for (const dataProp in dataSet) {
      // $FlowFixMe[incompatible-type] dataSet is not checked to be an object at runtime
      // $FlowFixMe[invalid-this-arg] dataSet is not checked to be an object at runtime
      if (hasOwnProperty.call(dataSet, dataProp)) {
        const dataName = hyphenateString(dataProp);
        // $FlowFixMe[incompatible-use] dataSet is not checked to be an object at runtime
        const dataValue = dataSet[dataProp];
        if (dataValue != null) {
          domProps[`data-${dataName}`] = dataValue;
        }
      }
    }
  }

  // DISABLED
  if (typeof elementType !== 'string') {
    if (disabled != null) {
      domProps.disabled = disabled;
    }
  } else if (
    disabled === true &&
    (elementType === 'button' ||
      elementType === 'fieldset' ||
      elementType === 'input' ||
      elementType === 'optgroup' ||
      elementType === 'option' ||
      elementType === 'select' ||
      elementType === 'textarea')
  ) {
    domProps.disabled = true;
  }

  // FOCUS
  if (
    tabIndex === 0 ||
    tabIndex === '0' ||
    tabIndex === -1 ||
    tabIndex === '-1'
  ) {
    domProps.tabIndex = tabIndex;
  } else if (focusable === false) {
    domProps.tabIndex = '-1';
  } else if (
    // These native elements are keyboard focusable by default
    elementType !== 'a' &&
    elementType !== 'button' &&
    elementType !== 'input' &&
    elementType !== 'select' &&
    elementType !== 'textarea'
  ) {
    if (
      focusable === true ||
      // These roles are made keyboard focusable by default
      role === 'button' ||
      role === 'checkbox' ||
      role === 'link' ||
      role === 'radio' ||
      role === 'textbox' ||
      role === 'switch'
    ) {
      domProps.tabIndex = '0';
    }
  }

  // Resolve styles
  const styleSheetOptions: StyleSheetOptions = {
    writingDirection: 'ltr',
    ...options
  };

  let [className, inlineStyle] = StyleSheet(
    // $FlowFixMe[incompatible-type] pointerEvents is not checked to be a string at runtime
    [style, pointerEvents && pointerEventsStyles[pointerEvents]],
    styleSheetOptions
  );

  // Inline "pointerEvents" can't style children (needed by "box-none" and
  // "box-only"), so resolve again with the class. Rare, so cheap.
  const inlinePointerEvents = inlineStyle?.pointerEvents;

  if (
    inlinePointerEvents === 'box-none' ||
    inlinePointerEvents === 'box-only'
  ) {
    [className, inlineStyle] = StyleSheet(
      [style, pointerEventsStyles[inlinePointerEvents]],
      styleSheetOptions
    );
  }

  if (className) {
    domProps.className = className;
  }
  if (inlineStyle) {
    domProps.style = inlineStyle;
  }

  // OTHER
  // Native element ID
  const _id = id ?? nativeID;
  if (_id != null) {
    domProps.id = _id;
  }
  // Automated test IDs
  if (testID != null) {
    domProps['data-testid'] = testID;
  }

  if (domProps.type == null && elementType === 'button') {
    domProps.type = 'button';
  }
  return domProps;
};

export default createDOMProps;
