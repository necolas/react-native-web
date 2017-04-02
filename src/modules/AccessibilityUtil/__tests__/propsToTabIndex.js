/* eslint-env jasmine, jest */

import propsToTabIndex from '../propsToTabIndex';

describe('modules/AccessibilityUtil/propsToTabIndex', () => {
  test('returns undefined when missing accessibility props', () => {
    expect(propsToTabIndex({})).toBeUndefined();
  });

  describe('with focusable accessibilityRole', () => {
    test('returns "undefined" by default', () => {
      expect(propsToTabIndex({ accessibilityRole: 'button' })).toBeUndefined();
      expect(propsToTabIndex({ accessibilityRole: 'link' })).toBeUndefined();
    });

    test('returns "undefined" when "accessible" is true', () => {
      expect(propsToTabIndex({ accessibilityRole: 'button', accessible: true })).toBeUndefined();
    });

    test('returns "-1" when "accessible" is false', () => {
      expect(propsToTabIndex({ accessibilityRole: 'button', accessible: false })).toEqual('-1');
    });

    test('returns "-1" when "disabled" is true', () => {
      expect(propsToTabIndex({ accessibilityRole: 'button', disabled: true })).toEqual('-1');
    });

    test('returns "undefined" when "disabled" is false', () => {
      expect(propsToTabIndex({ accessibilityRole: 'button', disabled: false })).toBeUndefined();
    });

    test('returns "-1" when "importantForAccessibility" is "no"', () => {
      expect(
        propsToTabIndex({ accessibilityRole: 'button', importantForAccessibility: 'no' })
      ).toEqual('-1');
    });

    test('returns "-1" when "importantForAccessibility" is "no-hide-descendants"', () => {
      expect(
        propsToTabIndex({
          accessibilityRole: 'button',
          importantForAccessibility: 'no-hide-descendants'
        })
      ).toEqual('-1');
    });
  });

  describe('with unfocusable accessibilityRole', () => {
    test('returns "undefined" by default', () => {
      expect(propsToTabIndex({})).toBeUndefined();
    });

    test('returns "0" when "accessible" is true', () => {
      expect(propsToTabIndex({ accessible: true })).toEqual('0');
    });

    test('returns "undefined" when "accessible" is false', () => {
      expect(propsToTabIndex({ accessible: false })).toBeUndefined();
    });

    test('returns "undefined" when "importantForAccessibility" is "no"', () => {
      expect(propsToTabIndex({ importantForAccessibility: 'no' })).toBeUndefined();
      expect(
        propsToTabIndex({ accessible: true, importantForAccessibility: 'no' })
      ).toBeUndefined();
    });

    test('returns "undefined" when "importantForAccessibility" is "no-hide-descendants"', () => {
      expect(
        propsToTabIndex({ accessible: true, importantForAccessibility: 'no-hide-descendants' })
      ).toBeUndefined();
    });
  });
});
