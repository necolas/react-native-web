import React, { Component } from 'react';
import PickerDropDown from './PickerDropDown';
import PickerDialog from './PickerDialog';
import PickerItem from './PickerItem';
import { PICKER_PROPTYPES } from './proptypes';
import {
  MODE_DIALOG,
  MODE_DROPDOWN
} from './constants';

class Picker extends Component {
  static MODE_DIALOG = MODE_DIALOG;

  static MODE_DROPDOWN = MODE_DROPDOWN;

  static defaultProps = {
    mode: MODE_DIALOG
  };

  static propTypes = PICKER_PROPTYPES;

  render() {
    const { mode } = this.props;
    if (mode === MODE_DIALOG) {
      return (<PickerDialog {...this.props} >{this.props.children}</PickerDialog>);
    } else if (mode === MODE_DROPDOWN) {
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

