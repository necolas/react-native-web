/* eslint-env jasmine, jest */

import getAccessibilityRole from '..';

describe('modules/getAccessibilityRole', () => {
  test('returns undefined when missing accessibility props', () => {
    expect(getAccessibilityRole({})).toBeUndefined();
  });

  test('returns value of "accessibilityRole" when defined', () => {
    expect(getAccessibilityRole({ accessibilityRole: 'banner' })).toEqual('banner');
  });

  test('returns "button" when iOS/Android accessibility prop equals "button"', () => {
    expect(getAccessibilityRole({ accessibilityComponentType: 'button' })).toEqual('button');
    expect(getAccessibilityRole({ accessibilityTraits: 'button' })).toEqual('button');
  });

  test('prioritizes "accessibilityRole" when defined', () => {
    expect(
      getAccessibilityRole({
        accessibilityComponentType: 'button',
        accessibilityRole: 'link',
        accessibilityTraits: 'button'
      })
    ).toEqual('link');
  });
});
