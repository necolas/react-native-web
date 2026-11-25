/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import type { ComponentProps, ComponentRef } from 'react';

import FlatList from '../../../../exports/FlatList';
import createAnimatedComponent from '../createAnimatedComponent';

/**
 * @see https://github.com/facebook/react-native/commit/b8c8562
 */
const FlatListWithEventThrottle = (props: ComponentProps<typeof FlatList>) => (
  <FlatList scrollEventThrottle={0.0001} {...props} />
);

export default createAnimatedComponent<
  Omit<ComponentProps<typeof FlatList>, 'ref'>,
  ComponentRef<typeof FlatList>
>(FlatListWithEventThrottle);
