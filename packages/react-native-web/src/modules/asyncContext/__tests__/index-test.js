/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getScopedState, hasRequestScope, runInRequestScope } from '..';

describe('modules/asyncContext', () => {
  test('returns process-default state outside any scope', () => {
    expect(hasRequestScope()).toBe(false);
    const a = getScopedState('default-state', () => ({ value: 0 }));
    const b = getScopedState('default-state', () => ({ value: 999 }));
    // Same key returns the same reference; the second factory is ignored.
    expect(a).toBe(b);
    a.value = 42;
    expect(b.value).toBe(42);
  });

  test('runInRequestScope opens a scope; getScopedState returns fresh state per scope', () => {
    return runInRequestScope(() => {
      expect(hasRequestScope()).toBe(true);
      const scoped = getScopedState('per-request', () => ({ count: 0 }));
      scoped.count = 5;
      expect(getScopedState('per-request', () => ({ count: 0 })).count).toBe(5);
    });
  });

  test('concurrent scopes do not see each other', async () => {
    const writes = [10, 20, 30, 40];
    const reads = await Promise.all(
      writes.map((n) =>
        runInRequestScope(async () => {
          const s = getScopedState('per-request-isolation', () => ({ v: 0 }));
          s.v = n;
          // Yield to the microtask queue so other scopes interleave
          // between the write and the read. ALS state must propagate
          // through the await boundary for this to read back `n`.
          await Promise.resolve();
          return s.v;
        })
      )
    );
    expect(reads).toEqual(writes);
  });

  test('scope leaves no residue in the process-default state', () => {
    runInRequestScope(() => {
      const s = getScopedState('isolated-key', () => ({ leaked: false }));
      s.leaked = true;
    });
    // The default state for this key should still be the lazy initial.
    const after = getScopedState('isolated-key', () => ({ leaked: false }));
    expect(after.leaked).toBe(false);
  });

  test('nested scopes get their own state', () => {
    runInRequestScope(() => {
      const outer = getScopedState('nested', () => ({ depth: 'outer' }));
      outer.depth = 'outer-mutated';
      runInRequestScope(() => {
        const inner = getScopedState('nested', () => ({ depth: 'inner' }));
        expect(inner.depth).toBe('inner');
        inner.depth = 'inner-mutated';
      });
      // Outer scope is restored after the inner scope ends.
      expect(getScopedState('nested', () => ({ depth: 'fresh' })).depth).toBe(
        'outer-mutated'
      );
    });
  });
});
