/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import * as React from 'react';

import Text from '../../../../exports/Text';
import createAnimatedComponent from '../createAnimatedComponent';

export default createAnimatedComponent<
  Omit<React.ComponentProps<typeof Text>, 'ref'>,
  React.ComponentRef<typeof Text>
>(Text);
