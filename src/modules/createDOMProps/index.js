/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import AccessibilityUtil from '../AccessibilityUtil';
import StyleSheet from '../../apis/StyleSheet';
import StyleRegistry from '../../apis/StyleSheet/registry';

const emptyObject = {};

const resetStyles = StyleSheet.create({
  ariaButton: {
    cursor: 'pointer'
  },
  button: {
    appearance: 'none',
    backgroundColor: 'transparent',
    color: 'inherit',
    font: 'inherit',
    textAlign: 'inherit'
  },
  heading: {
    font: 'inherit'
  },
  link: {
    backgroundColor: 'transparent',
    color: 'inherit',
    textDecorationLine: 'none'
  },
  list: {
    listStyle: 'none'
  }
});

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

const defaultStyleResolver = style => StyleRegistry.resolve(style);

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
    importantForAccessibility,
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

  const isDisabled = AccessibilityUtil.isDisabled(props);
  const role = AccessibilityUtil.propsToAriaRole(props);
  const tabIndex = AccessibilityUtil.propsToTabIndex(props);
  const reactNativeStyle = [
    component === 'a' && resetStyles.link,
    component === 'button' && resetStyles.button,
    role === 'heading' && resetStyles.heading,
    component === 'ul' && resetStyles.list,
    role === 'button' && !isDisabled && resetStyles.ariaButton,
    providedStyle,
    pointerEvents && pointerEventsStyles[pointerEvents]
  ];
  const { className, style } = styleResolver(reactNativeStyle);

  if (isDisabled) {
    domProps['aria-disabled'] = true;
  }
  if (importantForAccessibility === 'no-hide-descendants') {
    domProps['aria-hidden'] = true;
  }
  if (accessibilityLabel && accessibilityLabel.constructor === String) {
    domProps['aria-label'] = accessibilityLabel;
  }
  if (accessibilityLiveRegion && accessibilityLiveRegion.constructor === String) {
    domProps['aria-live'] = accessibilityLiveRegion === 'none' ? 'off' : accessibilityLiveRegion;
  }
  if (className && className.constructor === String) {
    domProps.className = domProps.className ? `${domProps.className} ${className}` : className;
  }
  if (component === 'a' && domProps.target === '_blank') {
    domProps.rel = `${domProps.rel || ''} noopener noreferrer`;
  }
  if (role && role.constructor === String && role !== 'label') {
    domProps.role = role;
  }
  if (style) {
    domProps.style = style;
  }
  if (tabIndex) {
    domProps.tabIndex = tabIndex;
  }
  if (testID && testID.constructor === String) {
    domProps['data-testid'] = testID;
  }

  return domProps;
};

export default createDOMProps;
