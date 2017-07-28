/* eslint-env jasmine, jest */

import Dimensions from '..';

describe('apis/Dimensions', () => {
  test('addEventListener', () => {
    const handler = jest.fn();
    Dimensions.addEventListener('change', handler);
    Dimensions.set();
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenLastCalledWith({
      window: Dimensions.get('window'),
      screen: Dimensions.get('screen')
    });
  });

  test('removeEventListener', () => {
    const handler = jest.fn();
    Dimensions.removeEventListener('change', handler);
    Dimensions.set();
    expect(handler).toHaveBeenCalledTimes(0);
  });
});
