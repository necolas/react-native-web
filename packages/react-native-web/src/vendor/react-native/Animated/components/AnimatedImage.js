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

import Image from '../../../../exports/Image';
import createAnimatedComponent from '../createAnimatedComponent';

import type {AnimatedComponentType} from '../createAnimatedComponent';

export default createAnimatedComponent(Image as $FlowFixMe) as AnimatedComponentType<
  Omit<React.ElementConfig<typeof Image>, 'ref'>,
  React.ElementRef<typeof Image>,
>;
