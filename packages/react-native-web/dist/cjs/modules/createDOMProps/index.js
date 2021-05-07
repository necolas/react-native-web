"use strict";

exports.__esModule = true;
exports.default = void 0;

var _AccessibilityUtil = _interopRequireDefault(require("../AccessibilityUtil"));

var _css = _interopRequireDefault(require("../../exports/StyleSheet/css"));

var _StyleSheet = _interopRequireDefault(require("../../exports/StyleSheet"));

var _styleResolver = _interopRequireDefault(require("../../exports/StyleSheet/styleResolver"));

var _constants = require("../../exports/StyleSheet/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var emptyObject = {};
var hasOwnProperty = Object.prototype.hasOwnProperty;
var uppercasePattern = /[A-Z]/g;

function toHyphenLower(match) {
  return '-' + match.toLowerCase();
}

function hyphenateString(str) {
  return str.replace(uppercasePattern, toHyphenLower);
} // Reset styles for heading, link, and list DOM elements


var classes = _css.default.create({
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
}, _constants.STYLE_GROUPS.classicReset);

var pointerEventsStyles = _StyleSheet.default.create({
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

var createDOMProps = function createDOMProps(elementType, props) {
  if (!props) {
    props = emptyObject;
  }

  var _props = props,
      accessibilityActiveDescendant = _props.accessibilityActiveDescendant,
      accessibilityAtomic = _props.accessibilityAtomic,
      accessibilityAutoComplete = _props.accessibilityAutoComplete,
      accessibilityBusy = _props.accessibilityBusy,
      accessibilityChecked = _props.accessibilityChecked,
      accessibilityColumnCount = _props.accessibilityColumnCount,
      accessibilityColumnIndex = _props.accessibilityColumnIndex,
      accessibilityColumnSpan = _props.accessibilityColumnSpan,
      accessibilityControls = _props.accessibilityControls,
      accessibilityCurrent = _props.accessibilityCurrent,
      accessibilityDescribedBy = _props.accessibilityDescribedBy,
      accessibilityDetails = _props.accessibilityDetails,
      accessibilityDisabled = _props.accessibilityDisabled,
      accessibilityErrorMessage = _props.accessibilityErrorMessage,
      accessibilityExpanded = _props.accessibilityExpanded,
      accessibilityFlowTo = _props.accessibilityFlowTo,
      accessibilityHasPopup = _props.accessibilityHasPopup,
      accessibilityHidden = _props.accessibilityHidden,
      accessibilityInvalid = _props.accessibilityInvalid,
      accessibilityKeyShortcuts = _props.accessibilityKeyShortcuts,
      accessibilityLabel = _props.accessibilityLabel,
      accessibilityLabelledBy = _props.accessibilityLabelledBy,
      accessibilityLevel = _props.accessibilityLevel,
      accessibilityLiveRegion = _props.accessibilityLiveRegion,
      accessibilityModal = _props.accessibilityModal,
      accessibilityMultiline = _props.accessibilityMultiline,
      accessibilityMultiSelectable = _props.accessibilityMultiSelectable,
      accessibilityOrientation = _props.accessibilityOrientation,
      accessibilityOwns = _props.accessibilityOwns,
      accessibilityPlaceholder = _props.accessibilityPlaceholder,
      accessibilityPosInSet = _props.accessibilityPosInSet,
      accessibilityPressed = _props.accessibilityPressed,
      accessibilityReadOnly = _props.accessibilityReadOnly,
      accessibilityRequired = _props.accessibilityRequired,
      accessibilityRole = _props.accessibilityRole,
      accessibilityRoleDescription = _props.accessibilityRoleDescription,
      accessibilityRowCount = _props.accessibilityRowCount,
      accessibilityRowIndex = _props.accessibilityRowIndex,
      accessibilityRowSpan = _props.accessibilityRowSpan,
      accessibilitySelected = _props.accessibilitySelected,
      accessibilitySetSize = _props.accessibilitySetSize,
      accessibilitySort = _props.accessibilitySort,
      accessibilityValueMax = _props.accessibilityValueMax,
      accessibilityValueMin = _props.accessibilityValueMin,
      accessibilityValueNow = _props.accessibilityValueNow,
      accessibilityValueText = _props.accessibilityValueText,
      classList = _props.classList,
      dataSet = _props.dataSet,
      focusable = _props.focusable,
      nativeID = _props.nativeID,
      pointerEvents = _props.pointerEvents,
      providedStyle = _props.style,
      testID = _props.testID,
      accessible = _props.accessible,
      accessibilityState = _props.accessibilityState,
      accessibilityValue = _props.accessibilityValue,
      domProps = _objectWithoutPropertiesLoose(_props, ["accessibilityActiveDescendant", "accessibilityAtomic", "accessibilityAutoComplete", "accessibilityBusy", "accessibilityChecked", "accessibilityColumnCount", "accessibilityColumnIndex", "accessibilityColumnSpan", "accessibilityControls", "accessibilityCurrent", "accessibilityDescribedBy", "accessibilityDetails", "accessibilityDisabled", "accessibilityErrorMessage", "accessibilityExpanded", "accessibilityFlowTo", "accessibilityHasPopup", "accessibilityHidden", "accessibilityInvalid", "accessibilityKeyShortcuts", "accessibilityLabel", "accessibilityLabelledBy", "accessibilityLevel", "accessibilityLiveRegion", "accessibilityModal", "accessibilityMultiline", "accessibilityMultiSelectable", "accessibilityOrientation", "accessibilityOwns", "accessibilityPlaceholder", "accessibilityPosInSet", "accessibilityPressed", "accessibilityReadOnly", "accessibilityRequired", "accessibilityRole", "accessibilityRoleDescription", "accessibilityRowCount", "accessibilityRowIndex", "accessibilityRowSpan", "accessibilitySelected", "accessibilitySetSize", "accessibilitySort", "accessibilityValueMax", "accessibilityValueMin", "accessibilityValueNow", "accessibilityValueText", "classList", "dataSet", "focusable", "nativeID", "pointerEvents", "style", "testID", "accessible", "accessibilityState", "accessibilityValue"]);

  var disabled = accessibilityState != null && accessibilityState.disabled === true || accessibilityDisabled;

  var role = _AccessibilityUtil.default.propsToAriaRole(props);

  var isNativeInteractiveElement = role === 'link' || elementType === 'a' || elementType === 'button' || elementType === 'input' || elementType === 'select' || elementType === 'textarea' || domProps.contentEditable != null; // DEPRECATED

  if (accessibilityState != null) {
    for (var prop in accessibilityState) {
      var value = accessibilityState[prop];

      if (value != null) {
        if (prop === 'disabled' || prop === 'hidden') {
          if (value === true) {
            domProps["aria-" + prop] = value; // also set prop directly to pick up host elementType behaviour

            domProps[prop] = value;
          }
        } else {
          domProps["aria-" + prop] = value;
        }
      }
    }
  }

  if (accessibilityValue != null) {
    for (var _prop in accessibilityValue) {
      var _value = accessibilityValue[_prop];

      if (_value != null) {
        domProps["aria-value" + _prop] = _value;
      }
    }
  } // ACCESSIBILITY


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
    domProps['aria-controls'] = accessibilityControls;
  }

  if (accessibilityCurrent != null) {
    domProps['aria-current'] = accessibilityCurrent;
  }

  if (accessibilityDescribedBy != null) {
    domProps['aria-describedby'] = accessibilityDescribedBy;
  }

  if (accessibilityDetails != null) {
    domProps['aria-details'] = accessibilityDetails;
  }

  if (disabled === true) {
    domProps['aria-disabled'] = true; // Enhance with native semantics

    if (elementType === 'button' || elementType === 'form' || elementType === 'input' || elementType === 'select' || elementType === 'textarea') {
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
    domProps['aria-flowto'] = accessibilityFlowTo;
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
    domProps['aria-labelledby'] = accessibilityLabelledBy;
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
    domProps['aria-owns'] = accessibilityOwns;
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
    domProps['aria-readonly'] = accessibilityReadOnly; // Enhance with native semantics

    if (elementType === 'input' || elementType === 'select' || elementType === 'textarea') {
      domProps.readOnly = true;
    }
  }

  if (accessibilityRequired != null) {
    domProps['aria-required'] = accessibilityRequired; // Enhance with native semantics

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
  } // "dataSet" replaced with "data-*"


  if (dataSet != null) {
    for (var dataProp in dataSet) {
      if (hasOwnProperty.call(dataSet, dataProp)) {
        var dataName = hyphenateString(dataProp);
        var dataValue = dataSet[dataProp];

        if (dataValue != null) {
          domProps["data-" + dataName] = dataValue;
        }
      }
    }
  } // FOCUS
  // "focusable" indicates that an element may be a keyboard tab-stop.


  var _focusable = focusable != null ? focusable : accessible;

  if ( // These native elements are focusable by default
  elementType === 'a' || elementType === 'button' || elementType === 'input' || elementType === 'select' || elementType === 'textarea') {
    if (_focusable === false || accessibilityDisabled === true) {
      domProps.tabIndex = '-1';
    }
  } else if ( // These roles are made focusable by default
  role === 'button' || role === 'checkbox' || role === 'link' || role === 'menuitem' || role === 'radio' || role === 'textbox' || role === 'switch') {
    if (_focusable !== false) {
      domProps.tabIndex = '0';
    }
  } else {
    // Everything else must explicitly set the prop
    if (_focusable === true) {
      domProps.tabIndex = '0';
    }
  } // STYLE


  var reactNativeStyle = _StyleSheet.default.compose(pointerEvents && pointerEventsStyles[pointerEvents], providedStyle); // Additional style resets for interactive elements


  var needsCursor = (role === 'button' || role === 'link') && !disabled;
  var needsReset = elementType === 'a' || elementType === 'button' || elementType === 'li' || elementType === 'ul' || role === 'heading'; // Classic CSS styles

  var finalClassList = [needsReset && classes.reset, needsCursor && classes.cursor, classList]; // Resolve styles

  var _styleResolver$resolv = _styleResolver.default.resolve(reactNativeStyle, finalClassList),
      className = _styleResolver$resolv.className,
      style = _styleResolver$resolv.style;

  if (className != null && className !== '') {
    domProps.className = className;
  }

  if (style) {
    domProps.style = style;
  } // OTHER
  // Native element ID


  if (nativeID != null) {
    domProps.id = nativeID;
  } // Automated test IDs


  if (testID != null) {
    domProps['data-testid'] = testID;
  } // Keyboard accessibility
  // Button-like roles should trigger 'onClick' if SPACE key is pressed.
  // Button-like roles should not trigger 'onClick' if they are disabled.


  if (isNativeInteractiveElement || role === 'button' || role === 'menuitem' || _focusable === true && !disabled) {
    var onClick = domProps.onClick;

    if (onClick != null) {
      if (disabled) {
        // Prevent click propagating if the element is disabled. See #1757
        domProps.onClick = function (e) {
          e.stopPropagation();
        };
      } else if (!isNativeInteractiveElement) {
        // For native elements that are focusable but don't dispatch 'click' events
        // for keyboards.
        var onKeyDown = domProps.onKeyDown;

        domProps.onKeyDown = function (e) {
          var key = e.key,
              repeat = e.repeat;
          var isSpacebarKey = key === ' ' || key === 'Spacebar';
          var isButtonRole = role === 'button' || role === 'menuitem';

          if (onKeyDown != null) {
            onKeyDown(e);
          }

          if (!repeat && key === 'Enter') {
            onClick(e);
          } else if (isSpacebarKey && isButtonRole) {
            if (!repeat) {
              onClick(e);
            } // Prevent spacebar scrolling the window


            e.preventDefault();
          }
        };
      }
    }
  }

  return domProps;
};

var _default = createDOMProps;
exports.default = _default;
module.exports = exports.default;