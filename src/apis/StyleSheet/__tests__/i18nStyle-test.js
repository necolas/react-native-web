/* eslint-env jasmine, jest */

import I18nManager from '../../I18nManager';
import i18nStyle from '../i18nStyle';

const initial = {
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
  textShadowOffset: { width: '1rem', height: 10 },
  writingDirection: 'ltr'
};

const initialNoI18n = Object.keys(initial).reduce((acc, prop) => {
  const newProp = `${prop}$noI18n`;
  acc[newProp] = initial[prop];
  return acc;
}, {});

const expected = {
  borderLeftColor: 'blue',
  borderRightColor: 'red',
  borderTopLeftRadius: '1rem',
  borderTopRightRadius: 10,
  borderBottomLeftRadius: '2rem',
  borderBottomRightRadius: 20,
  borderLeftStyle: 'dotted',
  borderRightStyle: 'solid',
  borderLeftWidth: 6,
  borderRightWidth: 5,
  left: 2,
  marginLeft: 8,
  marginRight: 7,
  paddingLeft: 10,
  paddingRight: 9,
  right: 1,
  textAlign: 'right',
  textShadowOffset: { width: '-1rem', height: 10 },
  writingDirection: 'rtl'
};

describe('apis/StyleSheet/i18nStyle', () => {
  describe('LTR mode', () => {
    beforeEach(() => {
      I18nManager.allowRTL(false);
    });

    afterEach(() => {
      I18nManager.allowRTL(true);
    });

    it('does not auto-flip', () => {
      expect(i18nStyle(initial)).toEqual(initial);
    });
    it('normalizes properties', () => {
      expect(i18nStyle(initialNoI18n)).toEqual(initial);
    });
  });

  describe('RTL mode', () => {
    beforeEach(() => {
      I18nManager.forceRTL(true);
    });

    afterEach(() => {
      I18nManager.forceRTL(false);
    });

    it('does auto-flip', () => {
      expect(i18nStyle(initial)).toEqual(expected);
    });
    it('normalizes properties', () => {
      expect(i18nStyle(initialNoI18n)).toEqual(initial);
    });
  });
});
