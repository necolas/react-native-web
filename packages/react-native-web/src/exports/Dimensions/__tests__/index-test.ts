/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Dimensions from '..';

describe('apis/Dimensions', () => {
  test('get', () => {
    const handler = vi.fn();
    Dimensions.addEventListener('change', handler);
    expect(Dimensions.get('screen')).toMatchInlineSnapshot(`
     {
       "fontScale": 1,
       "height": 0,
       "scale": 1,
       "width": 0,
     }
    `);
    expect(Dimensions.get('window')).toMatchInlineSnapshot(`
     {
       "fontScale": 1,
       "height": 768,
       "scale": 1,
       "width": 1024,
     }
    `);
    expect(handler).not.toHaveBeenCalled();
  });

  test('set', () => {
    // @ts-expect-error
    expect(() => Dimensions.set({})).toThrow();
  });

  test('addEventListener', () => {
    const handler = vi.fn();
    const subscription = Dimensions.addEventListener('change', handler);
    window.dispatchEvent(new Event('resize'));
    expect(handler).toHaveBeenCalledOnce();
    expect(handler).toHaveBeenLastCalledWith({
      window: Dimensions.get('window'),
      screen: Dimensions.get('screen')
    });
    subscription.remove();
    window.dispatchEvent(new Event('resize'));
    expect(handler).toHaveBeenCalledOnce();
  });

  test('removeEventListener', () => {
    const handler = vi.fn();
    Dimensions.removeEventListener('change', handler);
    window.dispatchEvent(new Event('resize'));
    expect(handler).not.toHaveBeenCalled();
  });
});
