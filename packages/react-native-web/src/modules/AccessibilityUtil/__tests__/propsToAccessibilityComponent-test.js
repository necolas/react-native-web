/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import propsToAccessibilityComponent from '../propsToAccessibilityComponent';

describe('modules/AccessibilityUtil/propsToAccessibilityComponent', () => {
  test('when missing accessibility props"', () => {
    expect(propsToAccessibilityComponent({})).toBeUndefined();
  });

  test('when "accessibilityRole" is "button"', () => {
    expect(
      propsToAccessibilityComponent({ accessibilityRole: 'button' })
    ).toEqual('button');
  });

  test('when "accessibilityRole" is "heading"', () => {
    expect(
      propsToAccessibilityComponent({ accessibilityRole: 'heading' })
    ).toEqual('h1');
  });

  test('when "accessibilityRole" is "heading" and "aria-level" is set', () => {
    expect(
      propsToAccessibilityComponent({
        accessibilityRole: 'heading',
        'aria-level': 3
      })
    ).toEqual('h3');
  });

  test('when "accessibilityRole" is "heading" and "accessibilityLevel" is set', () => {
    expect(
      propsToAccessibilityComponent({
        accessibilityRole: 'heading',
        accessibilityLevel: 3
      })
    ).toEqual('h3');
  });

  test('when "accessibilityRole" is "label"', () => {
    expect(
      propsToAccessibilityComponent({ accessibilityRole: 'label' })
    ).toEqual('label');
  });
});
