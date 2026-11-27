/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use client';

import { useRef } from 'react';

import type AnimatedValue from '../../vendor/react-native/Animated/nodes/AnimatedValue';
import type { AnimatedValueConfig } from '../../vendor/react-native/Animated/nodes/AnimatedValue';
import Animated from '../Animated';

export default function useAnimatedValue(
  initialValue: number,
  config?: AnimatedValueConfig
): AnimatedValue {
  const ref = useRef<AnimatedValue>(null);
  if (ref.current == null) {
    ref.current = new Animated.Value(initialValue, config);
  }
  return ref.current;
}
