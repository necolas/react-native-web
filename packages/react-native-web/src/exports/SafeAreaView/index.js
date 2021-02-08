/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ViewProps } from '../View';
import type { Node } from 'react';

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import StyleSheet from '../StyleSheet';
import View from '../View';
import React, { forwardRef } from 'react';

const cssFunction: 'constant' | 'env' = (function () {
  if (
    canUseDOM &&
    window.CSS &&
    window.CSS.supports &&
    window.CSS.supports('top: constant(safe-area-inset-top)')
  ) {
    return 'constant';
  }
  return 'env';
})();

const SafeAreaView = forwardRef<ViewProps, Node>((props, ref) => {
  const { style, ...rest } = props;

  return <View {...rest} ref={ref} style={StyleSheet.compose(styles.root, style)} />;
});

SafeAreaView.displayName = 'SafeAreaView';

const styles = StyleSheet.create({
  root: {
    paddingTop: `${cssFunction}(safe-area-inset-top)`,
    paddingRight: `${cssFunction}(safe-area-inset-right)`,
    paddingBottom: `${cssFunction}(safe-area-inset-bottom)`,
    paddingLeft: `${cssFunction}(safe-area-inset-left)`
  }
});

export default SafeAreaView;
