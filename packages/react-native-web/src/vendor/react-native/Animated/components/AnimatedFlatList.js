/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import * as React from 'react';

import FlatList from '../../../../exports/FlatList';
import createAnimatedComponent from '../createAnimatedComponent';

import type {AnimatedComponentType} from '../createAnimatedComponent';

/**
 * @see https://github.com/facebook/react-native/commit/b8c8562
 */
const FlatListWithEventThrottle: React.AbstractComponent<
  React.ElementConfig<typeof FlatList>,
  React.ElementRef<typeof FlatList>,
  // $FlowFixMe: Flow 0.148 does not support ref as a prop
> = (props) => <FlatList scrollEventThrottle={0.0001} {...props} />;

export default (createAnimatedComponent(
  FlatListWithEventThrottle,
): AnimatedComponentType<
  React.ElementConfig<typeof FlatList>,
  React.ElementRef<typeof FlatList>,
>);
