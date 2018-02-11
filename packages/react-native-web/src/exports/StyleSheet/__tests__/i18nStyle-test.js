/* eslint-env jasmine, jest */

import I18nManager from '../../I18nManager';
import i18nStyle from '../i18nStyle';

const styleLeftRight = {
  borderLeftColor: 'red',
  borderRightColor: 'blue',
  borderTopLeftRadius: 10,
  borderTopRightRadius: '1rem',
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: '2rem',
  borderLeftStyle: 'solid',
  borderRightStyle: 'dotted',
  borderLeftWidth: 5,
  borderRightWidth: 6,
  left: 1,
  marginLeft: 7,
  marginRight: 8,
  paddingLeft: 9,
  paddingRight: 10,
  right: 2,
  textAlign: 'left',
  textShadowOffset: { width: '1rem', height: 10 }
};

const styleStartEnd = {
  borderStartColor: 'red',
  borderEndColor: 'blue',
  borderTopStartRadius: 10,
  borderTopEndRadius: '1rem',
  borderBottomStartRadius: 20,
  borderBottomEndRadius: '2rem',
  borderStartStyle: 'solid',
  borderEndStyle: 'dotted',
  borderStartWidth: 5,
  borderEndWidth: 6,
  start: 1,
  marginStart: 7,
  marginEnd: 8,
  paddingStart: 9,
  paddingEnd: 10,
  end: 2,
  textAlign: 'start',
  textShadowOffset: { width: '1rem', height: 10 }
};

describe('StyleSheet/i18nStyle', () => {
  describe('LTR mode', () => {
    beforeEach(() => {
      I18nManager.allowRTL(false);
    });

    afterEach(() => {
      I18nManager.allowRTL(true);
    });

    test("doesn't flip left/right", () => {
      expect(i18nStyle(styleLeftRight)).toMatchSnapshot();
    });

    test("converts and doesn't flip start/end", () => {
      expect(i18nStyle(styleStartEnd)).toMatchSnapshot();
    });

    test('start/end takes precedence over left/right', () => {
      const style = {
        borderTopStartRadius: 10,
        borderTopLeftRadius: 0,
        end: 10,
        right: 0,
        marginStart: 10,
        marginLeft: 0
      };
      const expected = {
        borderTopLeftRadius: 10,
        marginLeft: 10,
        right: 10
      };
      expect(i18nStyle(style)).toEqual(expected);
    });
  });

  describe('RTL mode', () => {
    beforeEach(() => {
      I18nManager.forceRTL(true);
    });

    afterEach(() => {
      I18nManager.forceRTL(false);
    });

    test('flips left/right', () => {
      expect(i18nStyle(styleLeftRight)).toMatchSnapshot();
    });

    test('converts and flips start/end', () => {
      expect(i18nStyle(styleStartEnd)).toMatchSnapshot();
    });

    test('start/end takes precedence over left/right', () => {
      const style = {
        borderTopStartRadius: 10,
        borderTopLeftRadius: 0,
        end: 10,
        right: 0,
        marginStart: 10,
        marginLeft: 0
      };
      const expected = {
        borderTopRightRadius: 10,
        marginRight: 10,
        left: 10
      };
      expect(i18nStyle(style)).toEqual(expected);
    });
  });
});
