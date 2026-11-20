/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Platform from '../';

describe('apis/Platform', () => {
  describe('select', () => {
    test('supports "default"', () => {
      expect(Platform.select({ default: 'default' })).toEqual('default');
    });

    test('chooses "web"', () => {
      expect(
        Platform.select({
          android: 'android',
          ios: 'ios',
          web: 'web',
          default: 'default'
        })
      ).toEqual('web');
    });
  });

  describe('isTesting', () => {
    const NODE_ENV_BACKUP = process.env.NODE_ENV;

    afterEach(() => {
      process.env.NODE_ENV = NODE_ENV_BACKUP;
    });

    test('true when NODE_ENV is "test"', () => {
      process.env.NODE_ENV = 'test';
      expect(Platform.isTesting).toEqual(true);
    });

    test('false when NODE_ENV is not "test"', () => {
      process.env.NODE_ENV = 'development';
      expect(Platform.isTesting).toEqual(false);
    });
  });
});
