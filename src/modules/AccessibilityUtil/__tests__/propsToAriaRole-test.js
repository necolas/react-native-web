/* eslint-env jasmine, jest */

import propsToAriaRole from '../propsToAriaRole';

describe('modules/AccessibilityUtil/propsToAriaRole', () => {
  test('when missing accessibility props', () => {
    expect(propsToAriaRole({})).toBeUndefined();
  });

  test('when "accessibilityRole" is defined', () => {
    expect(propsToAriaRole({ accessibilityRole: 'banner' })).toEqual('banner');
  });

  test('when iOS/Android accessibility prop equals "button"', () => {
    expect(propsToAriaRole({ accessibilityComponentType: 'button' })).toEqual('button');
    expect(propsToAriaRole({ accessibilityTraits: 'button' })).toEqual('button');
  });

  test('prioritizes "accessibilityRole" when defined', () => {
    expect(
      propsToAriaRole({
        accessibilityComponentType: 'button',
        accessibilityRole: 'link',
        accessibilityTraits: 'button'
      })
    ).toEqual('link');
  });
});
