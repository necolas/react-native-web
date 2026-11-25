/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import type { ComponentProps, ComponentRef } from 'react';

import Text from '../../../../exports/Text';
import createAnimatedComponent from '../createAnimatedComponent';

export default createAnimatedComponent<
  Omit<ComponentProps<typeof Text>, 'ref'>,
  ComponentRef<typeof Text>
>(Text);
