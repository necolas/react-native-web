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

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import React from 'react';
import StyleSheet from '../StyleSheet';
import View from '../View';

const SafeAreaView = React.forwardRef<View, ViewProps>((props: ViewProps, ref) => {
  const { style, ...rest } = props;

  return (
    <View
      {...rest}
      ref={ref}
      style={StyleSheet.compose(
        styles.root,
        style
      )}
    />
  );
});

SafeAreaView.displayName = 'SafeAreaView';

const cssFunction: 'constant' | 'env' = (function() {
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

const styles = StyleSheet.create({
  root: {
    paddingTop: `${cssFunction}(safe-area-inset-top)`,
    paddingRight: `${cssFunction}(safe-area-inset-right)`,
    paddingBottom: `${cssFunction}(safe-area-inset-bottom)`,
    paddingLeft: `${cssFunction}(safe-area-inset-left)`
  }
});

export default SafeAreaView;
