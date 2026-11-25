/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use client';

import { useSyncExternalStore } from 'react';

import canUseDOM from '../../modules/canUseDom';
import Dimensions, { type DisplayMetrics } from '../Dimensions';

// Matches the server render when `Dimensions.set` is not called
const hydrationWindow: DisplayMetrics = {
  fontScale: 1,
  height: 0,
  scale: 1,
  width: 0
};

function subscribe(callback: () => void): () => void {
  const subscription = Dimensions.addEventListener('change', callback);
  return () => subscription.remove();
}

function getSnapshot(): DisplayMetrics {
  return Dimensions.get('window');
}

function getServerSnapshot(): DisplayMetrics {
  return canUseDOM ? hydrationWindow : Dimensions.get('window');
}

export default function useWindowDimensions(): DisplayMetrics {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
