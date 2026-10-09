/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

export function testWithPointerType(message, testFn) {
  const table = ['mouse', 'touch', 'pen'];
  test.each(table)(`${message}: %s`, (pointerType) => {
    testFn(pointerType);
  });
}
