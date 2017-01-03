import React, { Component } from 'react';

import createDOMElement from '../../modules/createDOMElement';
import PickerItem from './PickerItem';
import { PICKER_PROPTYPES } from './proptypes';

class PickerDropDown extends Component {
  static propTypes = PICKER_PROPTYPES;

  childHasColor() {
    for (const item in this.props.children) {
      if (item && item.props && item.props.color) {
        return true;
      }
    }
    return false;
  }

  render() {
    const {
      children = [],
      itemStyle,
      testID,
      style,
      selectedValue = '',
      onValueChange,
      enabled = true,
      prompt,
      ...rest
    } = this.props;
    let fixedStyle = {};
    const base = { 'WebkitAppearance': 'none', 'MozAppearance': 'none' };
    if (style) {
      fixedStyle = [ base, style ];
    }
    const component = this.childHasColor() ? 'div' : 'select';
    if (this.childHasColor()) {
      return null;
    }
    const change = {};
    if (onValueChange) {
      change.onChange = (e) => onValueChange(e.target.value, e.target.selectedIndex);
    }
    const props = {
      ...rest,
      ...change,
      'data-testID': testID,
      disabled: !enabled,
      style: fixedStyle,
      title: prompt,
      value: selectedValue,
      children: children.map((item, index) => {
        return (
          <PickerDropDown.Item
            key={`${testID}${index}`}
            {...item.props}
            {...itemStyle}
          />);
      })
    };
    return createDOMElement(component, props);
  }
}

PickerDropDown.Item = class extends PickerItem {
  render() {
    const { label, value, color, testID, ...rest } = this.props;
    if (color) {
      return null;
    }
    return (
      <option {...rest} data-testID={testID} value={ value } >
        { label }
      </option>
    );
  }
};

export default PickerDropDown;
