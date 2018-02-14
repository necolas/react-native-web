/* eslint-env jasmine, jest */

import I18nManager from '../../I18nManager';
import i18nStyle from '../i18nStyle';

describe('StyleSheet/i18nStyle', () => {
  describe('isRTL = false', () => {
    beforeEach(() => {
      I18nManager.allowRTL(false);
    });

    afterEach(() => {
      I18nManager.allowRTL(true);
    });

    test("doesn't flip left/right", () => {
      const initial = {
        borderLeftColor: 'red',
        left: 1,
        marginLeft: 5,
        paddingRight: 10,
        textAlign: 'right',
        textShadowOffset: { width: '1rem', height: 10 }
      };

      expect(i18nStyle(initial)).toEqual(initial);
    });

    test("converts and doesn't flip start/end", () => {
      const initial = {
        borderStartColor: 'red',
        start: 1,
        marginStart: 5,
        paddingEnd: 10,
        textAlign: 'end',
        textShadowOffset: { width: '1rem', height: 10 }
      };

      const expected = {
        borderLeftColor: 'red',
        left: 1,
        marginLeft: 5,
        paddingRight: 10,
        textAlign: 'right',
        textShadowOffset: { width: '1rem', height: 10 }
      };

      expect(i18nStyle(initial)).toEqual(expected);
    });

    test('start/end takes precedence over left/right', () => {
      const initial = {
        borderStartWidth: 10,
        borderLeftWidth: 0,
        end: 10,
        right: 0,
        marginStart: 10,
        marginLeft: 0
      };
      const expected = {
        borderLeftWidth: 10,
        marginLeft: 10,
        right: 10
      };
      expect(i18nStyle(initial)).toEqual(expected);
    });
  });

  describe('isRTL = true', () => {
    beforeEach(() => {
      I18nManager.forceRTL(true);
    });

    afterEach(() => {
      I18nManager.forceRTL(false);
    });

    describe('doLeftAndRightSwapInRTL = true', () => {
      test('flips left/right', () => {
        const initial = {
          borderLeftColor: 'red',
          left: 1,
          marginLeft: 5,
          paddingRight: 10,
          textAlign: 'right',
          textShadowOffset: { width: '1rem', height: 10 }
        };

        const expected = {
          borderRightColor: 'red',
          right: 1,
          marginRight: 5,
          paddingLeft: 10,
          textAlign: 'left',
          textShadowOffset: { width: '-1rem', height: 10 }
        };

        expect(i18nStyle(initial)).toEqual(expected);
      });

      test('converts and flips start/end', () => {
        const initial = {
          borderStartColor: 'red',
          start: 1,
          marginStart: 5,
          paddingEnd: 10,
          textAlign: 'end'
        };

        const expected = {
          borderRightColor: 'red',
          right: 1,
          marginRight: 5,
          paddingLeft: 10,
          textAlign: 'left'
        };

        expect(i18nStyle(initial)).toEqual(expected);
      });

      test('start/end takes precedence over left/right', () => {
        const style = {
          borderStartWidth: 10,
          borderLeftWidth: 0,
          end: 10,
          right: 0,
          marginStart: 10,
          marginLeft: 0
        };
        const expected = {
          borderRightWidth: 10,
          marginRight: 10,
          left: 10
        };
        expect(i18nStyle(style)).toEqual(expected);
      });
    });

    describe('doLeftAndRightSwapInRTL = false', () => {
      beforeEach(() => {
        I18nManager.swapLeftAndRightInRTL(false);
      });

      afterEach(() => {
        I18nManager.swapLeftAndRightInRTL(true);
      });

      test("doesn't flip left/right", () => {
        const initial = {
          borderLeftColor: 'red',
          left: 1,
          marginLeft: 5,
          paddingRight: 10,
          textAlign: 'right',
          textShadowOffset: { width: '1rem', height: 10 }
        };

        expect(i18nStyle(initial)).toEqual(initial);
      });

      test('converts start/end', () => {
        const initial = {
          borderStartColor: 'red',
          start: 1,
          marginStart: 5,
          paddingEnd: 10,
          textAlign: 'end'
        };

        const expected = {
          borderRightColor: 'red',
          right: 1,
          marginRight: 5,
          paddingLeft: 10,
          textAlign: 'left'
        };

        expect(i18nStyle(initial)).toEqual(expected);
      });

      test('start/end takes precedence over left/right', () => {
        const style = {
          borderStartWidth: 10,
          borderRightWidth: 0,
          end: 10,
          left: 0,
          marginStart: 10,
          marginRight: 0
        };
        const expected = {
          borderRightWidth: 10,
          marginRight: 10,
          left: 10
        };
        expect(i18nStyle(style)).toEqual(expected);
      });
    });
  });
});
