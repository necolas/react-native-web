/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import AccessibilityUtil from '../AccessibilityUtil';
import StyleSheet from '../../exports/StyleSheet';

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

const createDOMProps = (elementType, props, options) => {
  if (!props) {
    props = emptyObject;
  }

  const {
    'aria-activedescendant': ariaActiveDescendant,
    'aria-atomic': ariaAtomic,
    'aria-autocomplete': ariaAutoComplete,
    'aria-busy': ariaBusy,
    'aria-checked': ariaChecked,
    'aria-colcount': ariaColumnCount,
    'aria-colindex': ariaColumnIndex,
    'aria-colspan': ariaColumnSpan,
    'aria-controls': ariaControls,
    'aria-current': ariaCurrent,
    'aria-describedby': ariaDescribedBy,
    'aria-details': ariaDetails,
    'aria-disabled': ariaDisabled,
    'aria-errormessage': ariaErrorMessage,
    'aria-expanded': ariaExpanded,
    'aria-flowto': ariaFlowTo,
    'aria-haspopup': ariaHasPopup,
    'aria-hidden': ariaHidden,
    'aria-invalid': ariaInvalid,
    'aria-keyshortcuts': ariaKeyShortcuts,
    'aria-label': ariaLabel,
    accessibilityLabel,
    'aria-labelledby': ariaLabelledBy,
    accessibilityLabelledBy,
    'aria-level': ariaLevel,
    'aria-live': ariaLive,
    accessibilityLiveRegion,
    'aria-modal': ariaModal,
    'aria-multiline': ariaMultiline,
    'aria-multiselectable': ariaMultiSelectable,
    'aria-orientation': ariaOrientation,
    'aria-owns': ariaOwns,
    'aria-placeholder': ariaPlaceholder,
    'aria-posinset': ariaPosInSet,
    'aria-pressed': ariaPressed,
    'aria-readonly': ariaReadOnly,
    'aria-required': ariaRequired,
    /* eslint-disable */
    role: ariaRole,
    accessibilityRole,
    /* eslint-enable */
    'aria-roledescription': ariaRoleDescription,
    'aria-rowcount': ariaRowCount,
    'aria-rowindex': ariaRowIndex,
    'aria-rowspan': ariaRowSpan,
    'aria-selected': ariaSelected,
    'aria-setsize': ariaSetSize,
    'aria-sort': ariaSort,
    'aria-valuemax': ariaValueMax,
    'aria-valuemin': ariaValueMin,
    'aria-valuenow': ariaValueNow,
    'aria-valuetext': ariaValueText,
    dataSet,
    focusable,
    id,
    nativeID,
    pointerEvents,
    style,
    tabIndex,
    testID,
    // Rest
    ...domProps
  } = props;

  const role = AccessibilityUtil.propsToAriaRole(props);

  // ACCESSIBILITY
  if (ariaActiveDescendant != null) {
    domProps['aria-activedescendant'] = ariaActiveDescendant;
  }

  if (ariaAtomic != null) {
    domProps['aria-atomic'] = ariaAtomic;
  }

  if (ariaAutoComplete != null) {
    domProps['aria-autocomplete'] = ariaAutoComplete;
  }

  if (ariaBusy != null) {
    domProps['aria-busy'] = ariaBusy;
  }

  if (ariaChecked != null) {
    domProps['aria-checked'] = ariaChecked;
  }

  if (ariaColumnCount != null) {
    domProps['aria-colcount'] = ariaColumnCount;
  }

  if (ariaColumnIndex != null) {
    domProps['aria-colindex'] = ariaColumnIndex;
  }

  if (ariaColumnSpan != null) {
    domProps['aria-colspan'] = ariaColumnSpan;
  }

  if (ariaControls != null) {
    domProps['aria-controls'] = processIDRefList(ariaControls);
  }

  if (ariaCurrent != null) {
    domProps['aria-current'] = ariaCurrent;
  }

  if (ariaDescribedBy != null) {
    domProps['aria-describedby'] = processIDRefList(ariaDescribedBy);
  }

  if (ariaDetails != null) {
    domProps['aria-details'] = ariaDetails;
  }

  if (ariaDisabled === true) {
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

  if (ariaErrorMessage != null) {
    domProps['aria-errormessage'] = ariaErrorMessage;
  }

  if (ariaExpanded != null) {
    domProps['aria-expanded'] = ariaExpanded;
  }

  if (ariaFlowTo != null) {
    domProps['aria-flowto'] = processIDRefList(ariaFlowTo);
  }

  if (ariaHasPopup != null) {
    domProps['aria-haspopup'] = ariaHasPopup;
  }

  if (ariaHidden === true) {
    domProps['aria-hidden'] = ariaHidden;
  }

  if (ariaInvalid != null) {
    domProps['aria-invalid'] = ariaInvalid;
  }

  if (ariaKeyShortcuts != null) {
    domProps['aria-keyshortcuts'] = processIDRefList(ariaKeyShortcuts);
  }

  const _ariaLabel = ariaLabel ?? accessibilityLabel;
  if (_ariaLabel != null) {
    domProps['aria-label'] = _ariaLabel;
  }

  const _ariaLabelledBy = ariaLabelledBy ?? accessibilityLabelledBy;
  if (_ariaLabelledBy != null) {
    domProps['aria-labelledby'] = processIDRefList(_ariaLabelledBy);
  }

  if (ariaLevel != null) {
    domProps['aria-level'] = ariaLevel;
  }

  const _ariaLive = ariaLive ?? accessibilityLiveRegion;
  if (_ariaLive != null) {
    domProps['aria-live'] = _ariaLive === 'none' ? 'off' : _ariaLive;
  }

  if (ariaModal != null) {
    domProps['aria-modal'] = ariaModal;
  }

  if (ariaMultiline != null) {
    domProps['aria-multiline'] = ariaMultiline;
  }

  if (ariaMultiSelectable != null) {
    domProps['aria-multiselectable'] = ariaMultiSelectable;
  }

  if (ariaOrientation != null) {
    domProps['aria-orientation'] = ariaOrientation;
  }

  if (ariaOwns != null) {
    domProps['aria-owns'] = processIDRefList(ariaOwns);
  }

  if (ariaPlaceholder != null) {
    domProps['aria-placeholder'] = ariaPlaceholder;
  }

  if (ariaPosInSet != null) {
    domProps['aria-posinset'] = ariaPosInSet;
  }

  if (ariaPressed != null) {
    domProps['aria-pressed'] = ariaPressed;
  }

  if (ariaReadOnly != null) {
    domProps['aria-readonly'] = ariaReadOnly;
    // Enhance with native semantics
    if (
      elementType === 'input' ||
      elementType === 'select' ||
      elementType === 'textarea'
    ) {
      domProps.readOnly = true;
    }
  }

  if (ariaRequired != null) {
    domProps['aria-required'] = ariaRequired;
    // Enhance with native semantics
    if (
      elementType === 'input' ||
      elementType === 'select' ||
      elementType === 'textarea'
    ) {
      domProps.required = ariaRequired;
    }
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

  if (ariaRoleDescription != null) {
    domProps['aria-roledescription'] = ariaRoleDescription;
  }

  if (ariaRowCount != null) {
    domProps['aria-rowcount'] = ariaRowCount;
  }

  if (ariaRowIndex != null) {
    domProps['aria-rowindex'] = ariaRowIndex;
  }

  if (ariaRowSpan != null) {
    domProps['aria-rowspan'] = ariaRowSpan;
  }

  if (ariaSelected != null) {
    domProps['aria-selected'] = ariaSelected;
  }

  if (ariaSetSize != null) {
    domProps['aria-setsize'] = ariaSetSize;
  }

  if (ariaSort != null) {
    domProps['aria-sort'] = ariaSort;
  }

  if (ariaValueMax != null) {
    domProps['aria-valuemax'] = ariaValueMax;
  }

  if (ariaValueMin != null) {
    domProps['aria-valuemin'] = ariaValueMin;
  }

  if (ariaValueNow != null) {
    domProps['aria-valuenow'] = ariaValueNow;
  }

  if (ariaValueText != null) {
    domProps['aria-valuetext'] = ariaValueText;
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
  if (
    tabIndex === 0 ||
    tabIndex === '0' ||
    tabIndex === -1 ||
    tabIndex === '-1'
  ) {
    domProps.tabIndex = tabIndex;
  } else {
    // "focusable" indicates that an element may be a keyboard tab-stop.
    if (focusable === false) {
      domProps.tabIndex = '-1';
    }
    if (
      // These native elements are keyboard focusable by default
      elementType === 'a' ||
      elementType === 'button' ||
      elementType === 'input' ||
      elementType === 'select' ||
      elementType === 'textarea'
    ) {
      if (focusable === false || ariaDisabled === true) {
        domProps.tabIndex = '-1';
      }
    } else if (
      // These roles are made keyboard focusable by default
      role === 'button' ||
      role === 'checkbox' ||
      role === 'link' ||
      role === 'radio' ||
      role === 'textbox' ||
      role === 'switch'
    ) {
      if (focusable !== false) {
        domProps.tabIndex = '0';
      }
    } else {
      // Everything else must explicitly set the prop
      if (focusable === true) {
        domProps.tabIndex = '0';
      }
    }
  }

  // Resolve styles
  const [className, inlineStyle] = StyleSheet(
    [style, pointerEvents && pointerEventsStyles[pointerEvents]],
    {
      writingDirection: 'ltr',
      ...options
    }
  );
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
