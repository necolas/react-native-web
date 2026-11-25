/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import type { ComponentRef, Ref } from 'react';

import type {
  ScrollViewNode,
  Props as ScrollViewProps
} from '../../../../exports/ScrollView';
import ScrollView from '../../../../exports/ScrollView';
import createAnimatedComponent from '../createAnimatedComponent';

/**
 * @see https://github.com/facebook/react-native/commit/b8c8562
 */
const ScrollViewWithEventThrottle = (
  props: ScrollViewProps & { ref?: Ref<ScrollViewNode> }
) => <ScrollView scrollEventThrottle={0.0001} {...props} />;

export default createAnimatedComponent<
  ScrollViewProps,
  ComponentRef<typeof ScrollView>
>(ScrollViewWithEventThrottle);
