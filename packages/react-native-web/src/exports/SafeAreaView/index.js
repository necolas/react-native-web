/**
 * Copyright (c) 2015-present, Facebook, Inc.
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
    return <View {...rest} style={StyleSheet.compose(styles.root, style)} />;
  }
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 'env(safe-area-inset-top)',
    paddingRight: 'env(safe-area-inset-right)',
    paddingBottom: 'env(safe-area-inset-bottom)',
    paddingLeft: 'env(safe-area-inset-left)'
  }
});

export default SafeAreaView;
