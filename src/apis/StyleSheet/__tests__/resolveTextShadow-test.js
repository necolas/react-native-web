/* eslint-env jasmine, jest */

import resolveTextShadow from '../resolveTextShadow';

describe('apis/StyleSheet/resolveTextShadow', () => {
  test('textShadowOffset', () => {
    const style = {
      textShadowColor: 'red',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 5
    };

    expect(resolveTextShadow(style)).toEqual({
      textShadow: '2px 2px 5px red',
      textShadowColor: null,
      textShadowOffset: null,
      textShadowRadius: null
    });
  });
});
