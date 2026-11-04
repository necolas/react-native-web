/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import AccessibilityUtil from '../AccessibilityUtil';
import StyleSheet, { type StyleSheetOptions } from '../../exports/StyleSheet';
import * as forwardedProps from '../../modules/forwardedProps';

const emptyObject: Object = {};
const uppercasePattern = /[A-Z]/g;

const hasOwnProperty: (this: Object, key: string) => boolean =
  Object.prototype.hasOwnProperty;

function toHyphenLower(match: string): string {
  return '-' + match.toLowerCase();
}
function hyphenateString(str: string): string {
  return str.replace(uppercasePattern, toHyphenLower);
}

const pointerEventsStyles: {
  readonly [string]: { readonly pointerEvents: string }
} = StyleSheet.create({
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

const ARIA_PROP = 1;
const REACT_NATIVE_ACCESSIBILITY_PROP = 2;
const OMITTED_PROP = 3;

// Props that need special handling. Other props are passed through as is.
const specialProps: Map<string, number> = new Map();

for (const prop of forwardedProps.ariaProps) {
  specialProps.set(prop, ARIA_PROP);
}
for (const prop of forwardedProps.reactNativeAccessibilityProps) {
  specialProps.set(prop, REACT_NATIVE_ACCESSIBILITY_PROP);
}

// Props that are not passed through. Keep in sync with the props destructured
// in createDOMProps.
for (const prop of [
  'dataSet',
  'disabled',
  'focusable',
  'id',
  'nativeID',
  'pointerEvents',
  'style',
  'tabIndex',
  'testID',

  'accessibilityActions',
  'onAccessibilityAction'
]) {
  specialProps.set(prop, OMITTED_PROP);
}

function setReactNativeAccessibilityProps(
  domProps: Object,
  elementType: unknown,
  role: ?string,
  props: Object
): void {
  const {
    accessibilityHint,
    accessibilityLabel,
    accessibilityLabelledBy,
    accessibilityLiveRegion
  } = props;

  const state = props.accessibilityState ?? emptyObject;
  const value = props.accessibilityValue ?? emptyObject;

  if (domProps['aria-busy'] == null && state.busy != null) {
    domProps['aria-busy'] = state.busy;
  }
  if (domProps['aria-checked'] == null && state.checked != null) {
    domProps['aria-checked'] = state.checked;
  }
  if (domProps['aria-description'] == null && accessibilityHint != null) {
    domProps['aria-description'] = accessibilityHint;
  }
  if (props['aria-disabled'] == null && state.disabled === true) {
    domProps['aria-disabled'] = true;
  }
  if (domProps['aria-expanded'] == null && state.expanded != null) {
    domProps['aria-expanded'] = state.expanded;
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
  if (domProps['aria-selected'] == null && state.selected != null) {
    domProps['aria-selected'] = state.selected;
  }
  if (domProps['aria-valuemax'] == null && value.max != null) {
    domProps['aria-valuemax'] = value.max;
  }
  if (domProps['aria-valuemin'] == null && value.min != null) {
    domProps['aria-valuemin'] = value.min;
  }
  if (domProps['aria-valuenow'] == null && value.now != null) {
    domProps['aria-valuenow'] = value.now;
  }
  if (domProps['aria-valuetext'] == null && value.text != null) {
    domProps['aria-valuetext'] = value.text;
  }

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
}

const createDOMProps = (
  elementType: unknown,
  props: ?Object,
  options?: ?Object
): Object => {
  if (!props) {
    props = emptyObject;
  }

  // Keep in sync with the OMITTED_PROP list
  const {
    dataSet,
    disabled,
    focusable,
    id,
    nativeID,
    pointerEvents,
    style,
    tabIndex,
    testID
  } = props;

  // A loop is used because object rest with this many keys is slow in V8
  const domProps: Object = {};
  let hasReactNativeAccessibilityProps = false;

  for (const prop in props) {
    if (hasOwnProperty.call(props, prop)) {
      const kind = specialProps.get(prop);

      if (kind == null) {
        domProps[prop] = props[prop];
      } else if (kind === ARIA_PROP) {
        const value = props[prop];

        if (prop === 'aria-disabled' || prop === 'aria-hidden') {
          // "false" is omitted, same as the React Native default
          if (value === true) {
            domProps[prop] = true;
          }
        } else if (value != null) {
          domProps[prop] = value;
        }
      } else if (kind === REACT_NATIVE_ACCESSIBILITY_PROP) {
        hasReactNativeAccessibilityProps = true;
      }
    }
  }

  const role = AccessibilityUtil.propsToAriaRole(props);

  // ACCESSIBILITY
  if (hasReactNativeAccessibilityProps) {
    setReactNativeAccessibilityProps(domProps, elementType, role, props);
  }

  // "dataSet" replaced with "data-*"
  if (dataSet != null) {
    for (const dataProp in dataSet) {
      if (hasOwnProperty.call(dataSet, dataProp)) {
        const dataName = hyphenateString(dataProp);
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
