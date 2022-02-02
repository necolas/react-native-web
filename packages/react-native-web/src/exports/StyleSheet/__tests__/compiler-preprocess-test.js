/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import preprocess from '../compiler/preprocess';

describe('StyleSheet/preprocess', () => {
  describe('logical style polyfill', () => {
    [false, true].forEach((isRTL) => {
      const dir = isRTL ? 'rtl' : 'ltr';

      test(`ignores "left" properties for ${dir}`, () => {
        const initial = {
          borderLeftColor: 'red',
          borderLeftStyle: 'solid',
          borderLeftWidth: 1,
          left: 1,
          marginLeft: 5,
          paddingLeft: 10
        };
        expect(preprocess(initial, isRTL)).toEqual(initial);
      });

      test(`ignores "right" properties for ${dir}`, () => {
        const initial = {
          borderRightColor: 'red',
          borderRightStyle: 'solid',
          borderRightWidth: 1,
          right: 1,
          marginRight: 5,
          paddingRight: 10
        };
        expect(preprocess(initial, isRTL)).toEqual(initial);
      });

      test(`ignores "left" values for ${dir}`, () => {
        const initial = {
          clear: 'left',
          float: 'left',
          textAlign: 'left',
          transitionProperty: 'left'
        };
        expect(preprocess(initial, isRTL)).toEqual(initial);
      });

      test(`ignores "right" values for ${dir}`, () => {
        const initial = {
          clear: 'right',
          float: 'right',
          textAlign: 'right',
          transitionProperty: 'right'
        };
        expect(preprocess(initial, isRTL)).toEqual(initial);
      });

      test(`converts "start" properties for ${dir}`, () => {
        const initial = {
          borderStartColor: 'red',
          borderStartStyle: 'solid',
          borderStartWidth: 1,
          start: 1,
          marginStart: 5,
          paddingStart: 10
        };

        const expectedLTR = {
          borderLeftColor: 'red',
          borderLeftStyle: 'solid',
          borderLeftWidth: 1,
          left: 1,
          marginLeft: 5,
          paddingLeft: 10
        };
        const expectedRTL = {
          borderRightColor: 'red',
          borderRightStyle: 'solid',
          borderRightWidth: 1,
          right: 1,
          marginRight: 5,
          paddingRight: 10
        };
        expect(preprocess(initial, isRTL)).toEqual(isRTL ? expectedRTL : expectedLTR);
      });

      test(`converts "end" properties for ${dir}`, () => {
        const initial = {
          borderEndColor: 'red',
          borderEndStyle: 'solid',
          borderEndWidth: 1,
          end: 1,
          marginEnd: 5,
          paddingEnd: 10
        };

        const expectedLTR = {
          borderRightColor: 'red',
          borderRightStyle: 'solid',
          borderRightWidth: 1,
          right: 1,
          marginRight: 5,
          paddingRight: 10
        };
        const expectedRTL = {
          borderLeftColor: 'red',
          borderLeftStyle: 'solid',
          borderLeftWidth: 1,
          left: 1,
          marginLeft: 5,
          paddingLeft: 10
        };
        expect(preprocess(initial, isRTL)).toEqual(isRTL ? expectedRTL : expectedLTR);
      });

      test(`converts "start" values for ${dir}`, () => {
        const initial = {
          clear: 'start',
          float: 'start',
          textAlign: 'start',
          transitionProperty: 'start'
        };

        const expectedLTR = {
          clear: 'left',
          float: 'left',
          textAlign: 'left',
          transitionProperty: 'left'
        };
        const expectedRTL = {
          clear: 'right',
          float: 'right',
          textAlign: 'right',
          transitionProperty: 'right'
        };
        expect(preprocess(initial, isRTL)).toEqual(isRTL ? expectedRTL : expectedLTR);
      });

      test(`converts "end" values for ${dir}`, () => {
        const initial = {
          clear: 'end',
          float: 'end',
          textAlign: 'end',
          transitionProperty: 'end'
        };

        const expectedLTR = {
          clear: 'right',
          float: 'right',
          textAlign: 'right',
          transitionProperty: 'right'
        };
        const expectedRTL = {
          clear: 'left',
          float: 'left',
          textAlign: 'left',
          transitionProperty: 'left'
        };
        expect(preprocess(initial, isRTL)).toEqual(isRTL ? expectedRTL : expectedLTR);
      });

      test('end/start properties take precedence over left/right', () => {
        const initialLTR = {
          borderStartWidth: 10,
          borderLeftWidth: 0,
          end: 10,
          right: 0,
          marginStart: 10,
          marginLeft: 0
        };
        const expectedLTR = {
          borderLeftWidth: 10,
          marginLeft: 10,
          right: 10
        };

        const initialRTL = {
          borderStartWidth: 10,
          borderRightWidth: 0,
          end: 10,
          left: 0,
          marginStart: 10,
          marginRight: 0
        };
        const expectedRTL = {
          borderRightWidth: 10,
          marginRight: 10,
          left: 10
        };
        expect(preprocess(isRTL ? initialRTL : initialLTR, isRTL)).toEqual(
          isRTL ? expectedRTL : expectedLTR
        );
      });
    });
  });

  describe('preprocesses multiple shadow styles into a single declaration', () => {
    test('shadowColor only', () => {
      expect(preprocess({ shadowColor: 'red' })).toEqual({
        boxShadow: '0px 0px 0px rgba(255,0,0,1.00)'
      });
    });

    test('shadowColor and shadowOpacity only', () => {
      expect(preprocess({ shadowColor: 'red', shadowOpacity: 0.5 })).toEqual({
        boxShadow: '0px 0px 0px rgba(255,0,0,0.50)'
      });
    });

    test('shadowOffset only', () => {
      expect(preprocess({ shadowOffset: { width: 1, height: 2 } })).toEqual({
        boxShadow: '1px 2px 0px rgba(0,0,0,1.00)'
      });
    });

    test('shadowRadius only', () => {
      expect(preprocess({ shadowRadius: 5 })).toEqual({
        boxShadow: '0px 0px 5px rgba(0,0,0,1.00)'
      });
    });

    test('shadowOffset, shadowRadius, shadowColor', () => {
      expect(
        preprocess({
          shadowColor: 'rgba(50,60,70,0.5)',
          shadowOffset: { width: 1, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 3
        })
      ).toEqual({
        boxShadow: '1px 2px 3px rgba(50,60,70,0.25)'
      });
    });
  });

  describe('preprocesses multiple textShadow styles into a single declaration', () => {
    test('textShadowColor only', () => {
      expect(preprocess({ textShadowColor: 'red' })).toEqual({});
    });

    test('textShadowOffset only', () => {
      expect(preprocess({ textShadowOffset: { width: 1, height: 2 } })).toEqual({});
    });

    test('textShadowRadius only', () => {
      expect(preprocess({ textShadowRadius: 5 })).toEqual({});
    });

    test('textShadowColor and textShadowOffset only', () => {
      expect(
        preprocess({
          textShadowColor: 'red',
          textShadowOffset: { width: 0, height: 0 }
        })
      ).toEqual({});
      expect(
        preprocess({
          textShadowColor: 'red',
          textShadowOffset: { width: -1, height: 0 }
        })
      ).toEqual({
        textShadow: '-1px 0px 0px rgba(255,0,0,1.00)'
      });
      expect(
        preprocess({
          textShadowColor: 'red',
          textShadowOffset: { width: 1, height: 2 }
        })
      ).toEqual({
        textShadow: '1px 2px 0px rgba(255,0,0,1.00)'
      });
    });

    test('textShadowColor and textShadowRadius only', () => {
      expect(preprocess({ textShadowColor: 'red', textShadowRadius: 0 })).toEqual({});
      expect(preprocess({ textShadowColor: 'red', textShadowRadius: 5 })).toEqual({
        textShadow: '0px 0px 5px rgba(255,0,0,1.00)'
      });
    });

    test('textShadowColor, textShadowOffset, textShadowRadius', () => {
      expect(
        preprocess({
          textShadowColor: 'rgba(50,60,70,0.50)',
          textShadowOffset: { width: 5, height: 10 },
          textShadowRadius: 15
        })
      ).toEqual({
        textShadow: '5px 10px 15px rgba(50,60,70,0.50)'
      });
    });
  });
});
