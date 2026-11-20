/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use client';

import type AnimatedColor from '../../vendor/react-native/Animated/nodes/AnimatedColor';
import type {
  AnimatedColorConfig,
  InputValue
} from '../../vendor/react-native/Animated/nodes/AnimatedColor';

import Animated from '../Animated';
import { useRef } from 'react';
import type { Nullable } from '../../types';

export default function useAnimatedColor(
  inputValue?: InputValue,
  config?: Nullable<AnimatedColorConfig>
): AnimatedColor {
  const ref = useRef<null | AnimatedColor>(null);
  if (ref.current == null) {
    ref.current = new Animated.Color(inputValue, config);
  }
  return ref.current;
}
