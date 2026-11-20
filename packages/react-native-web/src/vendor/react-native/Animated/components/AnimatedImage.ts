/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import * as React from 'react';

import Image from '../../../../exports/Image';
import createAnimatedComponent from '../createAnimatedComponent';

export default createAnimatedComponent<
  Omit<React.ComponentProps<typeof Image>, 'ref'>,
  React.ComponentRef<typeof Image>
>(Image);
