/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Jest's 'fakeTimers.enableGlobally' has no Vitest equivalent
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

if (typeof window !== 'undefined') {
  // JSDOM doesn't implement AnimationEvent
  window.AnimationEvent =
    class extends Event {} as unknown as typeof AnimationEvent;

  // JSDOM doesn't provide values for 'clientWidth' etc
  Object.defineProperty(window.document.documentElement, 'clientHeight', {
    get: () => window.innerHeight
  });
  Object.defineProperty(window.document.documentElement, 'clientWidth', {
    get: () => window.innerWidth
  });
}
