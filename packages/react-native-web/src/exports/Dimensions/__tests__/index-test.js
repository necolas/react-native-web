/* eslint-env jasmine, jest */

import Dimensions from '..';

describe('apis/Dimensions', () => {
  test('get', () => {
    expect(Dimensions.get('screen')).toMatchSnapshot();
    expect(Dimensions.get('window')).toMatchSnapshot();
  });

  test('set', () => {
    expect(() => Dimensions.set({})).toThrow();
  });

  test('addEventListener', () => {
    const handler = jest.fn();
    Dimensions.addEventListener('change', handler);
    Dimensions._update();
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenLastCalledWith({
      window: Dimensions.get('window'),
      screen: Dimensions.get('screen')
    });
  });

  test('removeEventListener', () => {
    const handler = jest.fn();
    Dimensions.removeEventListener('change', handler);
    Dimensions._update();
    expect(handler).toHaveBeenCalledTimes(0);
  });
});
