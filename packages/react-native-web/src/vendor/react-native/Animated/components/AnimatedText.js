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

import Text from '../../../../exports/Text';
import createAnimatedComponent from '../createAnimatedComponent';

import type {AnimatedComponentType} from '../createAnimatedComponent';

export default (createAnimatedComponent((Text: $FlowFixMe), {
  collapsable: false,
}): AnimatedComponentType<
  React.ElementConfig<typeof Text>,
  React.ElementRef<typeof Text>,
>);
