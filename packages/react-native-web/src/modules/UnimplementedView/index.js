/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { Node } from 'React';

import View from '../../exports/View';
import React from 'react';

/**
 * Common implementation for a simple stubbed view.
 */
class UnimplementedView extends React.Component<*, *> {
  setNativeProps() {
    // Do nothing.
  }

  render(): Node {
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
