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

import SectionList from '../../../../exports/SectionList';
import createAnimatedComponent from '../createAnimatedComponent';

import type {AnimatedComponentType} from '../createAnimatedComponent';

/**
 * @see https://github.com/facebook/react-native/commit/b8c8562
 */
const SectionListWithEventThrottle: React.AbstractComponent<
  React.ElementConfig<typeof SectionList>,
  React.ElementRef<typeof SectionList>,
  // $FlowFixMe: Flow 0.148 does not support ref as a prop
> = (props) => <SectionList scrollEventThrottle={0.0001} {...props} />;

export default (createAnimatedComponent(
  SectionListWithEventThrottle,
): AnimatedComponentType<
  React.ElementConfig<typeof SectionList>,
  React.ElementRef<typeof SectionList>,
>);
