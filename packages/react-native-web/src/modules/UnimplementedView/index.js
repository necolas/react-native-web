/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import View from '../../exports/View';
import React, { Component } from 'react';

/**
 * Common implementation for a simple stubbed view.
 */
/* eslint-disable react/prop-types */
class UnimplementedView extends Component<*, *> {
  setNativeProps() {
    // Do nothing.
    // This method is required in order to use this view as a Touchable* child.
    // See ensureComponentIsNative.js for more info
  }

  render() {
    return <View style={[unimplementedViewStyles, this.props.style]}>{this.props.children}</View>;
  }
}

const unimplementedViewStyles =
  process.env.NODE_ENV !== 'production'
    ? {
        alignSelf: 'flex-start',
        borderColor: 'red',
        borderWidth: 1
      }
    : {};

export default UnimplementedView;
