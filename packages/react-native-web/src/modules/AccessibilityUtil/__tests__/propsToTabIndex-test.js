/* eslint-env jasmine, jest */

import propsToTabIndex from '../propsToTabIndex';

describe('modules/AccessibilityUtil/propsToTabIndex', () => {
  test('with no accessibility props', () => {
    expect(propsToTabIndex({})).toBeUndefined();
  });

  describe('"accessibilityRole" of "link"', () => {
    const accessibilityRole = 'link';

    test('default case', () => {
      expect(propsToTabIndex({ accessibilityRole })).toBeUndefined();
    });

    test('when "accessible" is true', () => {
      expect(propsToTabIndex({ accessibilityRole, accessible: true })).toBeUndefined();
    });

    test('when "accessible" is false', () => {
      expect(propsToTabIndex({ accessibilityRole, accessible: false })).toEqual('-1');
    });

    test('when "disabled" is true', () => {
      expect(propsToTabIndex({ accessibilityRole, disabled: true })).toEqual('-1');
      expect(propsToTabIndex({ accessibilityRole, 'aria-disabled': true })).toEqual('-1');
    });

    test('when "disabled" is false', () => {
      expect(propsToTabIndex({ accessibilityRole, disabled: false })).toBeUndefined();
      expect(propsToTabIndex({ accessibilityRole, 'aria-disabled': false })).toBeUndefined();
    });

    test('when "importantForAccessibility" is "no"', () => {
      expect(propsToTabIndex({ accessibilityRole, importantForAccessibility: 'no' })).toEqual('-1');
    });

    test('when "importantForAccessibility" is "no-hide-descendants"', () => {
      expect(
        propsToTabIndex({
          accessibilityRole,
          importantForAccessibility: 'no-hide-descendants'
        })
      ).toEqual('-1');
    });
  });

  describe('"accessibilityRole" of "button"', () => {
    const accessibilityRole = 'button';

    test('default case', () => {
      expect(propsToTabIndex({ accessibilityRole })).toEqual('0');
    });

    test('when "accessible" is true', () => {
      expect(propsToTabIndex({ accessibilityRole, accessible: true })).toEqual('0');
    });

    test('when "accessible" is false', () => {
      expect(propsToTabIndex({ accessibilityRole, accessible: false })).toBeUndefined();
    });

    test('when "disabled" is true', () => {
      expect(propsToTabIndex({ accessibilityRole, disabled: true })).toBeUndefined();
      expect(propsToTabIndex({ accessibilityRole, 'aria-disabled': true })).toBeUndefined();
    });

    test('when "disabled" is false', () => {
      expect(propsToTabIndex({ accessibilityRole, disabled: false })).toEqual('0');
      expect(propsToTabIndex({ accessibilityRole, 'aria-disabled': false })).toEqual('0');
    });

    test('when "importantForAccessibility" is "no"', () => {
      expect(
        propsToTabIndex({ accessibilityRole, importantForAccessibility: 'no' })
      ).toBeUndefined();
    });

    test('when "importantForAccessibility" is "no-hide-descendants"', () => {
      expect(
        propsToTabIndex({
          accessibilityRole,
          importantForAccessibility: 'no-hide-descendants'
        })
      ).toBeUndefined();
    });
  });

  describe('with unfocusable accessibilityRole', () => {
    test('default case', () => {
      expect(propsToTabIndex({})).toBeUndefined();
    });

    test('when "accessible" is true', () => {
      expect(propsToTabIndex({ accessible: true })).toEqual('0');
    });

    test('when "accessible" is false', () => {
      expect(propsToTabIndex({ accessible: false })).toBeUndefined();
    });

    test('when "importantForAccessibility" is "no"', () => {
      expect(propsToTabIndex({ importantForAccessibility: 'no' })).toBeUndefined();
      expect(
        propsToTabIndex({ accessible: true, importantForAccessibility: 'no' })
      ).toBeUndefined();
    });

    test('when "importantForAccessibility" is "no-hide-descendants"', () => {
      expect(
        propsToTabIndex({ accessible: true, importantForAccessibility: 'no-hide-descendants' })
      ).toBeUndefined();
    });
  });
});
