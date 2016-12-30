/* eslint-env jasmine, jest */

import resolveTransform from '../resolveTransform';

describe('apis/StyleSheet/resolveTransform', () => {
  test('transform', () => {
    const resolvedStyle = {};
    const style = {
      transform: [
        { scaleX: 20 },
        { translateX: 20 },
        { rotate: '20deg' }
      ]
    };
    resolveTransform(resolvedStyle, style);

    expect(resolvedStyle).toEqual({
      transform: 'scaleX(20) translateX(20px) rotate(20deg)' });
  });

  test('transformMatrix', () => {
    const resolvedStyle = {};
    const style = { transformMatrix: [ 1, 2, 3, 4, 5, 6 ] };
    resolveTransform(resolvedStyle, style);

    expect(resolvedStyle).toEqual({
      transform: 'matrix3d(1,2,3,4,5,6)'
    });
  });
});
