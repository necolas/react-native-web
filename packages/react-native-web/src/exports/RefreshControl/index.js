/**
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { RefreshControlProps, RefreshControlIndicatorProps } from './types';

import View from '../View';
import RefreshControlIndicator from './RefreshControlIndicator';
import * as React from 'react';

const RefreshControl: React.AbstractComponent<
  RefreshControlProps,
  RefreshControlIndicatorProps
> = React.forwardRef(
  (
    {
      enabled,
      onRefresh,
      progressBackgroundColor,
      progressViewOffset,
      refreshing,
      size,
      tintColor,
      ...rest
    },
    ref
  ) => {
    return (
      <View
        style={{
          overflow: 'hidden'
        }}
      >
        <RefreshControlIndicator
          {...{
            enabled,
            onRefresh,
            progressBackgroundColor,
            progressViewOffset,
            refreshing,
            size,
            tintColor
          }}
          ref={ref}
        />
        {rest.children}
      </View>
    );
  }
);

export default RefreshControl;
