/* eslint-env jasmine, jest */

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import flattenStyle from '../flattenStyle';

describe('apis/StyleSheet/flattenStyle', () => {
  test('should merge style objects', () => {
    const style = flattenStyle([{ opacity: 1 }, { order: 2 }]);
    expect(style).toMatchSnapshot();
  });

  test('should override style properties', () => {
    const style = flattenStyle([
      { backgroundColor: '#000', order: 1 },
      { backgroundColor: '#023c69', order: null }
    ]);
    expect(style).toMatchSnapshot();
  });

  test('should overwrite properties with `undefined`', () => {
    const style = flattenStyle([{ backgroundColor: '#000' }, { backgroundColor: undefined }]);
    expect(style).toMatchSnapshot();
  });

  test('should not fail on falsy values', () => {
    expect(() => flattenStyle([null, false, undefined])).not.toThrow();
  });

  test('should recursively flatten arrays', () => {
    const style = flattenStyle([null, [], [{ order: 2 }, { opacity: 1 }], { order: 3 }]);
    expect(style).toMatchSnapshot();
  });
});
