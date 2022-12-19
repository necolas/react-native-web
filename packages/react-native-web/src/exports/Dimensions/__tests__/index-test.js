/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Dimensions from '..';

describe('apis/Dimensions', () => {
  test('get', () => {
    const handler = jest.fn();
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
    expect(handler).toHaveBeenCalledTimes(0);
  });

  test('set', () => {
    expect(() => Dimensions.set({})).toThrow();
  });

  test('addEventListener', () => {
    const handler = jest.fn();
    const subscription = Dimensions.addEventListener('change', handler);
    window.dispatchEvent(new Event('resize'));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenLastCalledWith({
      window: Dimensions.get('window'),
      screen: Dimensions.get('screen')
    });
    subscription.remove();
    window.dispatchEvent(new Event('resize'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('removeEventListener', () => {
    const handler = jest.fn();
    Dimensions.removeEventListener('change', handler);
    window.dispatchEvent(new Event('resize'));
    expect(handler).toHaveBeenCalledTimes(0);
  });
});

describe('apis/Dimensions(VisualViewport)', () => {
  window.visualViewport = {
    width: window.innerWidth,
    height: window.innerHeight,
    scale: 1,
    dispatchEvent: (event) => window.dispatchEvent(event)
  };

  test('get(VisualViewport)', () => {
    const handler = jest.fn();
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
    expect(handler).toHaveBeenCalledTimes(0);
  });

  test('set(VisualViewport)', () => {
    expect(() => Dimensions.set({})).toThrow();
  });

  test('addEventListener(VisualViewport)', () => {
    const handler = jest.fn();
    const subscription = Dimensions.addEventListener('change', handler);
    console.log('window.visualViewport', window.visualViewport);
    window.visualViewport.dispatchEvent(new Event('resize'));
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenLastCalledWith({
      window: Dimensions.get('window'),
      screen: Dimensions.get('screen')
    });
    subscription.remove();
    window.visualViewport.dispatchEvent(new Event('resize'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('removeEventListener(VisualViewport)', () => {
    const handler = jest.fn();
    Dimensions.removeEventListener('change', handler);
    window.visualViewport.dispatchEvent(new Event('resize'));
    expect(handler).toHaveBeenCalledTimes(0);
  });
});
