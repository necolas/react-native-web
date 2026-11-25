/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Ref } from 'react';

import type { Nullable } from '../../types';

export default function mergeRefs<T = HTMLElement>(
  ...args: ReadonlyArray<Nullable<Ref<T>>>
): (node: T | null) => void {
  return (node: T | null) => {
    args.forEach((ref) => {
      if (ref == null) {
        return;
      }
      if (typeof ref === 'function') {
        ref(node);
        return;
      }
      if (typeof ref === 'object') {
        ref.current = node;
        return;
      }
      console.error(
        `mergeRefs cannot handle Refs of type boolean, number or string, received ref ${String(
          ref
        )}`
      );
    });
  };
}
