import React from 'react';
import ColorPropType from '../../propTypes/ColorPropType';
import StyleSheetPropType from '../../propTypes/StyleSheetPropType';
import TextStylePropTypes from '../Text/TextStylePropTypes';
import ViewStylePropTypes from '../View/ViewStylePropTypes';
import View from '../View';
import {
  MODE_DIALOG,
  MODE_DROPDOWN
} from './constants';

const itemStylePropType = StyleSheetPropType(TextStylePropTypes);

const pickerStyleType = StyleSheetPropType({
  ...ViewStylePropTypes,
  color: ColorPropType
});

export const PICKER_PROPTYPES = {
  ...View.propTypes,
  /**
   * If set to false, the picker will be disabled, i.e. the user will not be able to make a
   * selection.
   */
  enabled: React.PropTypes.bool,
  /**
   * Style to apply to each of the item labels.
   */
  itemStyle: itemStylePropType,
  /**
   * On Android, specifies how to display the selection items when the user taps on the picker:
   *
   *   - 'dialog': Show a modal dialog. This is the default.
   *   - 'dropdown': Shows a dropdown anchored to the picker view
   *
   */
  mode: React.PropTypes.oneOf([ MODE_DIALOG, MODE_DROPDOWN ]),
  /**
   * Callback for when an item is selected. This is called with the following parameters:
   *   - `itemValue`: the `value` prop of the item that was selected
   *   - `itemPosition`: the index of the selected item in this picker
   */
  onValueChange: React.PropTypes.func,
  /**
   * Prompt string for this picker
   */
  prompt: React.PropTypes.string,
  /**
   * Value matching value of one of the items. Can be a string or an integer.
   */
  selectedValue: React.PropTypes.any,
  style: pickerStyleType,
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID: React.PropTypes.string
};

export const PICKER_ITEM_PROPTYPES = {
  /**
   * Color of this item's text.
   */
  color: ColorPropType,
  /**
   * Text to display for this item.
   */
  label: React.PropTypes.string.isRequired,
  /**
   * Used to locate the item in end-to-end tests.
   */
  testID: React.PropTypes.string,
  /**
   * The value to be passed to picker's `onValueChange` callback when
   * this item is selected. Can be a string or an integer.
   */
  value: React.PropTypes.any
};
