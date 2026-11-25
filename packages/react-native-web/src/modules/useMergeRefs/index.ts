/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { type Ref, useMemo } from 'react';

import type { Nullable } from '../../types';
import mergeRefs from '../mergeRefs';

export default function useMergeRefs<T = HTMLElement>(
  ...args: ReadonlyArray<Nullable<Ref<T>>>
): (node: T | null) => void {
  return useMemo(
    () => mergeRefs(...args),
    // oxlint-disable-next-line
    [...args]
  );
}
