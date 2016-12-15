import React, { Component, PropTypes } from 'react';
import ColorPropType from '../../propTypes/ColorPropType';
import StyleSheetPropType from '../../propTypes/StyleSheetPropType';
import TextStylePropTypes from '../Text/TextStylePropTypes';
import View from '../View';
import ViewStylePropTypes from '../View/ViewStylePropTypes';
import PickerDropDown from './PickerDropDown';
import PickerDialog from './PickerDialog';
import PickerItem from './PickerItem';

var itemStylePropType = StyleSheetPropType(TextStylePropTypes);

var pickerStyleType = StyleSheetPropType({
  ...ViewStylePropTypes,
  color: ColorPropType,
});

var MODE_DIALOG = 'dialog';
var MODE_DROPDOWN = 'dropdown';

class Picker extends Component {
  static MODE_DIALOG = MODE_DIALOG;

  static MODE_DROPDOWN = MODE_DROPDOWN;

  static defaultProps = {
    mode: MODE_DIALOG,
  };

  static propTypes = {
    ...View.propTypes,
    style: pickerStyleType,
    /**
     * Value matching value of one of the items. Can be a string or an integer.
     */
    selectedValue: React.PropTypes.any,
    /**
     * Callback for when an item is selected. This is called with the following parameters:
     *   - `itemValue`: the `value` prop of the item that was selected
     *   - `itemPosition`: the index of the selected item in this picker
     */
    onValueChange: React.PropTypes.func,
    /**
     * If set to false, the picker will be disabled, i.e. the user will not be able to make a
     * selection.
     */
    enabled: React.PropTypes.bool,
    /**
     * On Android, specifies how to display the selection items when the user taps on the picker:
     *
     *   - 'dialog': Show a modal dialog. This is the default.
     *   - 'dropdown': Shows a dropdown anchored to the picker view
     *
     */
    mode: React.PropTypes.oneOf([MODE_DIALOG, MODE_DROPDOWN]),
    /**
     * Style to apply to each of the item labels.
     */
    itemStyle: itemStylePropType,
    /**
     * Prompt string for this picker
     */
    prompt: React.PropTypes.string,
    /**
     * Used to locate this view in end-to-end tests.
     */
    testID: React.PropTypes.string,
  };

  render() {
    const { mode } = this.props;
    if(mode === MODE_DIALOG){
      return (<PickerDialog {...this.props} >{this.props.children}</PickerDialog>);
    }else if(mode === MODE_DROPDOWN){
      return (<PickerDropDown {...this.props} >{this.props.children}</PickerDropDown>);
    }
    return null;
  }
}

/**
 * Individual selectable item in a Picker.
 */
Picker.Item = PickerItem;

export default Picker;

