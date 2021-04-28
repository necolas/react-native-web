/* eslint-env jasmine, jest */

import Animated from '../';
import AnimatedInterpolation from '../../../vendor/react-native/Animated/nodes/AnimatedInterpolation';

describe('AnimatedInterpolation', () => {
  describe('interpolate', () => {
    test.each([[['#1E1E1E', '#1E1E1F']], [[0x1e1e1e, 0x1e1e1f]]])(
      'can interpolate %s',
      (outputRange) => {
        const config = {
          inputRange: [0, 1],
          outputRange
        };
        const animVal = new Animated.Value(0);
        const result = animVal.interpolate(config);
        expect(result).toBeInstanceOf(AnimatedInterpolation);
      }
    );
  });
});
