/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import AccessibilityUtil from '../AccessibilityUtil';
import StyleSheet from '../../exports/StyleSheet';
import styleResolver from '../../exports/StyleSheet/styleResolver';

const emptyObject = {};

const resetStyles = StyleSheet.create({
  ariaButton: {
    cursor: 'pointer'
  },
  button: {
    appearance: 'none',
    backgroundColor: 'transparent',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontStyle: 'inherit',
    fontVariant: ['inherit'],
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    textAlign: 'inherit'
  },
  heading: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontStyle: 'inherit',
    fontVariant: ['inherit'],
    fontWeight: 'inherit',
    lineHeight: 'inherit'
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

const defaultStyleResolver = style => styleResolver.resolve(style);

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

  const isDisabled = AccessibilityUtil.isDisabled(props);
  const role = AccessibilityUtil.propsToAriaRole(props);
  const tabIndex = AccessibilityUtil.propsToTabIndex(props);
  const reactNativeStyle = [
    component === 'a' && resetStyles.link,
    component === 'button' && resetStyles.button,
    role === 'heading' && resetStyles.heading,
    component === 'ul' && resetStyles.list,
    role === 'button' && !isDisabled && resetStyles.ariaButton,
    pointerEvents && pointerEventsStyles[pointerEvents],
    providedStyle,
    placeholderTextColor && { placeholderTextColor }
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
