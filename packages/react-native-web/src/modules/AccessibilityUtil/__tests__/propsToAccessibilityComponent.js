/* eslint-env jasmine, jest */

import propsToAccessibilityComponent from '../propsToAccessibilityComponent';

describe('modules/AccessibilityUtil/propsToAccessibilityComponent', () => {
  test('when missing accessibility props"', () => {
    expect(propsToAccessibilityComponent({})).toBeUndefined();
  });

  test('when "accessibilityRole" is "button"', () => {
    expect(propsToAccessibilityComponent({ accessibilityRole: 'button' })).toBeUndefined();
  });

  test('when "accessibilityRole" is "heading"', () => {
    expect(propsToAccessibilityComponent({ accessibilityRole: 'heading' })).toEqual('h1');
  });

  test('when "accessibilityRole" is "heading" and "aria-level" is set', () => {
    expect(
      propsToAccessibilityComponent({ accessibilityRole: 'heading', 'aria-level': 3 })
    ).toEqual('h3');
  });

  test('when "accessibilityRole" is "label"', () => {
    expect(propsToAccessibilityComponent({ accessibilityRole: 'label' })).toEqual('label');
  });
});
