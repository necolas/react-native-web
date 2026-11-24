/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

import { test } from 'vitest';

import type { PointerType } from './domEvents';

export function testWithPointerType(
  message: string,
  testFn: (pointerType: PointerType) => void
) {
  const table: PointerType[] = ['mouse', 'touch', 'pen'];
  test.each(table)(`${message}: %s`, (pointerType) => {
    testFn(pointerType);
  });
}
