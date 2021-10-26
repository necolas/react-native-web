/* eslint-env jasmine, jest */

import Dimensions from '..';

describe('apis/Dimensions', () => {
  test('get', () => {
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
  });

  test('set', () => {
    expect(() => Dimensions.set({})).toThrow();
  });

  test('addEventListener', () => {
    const handler = jest.fn();
    const subscription = Dimensions.addEventListener('change', handler);
    Dimensions._update();
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenLastCalledWith({
      window: Dimensions.get('window'),
      screen: Dimensions.get('screen')
    });
    subscription.remove();
    Dimensions._update();
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('removeEventListener', () => {
    const handler = jest.fn();
    Dimensions.removeEventListener('change', handler);
    Dimensions._update();
    expect(handler).toHaveBeenCalledTimes(0);
  });
});
