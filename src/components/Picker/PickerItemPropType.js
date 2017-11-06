/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';
import Picker from './';

const PickerItemPropType = (props: Object, propName: string, componentName: string) => {
  const prop = props[propName];
  let error = null;
  React.Children.forEach(prop, function(child) {
    if (child.type !== Picker.Item) {
      error = new Error('`Picker` children must be of type `Picker.Item`.');
    }
  });
  return error;
};

export default PickerItemPropType;
