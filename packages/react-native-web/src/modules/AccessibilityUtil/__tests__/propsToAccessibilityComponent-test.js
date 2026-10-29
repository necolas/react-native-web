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

  test('when "role" is "button"', () => {
    expect(propsToAccessibilityComponent({ role: 'button' })).toEqual('button');
  });

  test('when "role" is "heading"', () => {
    expect(propsToAccessibilityComponent({ role: 'heading' })).toEqual('h1');
  });

  test('when "role" is "heading" and "aria-level" is set', () => {
    expect(
      propsToAccessibilityComponent({
        role: 'heading',
        'aria-level': 3
      })
    ).toEqual('h3');
  });

  test('when "role" is "label"', () => {
    expect(propsToAccessibilityComponent({ role: 'label' })).toEqual('label');
  });
});
