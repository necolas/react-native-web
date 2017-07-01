/* eslint-env jasmine, jest */

import Dimensions from '..';

describe('apis/Dimensions', () => {
  describe('change', () => {
    const handler = jest.fn();

    afterEach(() => {
      handler.mockClear();
    });

    test('addEventListener', () => {
      Dimensions.addEventListener('change', handler);
      Dimensions.set();
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenLastCalledWith({
        window: Dimensions.get('window'),
        screen: Dimensions.get('screen')
      });
    });

    test('removeEventListener', () => {
      Dimensions.removeEventListener('change', handler);
      Dimensions.set();
      expect(handler).toHaveBeenCalledTimes(0);
    });
  });
});
