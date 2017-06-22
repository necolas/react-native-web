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

const styles = StyleSheet.create({
  buttonReset: {
    appearance: 'none',
    backgroundColor: 'transparent',
    color: 'inherit',
    font: 'inherit',
    textAlign: 'inherit'
  },
  linkReset: {
    backgroundColor: 'transparent',
    color: 'inherit',
    textDecorationLine: 'none'
  },
  listReset: {
    listStyle: 'none'
  }
});

const pointerEventStyles = StyleSheet.create({
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

const resolver = style => StyleRegistry.resolve(style);

const createDOMProps = (rnProps, resolveStyle) => {
  if (!resolveStyle) {
    resolveStyle = resolver;
  }

  const props = rnProps || emptyObject;
  const {
    accessibilityLabel,
    accessibilityLiveRegion,
    accessible,
    importantForAccessibility,
    pointerEvents,
    style: rnStyle,
    testID,
    type,
    /* eslint-disable */
    accessibilityComponentType,
    accessibilityRole,
    accessibilityTraits,
    /* eslint-enable */
    ...domProps
  } = props;

  const role = AccessibilityUtil.propsToAriaRole(props);
  const pointerEventStyle = pointerEvents !== undefined && pointerEventStyles[pointerEvents];
  const reactNativeStyle = [
    (role === 'button' && styles.buttonReset) ||
      (role === 'link' && styles.linkReset) ||
      (role === 'list' && styles.listReset),
    rnStyle,
    pointerEventStyle
  ];
  const { className, style } = resolveStyle(reactNativeStyle) || emptyObject;

  if (accessible === true) {
    domProps.tabIndex = AccessibilityUtil.propsToTabIndex(props);
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
  if (importantForAccessibility === 'no-hide-descendants') {
    domProps['aria-hidden'] = true;
  }
  if (role && role.constructor === String) {
    domProps.role = role;
    if (role === 'button') {
      domProps.type = 'button';
    } else if (role === 'link' && domProps.target === '_blank') {
      domProps.rel = `${domProps.rel || ''} noopener noreferrer`;
    }
  }
  if (style) {
    domProps.style = style;
  }
  if (testID && testID.constructor === String) {
    domProps['data-testid'] = testID;
  }
  if (type && type.constructor === String) {
    domProps.type = type;
  }

  return domProps;
};

export default createDOMProps;
