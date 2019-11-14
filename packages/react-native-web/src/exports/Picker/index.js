/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ViewProps } from '../View';

import applyNativeMethods from '../../modules/applyNativeMethods';
import { Component } from 'react';
import createElement from '../createElement';
import PickerItem from './PickerItem';
import StyleSheet, { type StyleObj } from '../StyleSheet';

type PickerProps = {
  ...ViewProps,
  children?: PickerItem | Array<typeof PickerItem>,
  enabled?: boolean,
  onValueChange?: (number | string, number) => void,
  selectedValue?: number | string,
  style?: StyleObj,
  /* compat */
  itemStyle?: StyleObj,
  mode?: string,
  prompt?: string
};

class Picker extends Component<PickerProps> {
  static Item = PickerItem;

  render() {
    const {
      children,
      enabled,
      selectedValue,
      style,
      testID,
      /* eslint-disable */
      itemStyle,
      mode,
      prompt,
      onValueChange,
      /* eslint-enable */
      ...otherProps
    } = this.props;

    return createElement('select', {
      children,
      disabled: enabled === false ? true : undefined,
      onChange: this._handleChange,
      style: [styles.initial, style],
      testID,
      value: selectedValue,
      ...otherProps
    });
  }

  _handleChange = (e: Object) => {
    const { onValueChange } = this.props;
    const { selectedIndex, value } = e.target;
    if (onValueChange) {
      onValueChange(value, selectedIndex);
    }
  };
}

const styles = StyleSheet.create({
  initial: {
    fontFamily: 'System',
    fontSize: 'inherit',
    margin: 0
  }
});

export default applyNativeMethods(Picker);
