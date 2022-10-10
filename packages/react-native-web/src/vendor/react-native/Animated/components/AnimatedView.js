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

import View from '../../../../exports/View';
import createAnimatedComponent from '../createAnimatedComponent';

import type {AnimatedComponentType} from '../createAnimatedComponent';

export default (createAnimatedComponent(View, {
  collapsable: true,
}): AnimatedComponentType<
  React.ElementConfig<typeof View>,
  React.ElementRef<typeof View>,
>);
