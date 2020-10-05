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
const hasOwnProperty = Object.prototype.hasOwnProperty;

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

const createDOMProps = (component, props) => {
  if (!props) {
    props = emptyObject;
  }

  const {
    accessibilityLabel,
    accessibilityLiveRegion,
    accessibilityState,
    accessibilityValue,
    accessible,
    classList,
    dataSet,
    disabled: providedDisabled,
    importantForAccessibility,
    nativeID,
    pointerEvents,
    style: providedStyle,
    testID,
    /* eslint-disable */
    accessibilityRole,
    /* eslint-enable */
    ...domProps
  } = props;

  const disabled =
    (accessibilityState != null && accessibilityState.disabled === true) || providedDisabled;
  const role = AccessibilityUtil.propsToAriaRole(props);
  const isNativeInteractiveElement =
    role === 'link' ||
    component === 'a' ||
    component === 'button' ||
    component === 'input' ||
    component === 'select' ||
    component === 'textarea' ||
    domProps.contentEditable != null;

  // dataSet
  if (dataSet != null) {
    for (const prop in dataSet) {
      if (hasOwnProperty.call(dataSet, prop)) {
        const value = dataSet[prop];
        if (value != null) {
          domProps[`data-${prop}`] = value;
        }
      }
    }
  }

  // accessibilityLabel
  if (accessibilityLabel != null) {
    domProps['aria-label'] = accessibilityLabel;
  }

  // accessibilityLiveRegion
  if (accessibilityLiveRegion != null) {
    domProps['aria-live'] = accessibilityLiveRegion === 'none' ? 'off' : accessibilityLiveRegion;
  }

  // accessibilityRole
  if (role != null) {
    domProps.role = role;
  }

  // accessibilityState
  if (accessibilityState != null) {
    for (const prop in accessibilityState) {
      const value = accessibilityState[prop];
      if (value != null) {
        if (prop === 'disabled' || prop === 'hidden') {
          if (value === true) {
            domProps[`aria-${prop}`] = value;
            // also set prop directly to pick up host component behaviour
            domProps[prop] = value;
          }
        } else {
          domProps[`aria-${prop}`] = value;
        }
      }
    }
  }

  // accessibilityValue
  if (accessibilityValue != null) {
    for (const prop in accessibilityValue) {
      const value = accessibilityValue[prop];
      if (value != null) {
        domProps[`aria-value${prop}`] = value;
      }
    }
  }

  // legacy fallbacks
  if (importantForAccessibility === 'no-hide-descendants') {
    domProps['aria-hidden'] = true;
  }
  if (disabled === true) {
    domProps['aria-disabled'] = true;
    domProps.disabled = true;
  }

  // FOCUS
  // Assume that 'link' is focusable by default (uses <a>).
  // Assume that 'button' is not (uses <div role='button'>) but must be treated as such.
  const focusable =
    !disabled &&
    importantForAccessibility !== 'no' &&
    importantForAccessibility !== 'no-hide-descendants';
  if (isNativeInteractiveElement) {
    if (accessible === false || !focusable) {
      domProps.tabIndex = '-1';
    } else {
      domProps['data-focusable'] = true;
    }
  } else if (role === 'button' || role === 'menuitem' || role === 'textbox') {
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
    providedStyle
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
  const finalClassList = [needsReset && classes.reset, needsCursor && classes.cursor, classList];

  // Resolve styles
  const { className, style } = styleResolver.resolve(reactNativeStyle, finalClassList);

  if (className != null && className !== '') {
    domProps.className = className;
  }

  if (style) {
    domProps.style = style;
  }

  // OTHER
  // Native element ID
  if (nativeID != null) {
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
  if (testID != null) {
    domProps['data-testid'] = testID;
  }

  // Keyboard accessibility
  // Button-like roles should trigger 'onClick' if SPACE key is pressed.
  // Button-like roles should not trigger 'onClick' if they are disabled.
  if (domProps['data-focusable']) {
    const onClick = domProps.onClick;
    if (onClick != null) {
      if (disabled) {
        // Prevent click propagating if the element is disabled. See #1757
        domProps.onClick = function(e) {
          e.stopPropagation();
        };
      } else if (!isNativeInteractiveElement) {
        // For native elements that are focusable but don't dispatch 'click' events
        // for keyboards.
        const onKeyDown = domProps.onKeyDown;
        domProps.onKeyDown = function(e) {
          const { key, repeat } = e;
          const isSpacebarKey = key === ' ' || key === 'Spacebar';
          const isButtonRole = role === 'button' || role === 'menuitem';
          if (onKeyDown != null) {
            onKeyDown(e);
          }
          if (!repeat && key === 'Enter') {
            onClick(e);
          } else if (isSpacebarKey && isButtonRole) {
            if (!repeat) {
              onClick(e);
            }
            // Prevent spacebar scrolling the window
            e.preventDefault();
          }
        };
      }
    }
  }

  return domProps;
};

export default createDOMProps;
