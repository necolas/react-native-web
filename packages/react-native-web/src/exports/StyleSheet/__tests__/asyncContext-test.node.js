/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import StyleSheet from '..';
import { runInRequestScope } from '../../../modules/asyncContext';

/**
 * The StyleSheet shared registry is module-scope state. Each test runs in
 * its own Jest module, but tests inside this file share the same registry,
 * so we make each test use distinct style keys to avoid the dedup map
 * (selectors) silently dropping a "new" rule that another test already
 * inserted.
 *
 * These tests run in the node Jest environment (`*.test.node.js`) so
 * `canUseDOM` is false and the underlying CSSOM sheet is a no-op — same
 * conditions as SSR.
 */

// A counter-driven generator that produces unique, valid `width` values.
// Width is a numeric property → no validate-time rejection, and the unique
// number ensures each call produces a distinct atomic rule (distinct
// generated class name). Using `width` instead of `color` avoids both the
// hex-color validation and any color-format normalization that would make
// it harder to find the value in the emitted CSS text.
let widthCounter = 1000;
const makeStyle = () => ({ width: widthCounter++ });

describe('StyleSheet per-request delta', () => {
  test('takeRequestDelta returns "" outside a request scope', () => {
    StyleSheet.create({ outside: makeStyle() });
    expect(StyleSheet.takeRequestDelta()).toBe('');
  });

  test('takeRequestDelta returns rules added during the scope', () => {
    runInRequestScope(() => {
      // Drain any rules that arrived before this test (none in a fresh
      // process, but harmless to call).
      StyleSheet.resetRequestDelta();
      StyleSheet.create({ a: makeStyle() });
      const delta = StyleSheet.takeRequestDelta();
      // Sanity: the delta contains at least one rule plus a marker.
      expect(delta).toContain('[stylesheet-group="');
      expect(delta).toMatch(/\.r-[^ ]+ ?\{/);
    });
  });

  test('takeRequestDelta clears the buffer', () => {
    runInRequestScope(() => {
      StyleSheet.resetRequestDelta();
      StyleSheet.create({ a: makeStyle() });
      const first = StyleSheet.takeRequestDelta();
      expect(first.length).toBeGreaterThan(0);
      // Calling again with no new rules returns empty.
      expect(StyleSheet.takeRequestDelta()).toBe('');
    });
  });

  test('a group marker is emitted only on the first flush per request', () => {
    runInRequestScope(() => {
      StyleSheet.resetRequestDelta();
      StyleSheet.create({ a: makeStyle() });
      const first = StyleSheet.takeRequestDelta();
      const firstMarkerCount = (first.match(/\[stylesheet-group="/g) || [])
        .length;
      expect(firstMarkerCount).toBeGreaterThan(0);

      // Add another rule to the same request and flush again. The marker
      // should NOT reappear because the client already knows the group.
      StyleSheet.create({ b: makeStyle() });
      const second = StyleSheet.takeRequestDelta();
      expect(second).toMatch(/\.r-[^ ]+ ?\{/);
      expect(second).not.toContain('[stylesheet-group="');
    });
  });

  test("concurrent scopes do not see each other's rules", async () => {
    const styles = [makeStyle(), makeStyle(), makeStyle(), makeStyle()];
    const deltas = await Promise.all(
      styles.map((styleObj) =>
        runInRequestScope(async () => {
          StyleSheet.resetRequestDelta();
          StyleSheet.create({ x: styleObj });
          // Yield to the microtask queue so other scopes interleave.
          await Promise.resolve();
          return StyleSheet.takeRequestDelta();
        })
      )
    );
    // Each delta must contain its own width value and no other scope's value.
    // Atomic CSS embeds the width as `width:NNNpx` in the rule body.
    deltas.forEach((delta, i) => {
      const ownToken = `width:${styles[i].width}px`;
      expect(delta).toContain(ownToken);
      styles.forEach((s, j) => {
        if (i === j) return;
        const otherToken = `width:${s.width}px`;
        expect(delta).not.toContain(otherToken);
      });
    });
  });

  test('resetRequestDelta drops pending rules without emitting them', () => {
    runInRequestScope(() => {
      StyleSheet.resetRequestDelta();
      StyleSheet.create({ a: makeStyle() });
      // Simulate the shell head dump: caller emits full sheet, then resets
      // the delta so subsequent flushes only carry rules added after the
      // shell.
      StyleSheet.resetRequestDelta();
      expect(StyleSheet.takeRequestDelta()).toBe('');
    });
  });

  test("duplicate rule across requests does not show in the second request's delta", () => {
    const shared = makeStyle();
    runInRequestScope(() => {
      StyleSheet.resetRequestDelta();
      StyleSheet.create({ s: shared });
      const first = StyleSheet.takeRequestDelta();
      expect(first).toContain(`width:${shared.width}px`);
    });
    // Second request: same rule. The shared sheet already has it; dedup
    // skips re-insertion; delta stays empty.
    runInRequestScope(() => {
      StyleSheet.resetRequestDelta();
      StyleSheet.create({ s: shared });
      expect(StyleSheet.takeRequestDelta()).toBe('');
    });
  });
});
