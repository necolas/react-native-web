/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import splitLayoutProps from '..';

describe('modules/splitLayoutProps', () => {
  test('null style', () => {
    expect(splitLayoutProps(null)).toEqual({ inner: {}, outer: {} });
  });

  test('layout props go to outer, other props go to inner', () => {
    const style = {
      backgroundColor: 'blue',
      flex: 1,
      marginInlineStart: 10,
      marginTop: 5,
      overflowY: 'auto',
      padding: 20,
      position: 'absolute',
      transform: 'scaleY(-1)',
      width: 100
    };
    expect(splitLayoutProps(style)).toEqual({
      inner: {
        backgroundColor: 'blue',
        overflowY: 'auto',
        padding: 20
      },
      outer: {
        flex: 1,
        marginInlineStart: 10,
        marginTop: 5,
        position: 'absolute',
        transform: 'scaleY(-1)',
        width: 100
      }
    });
  });
});
