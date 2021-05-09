/* eslint-env jasmine, jest */

import I18nManager from '..';

const getDocumentDir = () => document.documentElement.getAttribute('dir');

describe('apis/I18nManager', () => {
  describe('preferred language is LTR', () => {
    beforeEach(() => {
      I18nManager.setPreferredLanguageRTL(false);
    });

    describe('isRTL', () => {
      test('is false', () => {
        expect(I18nManager.getConstants().isRTL).toBe(false);
        expect(getDocumentDir()).toEqual('ltr');
      });
    });

    describe('forceRTL', () => {
      afterEach(() => {
        I18nManager.forceRTL(false);
      });

      test('when set to false, "isRTL" is false', () => {
        I18nManager.forceRTL(false);
        expect(I18nManager.getConstants().isRTL).toBe(false);
        expect(getDocumentDir()).toEqual('ltr');
      });
      test('when set to true, "isRTL" is true', () => {
        I18nManager.forceRTL(true);
        expect(I18nManager.getConstants().isRTL).toBe(true);
        expect(getDocumentDir()).toEqual('rtl');
      });
    });

    describe('swapLeftAndRightInRTL', () => {
      afterEach(() => {
        I18nManager.swapLeftAndRightInRTL(true);
      });

      test('when set to false, "doLeftAndRightSwapInRTL" is false', () => {
        I18nManager.swapLeftAndRightInRTL(false);
        expect(I18nManager.getConstants().doLeftAndRightSwapInRTL).toBe(false);
      });
      test('when set to true, "doLeftAndRightSwapInRTL" is true', () => {
        I18nManager.swapLeftAndRightInRTL(true);
        expect(I18nManager.getConstants().doLeftAndRightSwapInRTL).toBe(true);
      });
    });
  });

  describe('preferred language is RTL', () => {
    beforeEach(() => {
      I18nManager.setPreferredLanguageRTL(true);
    });

    afterAll(() => {
      I18nManager.setPreferredLanguageRTL(false);
    });

    describe('isRTL', () => {
      test('is true', () => {
        expect(I18nManager.getConstants().isRTL).toBe(true);
        expect(getDocumentDir()).toEqual('rtl');
      });
    });

    describe('allowRTL', () => {
      afterEach(() => {
        I18nManager.allowRTL(true);
      });

      test('when set to false, "isRTL" is false', () => {
        I18nManager.allowRTL(false);
        expect(I18nManager.getConstants().isRTL).toBe(false);
        expect(getDocumentDir()).toEqual('ltr');
      });
      test('when set to true, "isRTL" is true', () => {
        I18nManager.allowRTL(true);
        expect(I18nManager.getConstants().isRTL).toBe(true);
        expect(getDocumentDir()).toEqual('rtl');
      });
    });

    describe('forceRTL', () => {
      afterEach(() => {
        I18nManager.forceRTL(false);
      });

      test('when set to false, "isRTL" is true', () => {
        I18nManager.forceRTL(false);
        expect(I18nManager.getConstants().isRTL).toBe(true);
        expect(getDocumentDir()).toEqual('rtl');
      });
      test('when set to true, "isRTL" is true', () => {
        I18nManager.forceRTL(true);
        expect(I18nManager.getConstants().isRTL).toBe(true);
        expect(getDocumentDir()).toEqual('rtl');
      });
    });

    describe('swapLeftAndRightInRTL', () => {
      afterEach(() => {
        I18nManager.swapLeftAndRightInRTL(true);
      });

      test('when set to false, "doLeftAndRightSwapInRTL" is false', () => {
        I18nManager.swapLeftAndRightInRTL(false);
        expect(I18nManager.getConstants().doLeftAndRightSwapInRTL).toBe(false);
      });
      test('when set to true, "doLeftAndRightSwapInRTL" is true', () => {
        I18nManager.swapLeftAndRightInRTL(true);
        expect(I18nManager.getConstants().doLeftAndRightSwapInRTL).toBe(true);
      });
    });
  });
});
