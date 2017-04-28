/* eslint-env jasmine, jest */

import resolveTransform from '../resolveTransform';

describe('apis/StyleSheet/resolveTransform', () => {
  // passthrough if transform value is ever a string
  test('transform string', () => {
    const resolvedStyle = {};
    const transform = 'perspective(50px) scaleX(20) translateX(20px) rotate(20deg)';

    const style = { transform };
    resolveTransform(resolvedStyle, style);

    expect(resolvedStyle).toEqual({ transform });
  });

  test('transform array', () => {
    const resolvedStyle = {};
    const style = {
      transform: [{ perspective: 50 }, { scaleX: 20 }, { translateX: 20 }, { rotate: '20deg' }]
    };
    resolveTransform(resolvedStyle, style);

    expect(resolvedStyle).toEqual({
      transform: 'perspective(50px) scaleX(20) translateX(20px) rotate(20deg)'
    });
  });

  test('transformMatrix', () => {
    const resolvedStyle = {};
    const style = { transformMatrix: [1, 2, 3, 4, 5, 6] };
    resolveTransform(resolvedStyle, style);

    expect(resolvedStyle).toEqual({
      transform: 'matrix3d(1,2,3,4,5,6)'
    });
  });
});
