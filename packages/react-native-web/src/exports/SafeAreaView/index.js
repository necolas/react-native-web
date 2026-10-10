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

type SafeAreaViewProps = {
  ...ViewProps,
  ref?: React.Ref<typeof View>
};

const SafeAreaView = (props: SafeAreaViewProps): React.Node => {
  const { ref, style, ...rest } = props;
  return <View {...rest} ref={ref} style={[styles.root, style]} />;
};

SafeAreaView.displayName = 'SafeAreaView';

const styles = StyleSheet.create({
  root: {
    paddingTop: 'env(safe-area-inset-top)',
    paddingRight: 'env(safe-area-inset-right)',
    paddingBottom: 'env(safe-area-inset-bottom)',
    paddingLeft: 'env(safe-area-inset-left)'
  }
});

// $FlowFixMe: Flow 0.148 does not support ref as a prop
export default (SafeAreaView: React.AbstractComponent<
  SafeAreaViewProps,
  React.ElementRef<typeof View>
>);
