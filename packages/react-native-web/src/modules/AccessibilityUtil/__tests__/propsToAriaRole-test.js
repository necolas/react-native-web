/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import propsToAriaRole from '../propsToAriaRole';

describe('modules/AccessibilityUtil/propsToAriaRole', () => {
  test('when missing accessibility props', () => {
    expect(propsToAriaRole({})).toBeUndefined();
  });

  test('when "role" is defined', () => {
    expect(propsToAriaRole({ role: 'banner' })).toEqual('banner');
    // @deprecated
    expect(propsToAriaRole({ accessibilityRole: 'banner' })).toEqual('banner');
  });

  test('when "role" is defined', () => {
    expect(propsToAriaRole({ role: 'banner' })).toEqual('banner');
    // @deprecated
    expect(propsToAriaRole({ accessibilityRole: 'banner' })).toEqual('banner');
  });

  test('when "role" is "none"', () => {
    expect(propsToAriaRole({ role: 'none' })).toEqual('presentation');
  });

  test('when "role" is "label" (non-standard)', () => {
    expect(propsToAriaRole({ role: 'label' })).toEqual(undefined);
  });

  // @deprecated
  test('when "accessibilityRole" is a native-only value', () => {
    expect(propsToAriaRole({ accessibilityRole: 'none' })).toEqual(
      'presentation'
    );
    expect(propsToAriaRole({ accessibilityRole: 'imagebutton' })).toEqual(
      undefined
    );
    // not really native-only, but used to allow Web to render <label> around TextInput
    expect(propsToAriaRole({ accessibilityRole: 'label' })).toEqual(undefined);
  });
});
