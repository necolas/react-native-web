/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';
import PickerItem from './PickerItem';

const PickerItemPropType = (props: Object, propName: string, componentName: string) => {
  const prop = props[propName];
  let error = null;
  React.Children.forEach(prop, function(child) {
    if (child.type !== PickerItem) {
      error = new Error('`Picker` children must be of type `Picker.Item`.');
    }
  });
  return error;
};

export default PickerItemPropType;
