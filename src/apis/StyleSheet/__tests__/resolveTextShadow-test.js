/* eslint-env jasmine, jest */

import resolveTextShadow from '../resolveTextShadow';

describe('apis/StyleSheet/resolveTextShadow', () => {
  test('textShadowOffset', () => {
    const resolvedStyle = {};
    const style = {
      textShadowColor: 'red',
      textShadowOffset: { width: 1, height: 2 },
      textShadowRadius: 5
    };
    resolveTextShadow(resolvedStyle, style);

    expect(resolvedStyle).toEqual({
      textShadow: '1px 2px 5px red'
    });
  });
});
