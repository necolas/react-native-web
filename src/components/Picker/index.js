/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule Picker
 * @flow
 */

import applyNativeMethods from '../../modules/applyNativeMethods';
import { Component } from 'react';
import ColorPropType from '../../propTypes/ColorPropType';
import createElement from '../../modules/createElement';
import PickerItemPropType from './PickerItemPropType';
import PickerStylePropType from './PickerStylePropType';
import StyleSheetPropType from '../../propTypes/StyleSheetPropType';
import StyleSheet from '../../apis/StyleSheet';
import { arrayOf, func, number, oneOfType, string } from 'prop-types';

class Picker extends Component {
  static propTypes = {
    children: arrayOf(PickerItemPropType),
    onValueChange: func,
    selectedValue: oneOfType([number, string]),
    style: StyleSheetPropType(PickerStylePropType),
    testID: string
  };

  static Item;

  render() {
    const { children, selectedValue, style, testID } = this.props;
    const props = {
      children,
      value: selectedValue,
      onChange: this._onChange,
      style: [styles.initial, style],
      testID
    };
    return createElement('select', props);
  }

  _onChange = (e: Object) => {
    const { selectedIndex, value } = e.target;
    this.props.onValueChange(value, selectedIndex);
  };
}

class PickerItem extends Component {
  static propTypes = {
    color: ColorPropType,
    label: string.isRequired,
    testID: string,
    value: oneOfType([number, string])
  };

  render() {
    const { label, value } = this.props;
    const props = {
      label,
      value
    };
    return createElement('option', props);
  }
}

const styles = StyleSheet.create({
  initial: {
    fontFamily: 'inherit',
    fontSize: 'inherit',
    margin: 0
  }
});

Picker.Item = PickerItem;

export default applyNativeMethods(Picker);
