/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import * as React from 'react';

import SectionList from '../../../../exports/SectionList';
import createAnimatedComponent from '../createAnimatedComponent';

/**
 * @see https://github.com/facebook/react-native/commit/b8c8562
 */
const SectionListWithEventThrottle = (props: React.ComponentProps<typeof SectionList>) => <SectionList scrollEventThrottle={0.0001} {...props} />;

export default createAnimatedComponent<
  Omit<React.ComponentProps<typeof SectionList>, 'ref'>,
  React.ComponentRef<typeof SectionList>
>(SectionListWithEventThrottle);
