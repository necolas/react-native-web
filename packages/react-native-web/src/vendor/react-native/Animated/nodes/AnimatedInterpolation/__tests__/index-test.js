/* eslint-env jasmine, jest */

import AnimatedInterpolation from '..';
import AnimatedValue from '../../AnimatedValue';

describe('AnimatedInterpolation', () => {
  describe('interpolate', () => {
    test.each([
      [["#1E1E1E", "#1E1E1F"]],
      [[0x1E1E1E, 0x1E1E1F]]
    ])('can interpolate %s', (outputRange) => {
        const config = {
          inputRange: [0, 1],
          outputRange
        };
        const animVal = new AnimatedValue(0)
        const animInterpol = new AnimatedInterpolation(animVal, config);
        const result = animInterpol.interpolate(config)
        expect(result).toBeInstanceOf(AnimatedInterpolation)
      })
  })
});
