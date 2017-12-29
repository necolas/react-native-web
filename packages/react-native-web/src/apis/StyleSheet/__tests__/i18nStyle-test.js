/* eslint-env jasmine, jest */

import I18nManager from '../../I18nManager';
import i18nStyle from '../i18nStyle';

const style = {
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

describe('apis/StyleSheet/i18nStyle', () => {
  describe('LTR mode', () => {
    beforeEach(() => {
      I18nManager.allowRTL(false);
    });

    afterEach(() => {
      I18nManager.allowRTL(true);
    });

    test('does not auto-flip', () => {
      expect(i18nStyle(style)).toMatchSnapshot();
    });
  });

  describe('RTL mode', () => {
    beforeEach(() => {
      I18nManager.forceRTL(true);
    });

    afterEach(() => {
      I18nManager.forceRTL(false);
    });

    test('does auto-flip', () => {
      expect(i18nStyle(style)).toMatchSnapshot();
    });
  });
});
