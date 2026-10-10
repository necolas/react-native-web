/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ViewProps } from '../View';

import * as React from 'react';
import StyleSheet from '../StyleSheet';
import View from '../View';

const SafeAreaView: React.AbstractComponent<
  ViewProps,
  React.ElementRef<typeof View>
> = React.forwardRef((props, ref) => {
  const { style, ...rest } = props;
  return <View {...rest} ref={ref} style={[styles.root, style]} />;
});

SafeAreaView.displayName = 'SafeAreaView';

const styles = StyleSheet.create({
  root: {
    paddingTop: 'env(safe-area-inset-top)',
    paddingRight: 'env(safe-area-inset-right)',
    paddingBottom: 'env(safe-area-inset-bottom)',
    paddingLeft: 'env(safe-area-inset-left)'
  }
});

export default SafeAreaView;
