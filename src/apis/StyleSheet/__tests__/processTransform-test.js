/* eslint-env jasmine, jest */

import processTransform from '../processTransform';

describe('apis/StyleSheet/processTransform', () => {
  it('transform', () => {
    const style = {
      transform: [
        { scaleX: 20 },
        { translateX: 20 },
        { rotate: '20deg' }
      ]
    };

    expect(processTransform(style)).toEqual({ transform: 'scaleX(20) translateX(20px) rotate(20deg)' });
  });

  it('transformMatrix', () => {
    const style = {
      transformMatrix: [ 1, 2, 3, 4, 5, 6 ]
    };

    expect(processTransform(style)).toEqual({
      transform: 'matrix3d(1,2,3,4,5,6)',
      transformMatrix: null
    });
  });
});
