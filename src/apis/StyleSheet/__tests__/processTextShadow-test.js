/* eslint-env jasmine, jest */

import processTextShadow from '../processTextShadow';

describe('apis/StyleSheet/processTextShadow', () => {
  test('textShadowOffset', () => {
    const style = {
      textShadowColor: 'red',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 5
    };

    expect(processTextShadow(style)).toEqual({
      textShadow: '2px 2px 5px red',
      textShadowColor: null,
      textShadowOffset: null,
      textShadowRadius: null
    });
  });
});
