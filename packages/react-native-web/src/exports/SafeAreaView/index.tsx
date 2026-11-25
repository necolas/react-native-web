/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { ComponentRef, ReactNode, Ref } from 'react';

import StyleSheet from '../StyleSheet';
import View, { type ViewProps } from '../View';

type SafeAreaViewProps = ViewProps & {
  ref?: Ref<ComponentRef<typeof View>>;
};

const SafeAreaView = (props: SafeAreaViewProps): ReactNode => {
  const { style, ...rest } = props;
  return <View {...rest} style={[styles.root, style]} />;
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

export default SafeAreaView;
