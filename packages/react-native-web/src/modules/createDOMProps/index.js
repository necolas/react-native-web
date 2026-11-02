/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import AccessibilityUtil from '../AccessibilityUtil';
import StyleSheet from '../../exports/StyleSheet';

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

const createDOMProps = (
  elementType: unknown,
  props: ?Object,
  options?: ?Object
): Object => {
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
    accessibilityHint,
    accessibilityState,
    accessibilityValue,
    // Not supported on web
    /* eslint-disable */
    accessibilityActions,
    onAccessibilityAction,
    /* eslint-enable */
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

  const _ariaBusy = ariaBusy ?? accessibilityState?.busy;
  if (_ariaBusy != null) {
    domProps['aria-busy'] = _ariaBusy;
  }

  const _ariaChecked = ariaChecked ?? accessibilityState?.checked;
  if (_ariaChecked != null) {
    domProps['aria-checked'] = _ariaChecked;
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
    domProps['aria-controls'] = ariaControls;
  }

  if (ariaCurrent != null) {
    domProps['aria-current'] = ariaCurrent;
  }

  if (ariaDescribedBy != null) {
    domProps['aria-describedby'] = ariaDescribedBy;
  }

  if (accessibilityHint != null) {
    domProps['aria-description'] = accessibilityHint;
  }

  if (ariaDetails != null) {
    domProps['aria-details'] = ariaDetails;
  }

  const _ariaDisabled = ariaDisabled ?? accessibilityState?.disabled;
  if (_ariaDisabled === true) {
    domProps['aria-disabled'] = true;
    // Enhance with native semantics
    if (
      elementType === 'button' ||
      elementType === 'fieldset' ||
      elementType === 'input' ||
      elementType === 'optgroup' ||
      elementType === 'option' ||
      elementType === 'select' ||
      elementType === 'textarea'
    ) {
      domProps.disabled = true;
    }
  }

  if (ariaErrorMessage != null) {
    domProps['aria-errormessage'] = ariaErrorMessage;
  }

  const _ariaExpanded = ariaExpanded ?? accessibilityState?.expanded;
  if (_ariaExpanded != null) {
    domProps['aria-expanded'] = _ariaExpanded;
  }

  if (ariaFlowTo != null) {
    domProps['aria-flowto'] = ariaFlowTo;
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
    domProps['aria-keyshortcuts'] = ariaKeyShortcuts;
  }

  const _ariaLabel = ariaLabel ?? accessibilityLabel;
  if (_ariaLabel != null) {
    domProps['aria-label'] = _ariaLabel;
  }

  const _ariaLabelledBy = ariaLabelledBy ?? accessibilityLabelledBy;
  if (_ariaLabelledBy != null) {
    // "accessibilityLabelledBy" accepts an array, same as React Native
    domProps['aria-labelledby'] = Array.isArray(_ariaLabelledBy)
      ? _ariaLabelledBy.join(' ')
      : _ariaLabelledBy;
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
    domProps['aria-owns'] = ariaOwns;
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
  }

  if (ariaRequired != null) {
    domProps['aria-required'] = ariaRequired;
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

  const _ariaSelected = ariaSelected ?? accessibilityState?.selected;
  if (_ariaSelected != null) {
    domProps['aria-selected'] = _ariaSelected;
  }

  if (ariaSetSize != null) {
    domProps['aria-setsize'] = ariaSetSize;
  }

  if (ariaSort != null) {
    domProps['aria-sort'] = ariaSort;
  }

  const _ariaValueMax = ariaValueMax ?? accessibilityValue?.max;
  if (_ariaValueMax != null) {
    domProps['aria-valuemax'] = _ariaValueMax;
  }

  const _ariaValueMin = ariaValueMin ?? accessibilityValue?.min;
  if (_ariaValueMin != null) {
    domProps['aria-valuemin'] = _ariaValueMin;
  }

  const _ariaValueNow = ariaValueNow ?? accessibilityValue?.now;
  if (_ariaValueNow != null) {
    domProps['aria-valuenow'] = _ariaValueNow;
  }

  const _ariaValueText = ariaValueText ?? accessibilityValue?.text;
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
