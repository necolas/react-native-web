/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Dimensions from '..';
import { runInRequestScope } from '../../../modules/asyncContext';

// In the Node test environment `canUseDOM` is false, so `Dimensions.set`
// is permitted (it throws in the browser). This is the same call shape
// the SSR pipeline uses to seed per-request viewport metrics.

describe('apis/Dimensions per-request scoping', () => {
  test('set + get inside a request scope reads back the per-request value', () => {
    runInRequestScope(() => {
      Dimensions.set({
        window: { fontScale: 1, height: 700, scale: 1, width: 360 },
        screen: { fontScale: 1, height: 800, scale: 1, width: 360 }
      });
      expect(Dimensions.get('window').width).toBe(360);
      expect(Dimensions.get('screen').height).toBe(800);
    });
  });

  test("concurrent scopes do not see each other's viewport values", async () => {
    const widths = [320, 768, 1024, 1440];
    const reads = await Promise.all(
      widths.map((width) =>
        runInRequestScope(async () => {
          Dimensions.set({
            window: { fontScale: 1, height: 1080, scale: 1, width },
            screen: { fontScale: 1, height: 1080, scale: 1, width }
          });
          // Yield to the microtask queue so other scopes interleave
          // between Dimensions.set and Dimensions.get.
          await Promise.resolve();
          return Dimensions.get('window').width;
        })
      )
    );
    expect(reads).toEqual(widths);
  });

  test('writes inside a scope do not leak to the process default', () => {
    runInRequestScope(() => {
      Dimensions.set({
        window: { fontScale: 1, height: 700, scale: 1, width: 360 },
        screen: { fontScale: 1, height: 800, scale: 1, width: 360 }
      });
      expect(Dimensions.get('window').width).toBe(360);
    });
    // Outside any scope: the process default is still the initial zeros.
    expect(Dimensions.get('window').width).toBe(0);
    expect(Dimensions.get('screen').width).toBe(0);
  });
});
