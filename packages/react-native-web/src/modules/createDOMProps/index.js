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
    accessibilityActiveDescendant,
    'aria-atomic': ariaAtomic,
    accessibilityAtomic,
    'aria-autocomplete': ariaAutoComplete,
    accessibilityAutoComplete,
    'aria-busy': ariaBusy,
    accessibilityBusy,
    'aria-checked': ariaChecked,
    accessibilityChecked,
    'aria-colcount': ariaColumnCount,
    accessibilityColumnCount,
    'aria-colindex': ariaColumnIndex,
    accessibilityColumnIndex,
    'aria-colspan': ariaColumnSpan,
    accessibilityColumnSpan,
    'aria-controls': ariaControls,
    accessibilityControls,
    'aria-current': ariaCurrent,
    accessibilityCurrent,
    'aria-describedby': ariaDescribedBy,
    accessibilityDescribedBy,
    'aria-details': ariaDetails,
    accessibilityDetails,
    'aria-disabled': ariaDisabled,
    accessibilityDisabled,
    'aria-errormessage': ariaErrorMessage,
    accessibilityErrorMessage,
    'aria-expanded': ariaExpanded,
    accessibilityExpanded,
    'aria-flowto': ariaFlowTo,
    accessibilityFlowTo,
    'aria-haspopup': ariaHasPopup,
    accessibilityHasPopup,
    'aria-hidden': ariaHidden,
    accessibilityHidden,
    'aria-invalid': ariaInvalid,
    accessibilityInvalid,
    'aria-keyshortcuts': ariaKeyShortcuts,
    accessibilityKeyShortcuts,
    'aria-label': ariaLabel,
    accessibilityLabel,
    'aria-labelledby': ariaLabelledBy,
    accessibilityLabelledBy,
    'aria-level': ariaLevel,
    accessibilityLevel,
    'aria-live': ariaLive,
    accessibilityLiveRegion,
    'aria-modal': ariaModal,
    accessibilityModal,
    'aria-multiline': ariaMultiline,
    accessibilityMultiline,
    'aria-multiselectable': ariaMultiSelectable,
    accessibilityMultiSelectable,
    'aria-orientation': ariaOrientation,
    accessibilityOrientation,
    'aria-owns': ariaOwns,
    accessibilityOwns,
    'aria-placeholder': ariaPlaceholder,
    accessibilityPlaceholder,
    'aria-posinset': ariaPosInSet,
    accessibilityPosInSet,
    'aria-pressed': ariaPressed,
    accessibilityPressed,
    'aria-readonly': ariaReadOnly,
    accessibilityReadOnly,
    'aria-required': ariaRequired,
    accessibilityRequired,
    /* eslint-disable */
    role: ariaRole,
    accessibilityRole,
    /* eslint-enable */
    'aria-roledescription': ariaRoleDescription,
    accessibilityRoleDescription,
    'aria-rowcount': ariaRowCount,
    accessibilityRowCount,
    'aria-rowindex': ariaRowIndex,
    accessibilityRowIndex,
    'aria-rowspan': ariaRowSpan,
    accessibilityRowSpan,
    'aria-selected': ariaSelected,
    accessibilitySelected,
    'aria-setsize': ariaSetSize,
    accessibilitySetSize,
    'aria-sort': ariaSort,
    accessibilitySort,
    'aria-valuemax': ariaValueMax,
    accessibilityValueMax,
    'aria-valuemin': ariaValueMin,
    accessibilityValueMin,
    'aria-valuenow': ariaValueNow,
    accessibilityValueNow,
    'aria-valuetext': ariaValueText,
    accessibilityValueText,
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

  const disabled = ariaDisabled || accessibilityDisabled;

  const role = AccessibilityUtil.propsToAriaRole(props);

  // ACCESSIBILITY
  const _ariaActiveDescendant =
    ariaActiveDescendant != null
      ? ariaActiveDescendant
      : accessibilityActiveDescendant;
  if (_ariaActiveDescendant != null) {
    domProps['aria-activedescendant'] = _ariaActiveDescendant;
  }

  const _ariaAtomic =
    ariaAtomic != null ? ariaActiveDescendant : accessibilityAtomic;
  if (_ariaAtomic != null) {
    domProps['aria-atomic'] = _ariaAtomic;
  }

  const _ariaAutoComplete =
    ariaAutoComplete != null ? ariaAutoComplete : accessibilityAutoComplete;
  if (_ariaAutoComplete != null) {
    domProps['aria-autocomplete'] = _ariaAutoComplete;
  }

  const _ariaBusy = ariaBusy != null ? ariaBusy : accessibilityBusy;
  if (_ariaBusy != null) {
    domProps['aria-busy'] = _ariaBusy;
  }

  const _ariaChecked = ariaChecked != null ? ariaChecked : accessibilityChecked;
  if (_ariaChecked != null) {
    domProps['aria-checked'] = _ariaChecked;
  }

  const _ariaColumnCount =
    ariaColumnCount != null ? ariaColumnCount : accessibilityColumnCount;
  if (_ariaColumnCount != null) {
    domProps['aria-colcount'] = _ariaColumnCount;
  }

  const _ariaColumnIndex =
    ariaColumnIndex != null ? ariaColumnIndex : accessibilityColumnIndex;
  if (_ariaColumnIndex != null) {
    domProps['aria-colindex'] = _ariaColumnIndex;
  }

  const _ariaColumnSpan =
    ariaColumnSpan != null ? ariaColumnSpan : accessibilityColumnSpan;
  if (_ariaColumnSpan != null) {
    domProps['aria-colspan'] = _ariaColumnSpan;
  }

  const _ariaControls =
    ariaControls != null ? ariaControls : accessibilityControls;
  if (_ariaControls != null) {
    domProps['aria-controls'] = processIDRefList(_ariaControls);
  }

  const _ariaCurrent = ariaCurrent != null ? ariaCurrent : accessibilityCurrent;
  if (_ariaCurrent != null) {
    domProps['aria-current'] = _ariaCurrent;
  }

  const _ariaDescribedBy =
    ariaDescribedBy != null ? ariaDescribedBy : accessibilityDescribedBy;
  if (_ariaDescribedBy != null) {
    domProps['aria-describedby'] = processIDRefList(_ariaDescribedBy);
  }

  const _ariaDetails = ariaDetails != null ? ariaDetails : accessibilityDetails;
  if (_ariaDetails != null) {
    domProps['aria-details'] = _ariaDetails;
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

  const _ariaErrorMessage =
    ariaErrorMessage != null ? ariaErrorMessage : accessibilityErrorMessage;
  if (_ariaErrorMessage != null) {
    domProps['aria-errormessage'] = _ariaErrorMessage;
  }

  const _ariaExpanded =
    ariaExpanded != null ? ariaExpanded : accessibilityExpanded;
  if (_ariaExpanded != null) {
    domProps['aria-expanded'] = _ariaExpanded;
  }

  const _ariaFlowTo = ariaFlowTo != null ? ariaFlowTo : accessibilityFlowTo;
  if (_ariaFlowTo != null) {
    domProps['aria-flowto'] = processIDRefList(_ariaFlowTo);
  }

  const _ariaHasPopup =
    ariaHasPopup != null ? ariaHasPopup : accessibilityHasPopup;
  if (_ariaHasPopup != null) {
    domProps['aria-haspopup'] = _ariaHasPopup;
  }

  const _ariaHidden = ariaHidden != null ? ariaHidden : accessibilityHidden;
  if (_ariaHidden === true) {
    domProps['aria-hidden'] = _ariaHidden;
  }

  const _ariaInvalid = ariaInvalid != null ? ariaInvalid : accessibilityInvalid;
  if (_ariaInvalid != null) {
    domProps['aria-invalid'] = _ariaInvalid;
  }

  const _ariaKeyShortcuts =
    ariaKeyShortcuts != null ? ariaKeyShortcuts : accessibilityKeyShortcuts;
  if (_ariaKeyShortcuts != null) {
    domProps['aria-keyshortcuts'] = processIDRefList(_ariaKeyShortcuts);
  }

  const _ariaLabel = ariaLabel != null ? ariaLabel : accessibilityLabel;
  if (_ariaLabel != null) {
    domProps['aria-label'] = _ariaLabel;
  }

  const _ariaLabelledBy =
    ariaLabelledBy != null ? ariaLabelledBy : accessibilityLabelledBy;
  if (_ariaLabelledBy != null) {
    domProps['aria-labelledby'] = processIDRefList(_ariaLabelledBy);
  }

  const _ariaLevel = ariaLevel != null ? ariaLevel : accessibilityLevel;
  if (_ariaLevel != null) {
    domProps['aria-level'] = _ariaLevel;
  }

  const _ariaLive = ariaLive != null ? ariaLive : accessibilityLiveRegion;
  if (_ariaLive != null) {
    domProps['aria-live'] = _ariaLive === 'none' ? 'off' : _ariaLive;
  }

  const _ariaModal = ariaModal != null ? ariaModal : accessibilityModal;
  if (_ariaModal != null) {
    domProps['aria-modal'] = _ariaModal;
  }

  const _ariaMultiline =
    ariaMultiline != null ? ariaMultiline : accessibilityMultiline;
  if (_ariaMultiline != null) {
    domProps['aria-multiline'] = _ariaMultiline;
  }

  const _ariaMultiSelectable =
    ariaMultiSelectable != null
      ? ariaMultiSelectable
      : accessibilityMultiSelectable;
  if (_ariaMultiSelectable != null) {
    domProps['aria-multiselectable'] = _ariaMultiSelectable;
  }

  const _ariaOrientation =
    ariaOrientation != null ? ariaOrientation : accessibilityOrientation;
  if (_ariaOrientation != null) {
    domProps['aria-orientation'] = _ariaOrientation;
  }

  const _ariaOwns = ariaOwns != null ? ariaOwns : accessibilityOwns;
  if (_ariaOwns != null) {
    domProps['aria-owns'] = processIDRefList(_ariaOwns);
  }

  const _ariaPlaceholder =
    ariaPlaceholder != null ? ariaPlaceholder : accessibilityPlaceholder;
  if (_ariaPlaceholder != null) {
    domProps['aria-placeholder'] = _ariaPlaceholder;
  }

  const _ariaPosInSet =
    ariaPosInSet != null ? ariaPosInSet : accessibilityPosInSet;
  if (_ariaPosInSet != null) {
    domProps['aria-posinset'] = _ariaPosInSet;
  }

  const _ariaPressed = ariaPressed != null ? ariaPressed : accessibilityPressed;
  if (_ariaPressed != null) {
    domProps['aria-pressed'] = _ariaPressed;
  }

  const _ariaReadOnly =
    ariaReadOnly != null ? ariaReadOnly : accessibilityReadOnly;
  if (_ariaReadOnly != null) {
    domProps['aria-readonly'] = _ariaReadOnly;
    // Enhance with native semantics
    if (
      elementType === 'input' ||
      elementType === 'select' ||
      elementType === 'textarea'
    ) {
      domProps.readOnly = true;
    }
  }

  const _ariaRequired =
    ariaRequired != null ? ariaRequired : accessibilityRequired;
  if (_ariaRequired != null) {
    domProps['aria-required'] = _ariaRequired;
    // Enhance with native semantics
    if (
      elementType === 'input' ||
      elementType === 'select' ||
      elementType === 'textarea'
    ) {
      domProps.required = accessibilityRequired;
    }
  }

  if (role != null) {
    // 'presentation' synonym has wider browser support
    domProps['role'] = role === 'none' ? 'presentation' : role;
  }

  const _ariaRoleDescription =
    ariaRoleDescription != null
      ? ariaRoleDescription
      : accessibilityRoleDescription;
  if (_ariaRoleDescription != null) {
    domProps['aria-roledescription'] = _ariaRoleDescription;
  }

  const _ariaRowCount =
    ariaRowCount != null ? ariaRowCount : accessibilityRowCount;
  if (_ariaRowCount != null) {
    domProps['aria-rowcount'] = _ariaRowCount;
  }

  const _ariaRowIndex =
    ariaRowIndex != null ? ariaRowIndex : accessibilityRowIndex;
  if (_ariaRowIndex != null) {
    domProps['aria-rowindex'] = _ariaRowIndex;
  }

  const _ariaRowSpan = ariaRowSpan != null ? ariaRowSpan : accessibilityRowSpan;
  if (_ariaRowSpan != null) {
    domProps['aria-rowspan'] = _ariaRowSpan;
  }

  const _ariaSelected =
    ariaSelected != null ? ariaSelected : accessibilitySelected;
  if (_ariaSelected != null) {
    domProps['aria-selected'] = _ariaSelected;
  }

  const _ariaSetSize = ariaSetSize != null ? ariaSetSize : accessibilitySetSize;
  if (_ariaSetSize != null) {
    domProps['aria-setsize'] = _ariaSetSize;
  }

  const _ariaSort = ariaSort != null ? ariaSort : accessibilitySort;
  if (_ariaSort != null) {
    domProps['aria-sort'] = _ariaSort;
  }

  const _ariaValueMax =
    ariaValueMax != null ? ariaValueMax : accessibilityValueMax;
  if (_ariaValueMax != null) {
    domProps['aria-valuemax'] = _ariaValueMax;
  }

  const _ariaValueMin =
    ariaValueMin != null ? ariaValueMin : accessibilityValueMin;
  if (_ariaValueMin != null) {
    domProps['aria-valuemin'] = _ariaValueMin;
  }

  const _ariaValueNow =
    ariaValueNow != null ? ariaValueNow : accessibilityValueNow;
  if (_ariaValueNow != null) {
    domProps['aria-valuenow'] = _ariaValueNow;
  }

  const _ariaValueText =
    ariaValueText != null ? ariaValueText : accessibilityValueText;
  if (_ariaValueText != null) {
    domProps['aria-valuetext'] = _ariaValueText;
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
      if (focusable === false || accessibilityDisabled === true) {
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
  const _id = id != null ? id : nativeID;
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
