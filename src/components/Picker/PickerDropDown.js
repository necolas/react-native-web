import React, { Component } from 'react';
import PickerItem from './PickerItem';

class PickerDropDown extends Component {
  childHasColor() {
    for (const item in this.props.children) {
      if (item && item.props && item.props.color) {
        return true;
      }
    }
    return false;
  }

  render() {
    const { children = [], itemStyle, testID, style, selectedValue, onValueChange, enabled = true, prompt, ...rest } = this.props;
    if (this.childHasColor()) {
      return null;
    }
    const change = {};
    if(onValueChange){
      change.onChange = e => onValueChange(e.target.value, e.target.selectedIndex)
    }
    return (
      <select
        {...rest}
        title={prompt}
        data-testID={testID}
        style={style}
        disabled={!enabled}
        {...change}
        value={selectedValue}
      >
        {children.map((item, index) => {
          return (
            <PickerDropDown.Item
              key={`${testID}${index}`}
              {...item.props}
              {...itemStyle}
            />);
        })}
      </select>
    );
  }
}

PickerDropDown.Item = class extends PickerItem {
  render() {
    let { label, value, color, testID, ...rest } = this.props;
    if (color) {
      return null;
    }
    return (
      <option value={ value } data-testID={testID} {...rest}>
        { label }
      </option>
    )
  }
};

export default PickerDropDown;