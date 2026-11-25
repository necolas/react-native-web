/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import type { ComponentProps, ComponentRef } from 'react';

import View from '../../../../exports/View';
import createAnimatedComponent from '../createAnimatedComponent';

export default createAnimatedComponent<
  Omit<ComponentProps<typeof View>, 'ref'>,
  ComponentRef<typeof View>
>(View);
