/* eslint-env jasmine, jest */

import I18nManager from '..';

describe('apis/I18nManager', () => {
  describe('when RTL not enabled', () => {
    beforeEach(() => {
      I18nManager.setPreferredLanguageRTL(false);
    });

    it('is "false" by default', () => {
      expect(I18nManager.isRTL).toEqual(false);
      expect(document.documentElement.getAttribute('dir')).toEqual('ltr');
    });

    it('is "true" when forced', () => {
      I18nManager.forceRTL(true);
      expect(I18nManager.isRTL).toEqual(true);
      expect(document.documentElement.getAttribute('dir')).toEqual('rtl');
      I18nManager.forceRTL(false);
    });
  });

  describe('when RTL is enabled', () => {
    beforeEach(() => {
      I18nManager.setPreferredLanguageRTL(true);
    });

    afterEach(() => {
      I18nManager.setPreferredLanguageRTL(false);
    });

    it('is "true" by default', () => {
      expect(I18nManager.isRTL).toEqual(true);
      expect(document.documentElement.getAttribute('dir')).toEqual('rtl');
    });

    it('is "false" when not allowed', () => {
      I18nManager.allowRTL(false);
      expect(I18nManager.isRTL).toEqual(false);
      expect(document.documentElement.getAttribute('dir')).toEqual('ltr');
      I18nManager.allowRTL(true);
    });
  });
});
