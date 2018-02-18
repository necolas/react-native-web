/* eslint-env jasmine, jest */

import I18nManager from '../../I18nManager';
import i18nStyle from '../i18nStyle';

describe('StyleSheet/i18nStyle', () => {
  describe('isRTL is false', () => {
    beforeEach(() => {
      I18nManager.allowRTL(false);
    });

    afterEach(() => {
      I18nManager.allowRTL(true);
    });

    test('converts end/start properties', () => {
      const initial = {
        borderStartColor: 'red',
        start: 1,
        marginStart: 5,
        paddingEnd: 10
      };
      const expected = {
        borderLeftColor: 'red',
        left: 1,
        marginLeft: 5,
        paddingRight: 10
      };
      expect(i18nStyle(initial)).toEqual(expected);
    });

    test('converts end/start values', () => {
      const initial = {
        float: 'start',
        textAlign: 'end'
      };
      const expected = {
        float: 'left',
        textAlign: 'right'
      };
      expect(i18nStyle(initial)).toEqual(expected);
    });

    test('noop on left/right properties', () => {
      const initial = {
        paddingLeft: 0,
        left: 0,
        marginRight: 0,
        paddingRight: 10
      };
      expect(i18nStyle(initial)).toEqual(initial);
    });

    test('noop on left/right values', () => {
      const initial = {
        clear: 'left',
        float: 'left',
        textAlign: 'right',
        textShadowOffset: { width: '1rem', height: 10 }
      };
      expect(i18nStyle(initial)).toEqual(initial);
    });

    test('end/start properties take precedence', () => {
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

  describe('isRTL is true', () => {
    beforeEach(() => {
      I18nManager.forceRTL(true);
    });

    afterEach(() => {
      I18nManager.forceRTL(false);
    });

    describe('doLeftAndRightSwapInRTL is false', () => {
      beforeEach(() => {
        I18nManager.swapLeftAndRightInRTL(false);
      });

      afterEach(() => {
        I18nManager.swapLeftAndRightInRTL(true);
      });

      test('converts end/start properties', () => {
        const initial = {
          borderStartColor: 'red',
          start: 1,
          marginStart: 5,
          paddingEnd: 10
        };
        const expected = {
          borderRightColor: 'red',
          right: 1,
          marginRight: 5,
          paddingLeft: 10
        };
        expect(i18nStyle(initial)).toEqual(expected);
      });

      test('converts end/start values', () => {
        const initial = {
          float: 'start',
          textAlign: 'end'
        };
        const expected = {
          float: 'right',
          textAlign: 'left'
        };
        expect(i18nStyle(initial)).toEqual(expected);
      });

      test('noop on left/right properties', () => {
        const initial = {
          paddingLeft: 0,
          left: 0,
          marginRight: 0,
          paddingRight: 10
        };
        expect(i18nStyle(initial)).toEqual(initial);
      });

      test('noop on left/right values', () => {
        const initial = {
          clear: 'left',
          float: 'left',
          textAlign: 'right',
          textShadowOffset: { width: '1rem', height: 10 }
        };
        expect(i18nStyle(initial)).toEqual(initial);
      });

      test('end/start properties take precedence', () => {
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

    describe('doLeftAndRightSwapInRTL is true', () => {
      test('converts end/start properties', () => {
        const initial = {
          borderStartColor: 'red',
          start: 1,
          marginStart: 5,
          paddingEnd: 10
        };
        const expected = {
          borderRightColor: 'red',
          right: 1,
          marginRight: 5,
          paddingLeft: 10
        };
        expect(i18nStyle(initial)).toEqual(expected);
      });

      test('converts end/start values', () => {
        const initial = {
          float: 'start',
          textAlign: 'end'
        };
        const expected = {
          float: 'right',
          textAlign: 'left'
        };
        expect(i18nStyle(initial)).toEqual(expected);
      });

      test('converts left/right properties', () => {
        const initial = {
          borderLeftColor: 'red',
          left: 1,
          marginLeft: 5,
          paddingRight: 10
        };
        const expected = {
          borderRightColor: 'red',
          right: 1,
          marginRight: 5,
          paddingLeft: 10
        };
        expect(i18nStyle(initial)).toEqual(expected);
      });

      test('converts left/right values', () => {
        const initial = {
          float: 'left',
          textAlign: 'right',
          textShadowOffset: { width: '1rem', height: 10 }
        };
        const expected = {
          float: 'right',
          textAlign: 'left',
          textShadowOffset: { width: '-1rem', height: 10 }
        };
        expect(i18nStyle(initial)).toEqual(expected);
      });

      test('end/start properties take precedence', () => {
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
  });
});
