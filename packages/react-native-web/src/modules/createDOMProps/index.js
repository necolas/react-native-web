/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import AccessibilityUtil from '../AccessibilityUtil';
import css from '../../exports/StyleSheet/css';
import StyleSheet from '../../exports/StyleSheet';
import styleResolver from '../../exports/StyleSheet/styleResolver';
import { STYLE_GROUPS } from '../../exports/StyleSheet/constants';

const emptyObject = {};

// Reset styles for heading, link, and list DOM elements
const classes = css.create(
  {
    reset: {
      backgroundColor: 'transparent',
      color: 'inherit',
      font: 'inherit',
      listStyle: 'none',
      margin: 0,
      textAlign: 'inherit',
      textDecoration: 'none'
    },
    cursor: {
      cursor: 'pointer'
    }
  },
  STYLE_GROUPS.classicReset
);

const pointerEventsStyles = StyleSheet.create({
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

const defaultStyleResolver = (style, classList) => styleResolver.resolve(style, classList);

const createDOMProps = (component, props, styleResolver) => {
  if (!styleResolver) {
    styleResolver = defaultStyleResolver;
  }

  if (!props) {
    props = emptyObject;
  }

  const {
    accessibilityLabel,
    accessibilityLiveRegion,
    accessibilityStates,
    classList,
    className: deprecatedClassName,
    importantForAccessibility,
    nativeID,
    placeholderTextColor,
    pointerEvents,
    style: providedStyle,
    testID,
    /* eslint-disable */
    accessible,
    accessibilityComponentType,
    accessibilityRole,
    accessibilityTraits,
    /* eslint-enable */
    ...domProps
  } = props;

  const disabled = AccessibilityUtil.isDisabled(props);
  const role = AccessibilityUtil.propsToAriaRole(props);

  // GENERAL ACCESSIBILITY
  if (importantForAccessibility === 'no-hide-descendants') {
    domProps['aria-hidden'] = true;
  }
  if (accessibilityLabel && accessibilityLabel.constructor === String) {
    domProps['aria-label'] = accessibilityLabel;
  }
  if (accessibilityLiveRegion && accessibilityLiveRegion.constructor === String) {
    domProps['aria-live'] = accessibilityLiveRegion === 'none' ? 'off' : accessibilityLiveRegion;
  }
  if (Array.isArray(accessibilityStates)) {
    for (let i = 0; i < accessibilityStates.length; i += 1) {
      domProps[`aria-${accessibilityStates[i]}`] = true;
    }
  }
  if (role && role.constructor === String) {
    domProps.role = role;
  }

  // DISABLED
  if (disabled) {
    domProps['aria-disabled'] = disabled;
    domProps.disabled = disabled;
  }

  // FOCUS
  // Assume that 'link' is focusable by default (uses <a>).
  // Assume that 'button' is not (uses <div role='button'>) but must be treated as such.
  const focusable =
    !disabled &&
    importantForAccessibility !== 'no' &&
    importantForAccessibility !== 'no-hide-descendants';
  if (
    role === 'link' ||
    component === 'a' ||
    component === 'button' ||
    component === 'input' ||
    component === 'select' ||
    component === 'textarea'
  ) {
    if (accessible === false || !focusable) {
      domProps.tabIndex = '-1';
    } else {
      domProps['data-focusable'] = true;
    }
  } else if (AccessibilityUtil.buttonLikeRoles[role] || role === 'textbox') {
    if (accessible !== false && focusable) {
      domProps['data-focusable'] = true;
      domProps.tabIndex = '0';
    }
  } else {
    if (accessible === true && focusable) {
      domProps['data-focusable'] = true;
      domProps.tabIndex = '0';
    }
  }

  // STYLE
  const reactNativeStyle = StyleSheet.compose(
    pointerEvents && pointerEventsStyles[pointerEvents],
    StyleSheet.compose(
      providedStyle,
      placeholderTextColor && { placeholderTextColor }
    )
  );

  // Additional style resets for interactive elements
  const needsCursor = (role === 'button' || role === 'link') && !disabled;
  const needsReset =
    component === 'a' ||
    component === 'button' ||
    component === 'li' ||
    component === 'ul' ||
    role === 'heading';
  // Classic CSS styles
  const finalClassList = [
    deprecatedClassName,
    needsReset && classes.reset,
    needsCursor && classes.cursor,
    classList
  ];

  // Resolve styles
  const { className, style } = styleResolver(reactNativeStyle, finalClassList);

  if (className != null && className !== '') {
    domProps.className = className;
  }

  if (style) {
    domProps.style = style;
  }

  // OTHER
  // Native element ID
  if (nativeID && nativeID.constructor === String) {
    domProps.id = nativeID;
  }

  // Link security
  // https://mathiasbynens.github.io/rel-noopener/
  // Note: using "noreferrer" doesn't impact referrer tracking for https
  // transfers (i.e., from https to https).
  if (component === 'a' && domProps.target === '_blank') {
    domProps.rel = `${domProps.rel || ''} noopener noreferrer`;
  }
  // Automated test IDs
  if (testID && testID.constructor === String) {
    domProps['data-testid'] = testID;
  }

  return domProps;
};

export default createDOMProps;
