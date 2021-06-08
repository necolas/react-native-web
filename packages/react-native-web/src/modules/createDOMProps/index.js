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
const isArray = Array.isArray;

const uppercasePattern = /[A-Z]/g;
function toHyphenLower(match) {
  return '-' + match.toLowerCase();
}
function hyphenateString(str: string): string {
  return str.replace(uppercasePattern, toHyphenLower);
}
function processIDRefList(idRefList: string | Array<string>): string {
  return isArray(idRefList) ? idRefList.join(' ') : idRefList;
}

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

const createDOMProps = (elementType, props) => {
  if (!props) {
    props = emptyObject;
  }

  const {
    accessibilityActiveDescendant,
    accessibilityAtomic,
    accessibilityAutoComplete,
    accessibilityBusy,
    accessibilityChecked,
    accessibilityColumnCount,
    accessibilityColumnIndex,
    accessibilityColumnSpan,
    accessibilityControls,
    accessibilityCurrent,
    accessibilityDescribedBy,
    accessibilityDetails,
    accessibilityDisabled,
    accessibilityErrorMessage,
    accessibilityExpanded,
    accessibilityFlowTo,
    accessibilityHasPopup,
    accessibilityHidden,
    accessibilityInvalid,
    accessibilityKeyShortcuts,
    accessibilityLabel,
    accessibilityLabelledBy,
    accessibilityLevel,
    accessibilityLiveRegion,
    accessibilityModal,
    accessibilityMultiline,
    accessibilityMultiSelectable,
    accessibilityOrientation,
    accessibilityOwns,
    accessibilityPlaceholder,
    accessibilityPosInSet,
    accessibilityPressed,
    accessibilityReadOnly,
    accessibilityRequired,
    /* eslint-disable */
    accessibilityRole,
    /* eslint-enable */
    accessibilityRoleDescription,
    accessibilityRowCount,
    accessibilityRowIndex,
    accessibilityRowSpan,
    accessibilitySelected,
    accessibilitySetSize,
    accessibilitySort,
    accessibilityValueMax,
    accessibilityValueMin,
    accessibilityValueNow,
    accessibilityValueText,
    classList,
    dataSet,
    focusable,
    nativeID,
    pointerEvents,
    style: providedStyle,
    testID,
    // Deprecated
    accessible,
    accessibilityState,
    accessibilityValue,
    // Rest
    ...domProps
  } = props;

  const disabled =
    (accessibilityState != null && accessibilityState.disabled === true) || accessibilityDisabled;

  const role = AccessibilityUtil.propsToAriaRole(props);

  const isNativeInteractiveElement =
    role === 'link' ||
    elementType === 'a' ||
    elementType === 'button' ||
    elementType === 'input' ||
    elementType === 'select' ||
    elementType === 'textarea' ||
    domProps.contentEditable != null;

  // DEPRECATED
  if (accessibilityState != null) {
    for (const prop in accessibilityState) {
      const value = accessibilityState[prop];
      if (value != null) {
        if (prop === 'disabled' || prop === 'hidden') {
          if (value === true) {
            domProps[`aria-${prop}`] = value;
            // also set prop directly to pick up host elementType behaviour
            domProps[prop] = value;
          }
        } else {
          domProps[`aria-${prop}`] = value;
        }
      }
    }
  }
  if (accessibilityValue != null) {
    for (const prop in accessibilityValue) {
      const value = accessibilityValue[prop];
      if (value != null) {
        domProps[`aria-value${prop}`] = value;
      }
    }
  }

  // ACCESSIBILITY
  if (accessibilityActiveDescendant != null) {
    domProps['aria-activedescendant'] = accessibilityActiveDescendant;
  }
  if (accessibilityAtomic != null) {
    domProps['aria-atomic'] = accessibilityAtomic;
  }
  if (accessibilityAutoComplete != null) {
    domProps['aria-autocomplete'] = accessibilityAutoComplete;
  }
  if (accessibilityBusy != null) {
    domProps['aria-busy'] = accessibilityBusy;
  }
  if (accessibilityChecked != null) {
    domProps['aria-checked'] = accessibilityChecked;
  }
  if (accessibilityColumnCount != null) {
    domProps['aria-colcount'] = accessibilityColumnCount;
  }
  if (accessibilityColumnIndex != null) {
    domProps['aria-colindex'] = accessibilityColumnIndex;
  }
  if (accessibilityColumnSpan != null) {
    domProps['aria-colspan'] = accessibilityColumnSpan;
  }
  if (accessibilityControls != null) {
    domProps['aria-controls'] = processIDRefList(accessibilityControls);
  }
  if (accessibilityCurrent != null) {
    domProps['aria-current'] = accessibilityCurrent;
  }
  if (accessibilityDescribedBy != null) {
    domProps['aria-describedby'] = processIDRefList(accessibilityDescribedBy);
  }
  if (accessibilityDetails != null) {
    domProps['aria-details'] = accessibilityDetails;
  }
  if (disabled === true) {
    domProps['aria-disabled'] = true;
    // Enhance with native semantics
    if (
      elementType === 'button' ||
      elementType === 'form' ||
      elementType === 'input' ||
      elementType === 'select' ||
      elementType === 'textarea'
    ) {
      domProps.disabled = true;
    }
  }
  if (accessibilityErrorMessage != null) {
    domProps['aria-errormessage'] = accessibilityErrorMessage;
  }
  if (accessibilityExpanded != null) {
    domProps['aria-expanded'] = accessibilityExpanded;
  }
  if (accessibilityFlowTo != null) {
    domProps['aria-flowto'] = processIDRefList(accessibilityFlowTo);
  }
  if (accessibilityHasPopup != null) {
    domProps['aria-haspopup'] = accessibilityHasPopup;
  }
  if (accessibilityHidden === true) {
    domProps['aria-hidden'] = accessibilityHidden;
  }
  if (accessibilityInvalid != null) {
    domProps['aria-invalid'] = accessibilityInvalid;
  }
  if (accessibilityKeyShortcuts != null && Array.isArray(accessibilityKeyShortcuts)) {
    domProps['aria-keyshortcuts'] = accessibilityKeyShortcuts.join(' ');
  }
  if (accessibilityLabel != null) {
    domProps['aria-label'] = accessibilityLabel;
  }
  if (accessibilityLabelledBy != null) {
    domProps['aria-labelledby'] = processIDRefList(accessibilityLabelledBy);
  }
  if (accessibilityLevel != null) {
    domProps['aria-level'] = accessibilityLevel;
  }
  if (accessibilityLiveRegion != null) {
    domProps['aria-live'] = accessibilityLiveRegion === 'none' ? 'off' : accessibilityLiveRegion;
  }
  if (accessibilityModal != null) {
    domProps['aria-modal'] = accessibilityModal;
  }
  if (accessibilityMultiline != null) {
    domProps['aria-multiline'] = accessibilityMultiline;
  }
  if (accessibilityMultiSelectable != null) {
    domProps['aria-multiselectable'] = accessibilityMultiSelectable;
  }
  if (accessibilityOrientation != null) {
    domProps['aria-orientation'] = accessibilityOrientation;
  }
  if (accessibilityOwns != null) {
    domProps['aria-owns'] = processIDRefList(accessibilityOwns);
  }
  if (accessibilityPlaceholder != null) {
    domProps['aria-placeholder'] = accessibilityPlaceholder;
  }
  if (accessibilityPosInSet != null) {
    domProps['aria-posinset'] = accessibilityPosInSet;
  }
  if (accessibilityPressed != null) {
    domProps['aria-pressed'] = accessibilityPressed;
  }
  if (accessibilityReadOnly != null) {
    domProps['aria-readonly'] = accessibilityReadOnly;
    // Enhance with native semantics
    if (elementType === 'input' || elementType === 'select' || elementType === 'textarea') {
      domProps.readOnly = true;
    }
  }
  if (accessibilityRequired != null) {
    domProps['aria-required'] = accessibilityRequired;
    // Enhance with native semantics
    if (elementType === 'input' || elementType === 'select' || elementType === 'textarea') {
      domProps.required = true;
    }
  }
  if (role != null) {
    // 'presentation' synonym has wider browser support
    domProps['role'] = role === 'none' ? 'presentation' : role;
  }
  if (accessibilityRoleDescription != null) {
    domProps['aria-roledescription'] = accessibilityRoleDescription;
  }
  if (accessibilityRowCount != null) {
    domProps['aria-rowcount'] = accessibilityRowCount;
  }
  if (accessibilityRowIndex != null) {
    domProps['aria-rowindex'] = accessibilityRowIndex;
  }
  if (accessibilityRowSpan != null) {
    domProps['aria-rowspan'] = accessibilityRowSpan;
  }
  if (accessibilitySelected != null) {
    domProps['aria-selected'] = accessibilitySelected;
  }
  if (accessibilitySetSize != null) {
    domProps['aria-setsize'] = accessibilitySetSize;
  }
  if (accessibilitySort != null) {
    domProps['aria-sort'] = accessibilitySort;
  }
  if (accessibilityValueMax != null) {
    domProps['aria-valuemax'] = accessibilityValueMax;
  }
  if (accessibilityValueMin != null) {
    domProps['aria-valuemin'] = accessibilityValueMin;
  }
  if (accessibilityValueNow != null) {
    domProps['aria-valuenow'] = accessibilityValueNow;
  }
  if (accessibilityValueText != null) {
    domProps['aria-valuetext'] = accessibilityValueText;
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

  // FOCUS
  // "focusable" indicates that an element may be a keyboard tab-stop.
  const _focusable = focusable != null ? focusable : accessible;
  if (_focusable === false) {
    domProps.tabIndex = '-1';
  }
  if (
    // These native elements are focusable by default
    elementType === 'a' ||
    elementType === 'button' ||
    elementType === 'input' ||
    elementType === 'select' ||
    elementType === 'textarea'
  ) {
    if (_focusable === false || accessibilityDisabled === true) {
      domProps.tabIndex = '-1';
    }
  } else if (
    // These roles are made focusable by default
    role === 'button' ||
    role === 'checkbox' ||
    role === 'link' ||
    role === 'menuitem' ||
    role === 'radio' ||
    role === 'textbox' ||
    role === 'switch'
  ) {
    if (_focusable !== false) {
      domProps.tabIndex = '0';
    }
  } else {
    // Everything else must explicitly set the prop
    if (_focusable === true) {
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
    elementType === 'a' ||
    elementType === 'button' ||
    elementType === 'li' ||
    elementType === 'ul' ||
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
  // Automated test IDs
  if (testID != null) {
    domProps['data-testid'] = testID;
  }

  // Keyboard accessibility
  // Button-like roles should trigger 'onClick' if SPACE key is pressed.
  // Button-like roles should not trigger 'onClick' if they are disabled.
  if (
    isNativeInteractiveElement ||
    role === 'button' ||
    role === 'menuitem' ||
    (_focusable === true && !disabled)
  ) {
    const onClick = domProps.onClick;
    if (onClick != null) {
      if (disabled) {
        // Prevent click propagating if the element is disabled. See #1757
        domProps.onClick = function (e) {
          e.stopPropagation();
        };
      } else if (!isNativeInteractiveElement) {
        // For native elements that are focusable but don't dispatch 'click' events
        // for keyboards.
        const onKeyDown = domProps.onKeyDown;
        domProps.onKeyDown = function (e) {
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
