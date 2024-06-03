/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import View from '../../exports/View';
import React from 'react';

/**
 * Common implementation for a simple stubbed view.
 */
function UnimplementedView({ style, ...props }) {
  return (
    <View style={[unimplementedViewStyles, style]} {...props} />
  );
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
