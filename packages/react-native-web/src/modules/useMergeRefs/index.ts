/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import mergeRefs from '../mergeRefs';
import type { Nullable } from '../../types';

export default function useMergeRefs<T = HTMLElement>(
  ...args: ReadonlyArray<Nullable<React.Ref<T>>>
): (node: T | null) => void {
  return React.useMemo(
    () => mergeRefs(...args),
    // eslint-disable-next-line
    [...args]
  );
}
