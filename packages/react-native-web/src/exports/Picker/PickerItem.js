/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import ColorPropType from '../ColorPropType';
import { Component } from 'react';
import createElement from '../createElement';
import { number, oneOfType, string } from 'prop-types';

type Props = {
  color?: ColorPropType,
  label: string,
  testID?: string,
  value?: number | string
};

export default class PickerItem extends Component<Props> {
  static propTypes = {
    color: ColorPropType,
    label: string.isRequired,
    testID: string,
    value: oneOfType([number, string])
  };

  render() {
    const { color, label, testID, value } = this.props;
    const style = { color };
    return createElement('option', { style, testID, value }, label);
  }
}
