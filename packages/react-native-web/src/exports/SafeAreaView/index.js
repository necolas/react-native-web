/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';
import StyleSheet from '../StyleSheet';
import View from '../View';
import ViewPropTypes, { type ViewProps } from '../ViewPropTypes';

class SafeAreaView extends React.Component<ViewProps> {
  static displayName = 'SafeAreaView';

  static propTypes = {
    ...ViewPropTypes
  };

  render() {
    const { style, ...rest } = this.props;
    return (
      <View
        {...rest}
        style={StyleSheet.compose(
          styles.root,
          style
        )}
      />
    );
  }
}

function getSupportedEnv(): 'env' | 'constant' | null {
  if (!window.CSS || typeof window.CSS.supports !== 'function') {
    return null;
  } else if (window.CSS.supports('top: env(safe-area-inset-top)')) {
    return 'env';
  } else if (window.CSS.supports('top: constant(safe-area-inset-top)')) {
    return 'constant';
  }
  return null;
}

const envType = getSupportedEnv();

const styles = StyleSheet.create({
  root: {
    paddingTop: `${envType}(safe-area-inset-top)`,
    paddingRight: `${envType}(safe-area-inset-right)`,
    paddingBottom: `${envType}(safe-area-inset-bottom)`,
    paddingLeft: `${envType}(safe-area-inset-left)`
  }
});

export default SafeAreaView;
