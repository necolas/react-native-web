/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ColorValue } from '../../types';
import type { ViewProps } from '../View';

import View from '../View';
import RefreshControlIndicator from './RefreshControlIndicator';
import React, { useRef } from 'react';

export type RefreshControlIndicatorProps = {
  colors?: Array<ColorValue>,
  enabled?: boolean,
  onRefresh?: () => void | Promise<void>,
  progressBackgroundColor?: ColorValue,
  progressViewOffset?: number,
  refreshing: boolean,
  size?: 0 | 1,
  tintColor?: ColorValue,
  title?: string,
  titleColor?: ColorValue
};

type RefreshControlProps = ViewProps & RefreshControlIndicatorProps;

function RefreshControl(props: RefreshControlProps) {
  const {
    enabled,
    onRefresh,
    progressBackgroundColor,
    progressViewOffset,
    refreshing,
    size,
    tintColor,
    ...rest
  } = props;
  // ref to the container View to be passed to the Indicator component
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <View {...rest} ref={containerRef}>
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
        containerRef={containerRef}
      />
      {rest.children}
    </View>
  );
}

export default RefreshControl;
