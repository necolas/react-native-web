/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import AppState from '..';

describe('apis/AppState', () => {
  const handler = () => {};

  describe('addEventListener', () => {
    test('throws if the provided "eventType" is not supported', () => {
      expect(() => AppState.addEventListener('foo', handler)).toThrow();
      expect(() => AppState.addEventListener('change', handler).remove()).not.toThrow();
    });

    test('returns remove subscription', () => {
      const subscription = AppState.addEventListener('change', handler);
      expect(() => subscription.remove()).not.toThrow();
    });
  });
});
