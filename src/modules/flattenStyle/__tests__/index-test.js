/* eslint-env jasmine, jest */

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import flattenStyle from '..';

describe('modules/flattenStyle', () => {
  it('should merge style objects', () => {
    const style1 = { opacity: 1 };
    const style2 = { order: 2 };
    const flatStyle = flattenStyle([ style1, style2 ]);
    expect(flatStyle.opacity).toEqual(1);
    expect(flatStyle.order).toEqual(2);
  });

  it('should override style properties', () => {
    const style1 = { backgroundColor: '#000', order: 1 };
    const style2 = { backgroundColor: '#023c69', order: null };
    const flatStyle = flattenStyle([ style1, style2 ]);
    expect(flatStyle.backgroundColor).toEqual('#023c69');
    expect(flatStyle.order).toBe(null);
  });

  it('should overwrite properties with `undefined`', () => {
    const style1 = { backgroundColor: '#000' };
    const style2 = { backgroundColor: undefined };
    const flatStyle = flattenStyle([ style1, style2 ]);
    expect(flatStyle.backgroundColor).toBe(undefined);
  });

  it('should not fail on falsy values', () => {
    expect(() => flattenStyle([ null, false, undefined ])).not.toThrow();
  });

  it('should recursively flatten arrays', () => {
    const style1 = { order: 2 };
    const style2 = { opacity: 1 };
    const style3 = { order: 3 };
    const flatStyle = flattenStyle([ null, [], [ style1, style2 ], style3 ]);
    expect(flatStyle.order).toEqual(3);
    expect(flatStyle.opacity).toEqual(1);
  });
});
