/* eslint-env jasmine, jest */

import AnimatedInterpolation from '..';
import AnimatedValue from '../../AnimatedValue';

describe('AnimatedInterpolation', () => {
  describe('interpolate', () => {
    test('can interpolate hex strings', () => {
      const config = {
        inputRange: [0, 1],
        outputRange: [
          "#1E1E1E",
          "#1E1E1F",
        ]
      };
      const animVal = new AnimatedValue(0)
      const animInterpol = new AnimatedInterpolation(animVal, config);
      const result = animInterpol.interpolate(config)
      expect(result).toBeInstanceOf(AnimatedInterpolation)
    })
  })
});
