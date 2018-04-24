/* eslint-env jasmine, jest */

import Platform from '../';

describe('apis/Platform', () => {
  describe('select', () => {
    test('supports "default"', () => {
      expect(Platform.select({ default: 'default' })).toEqual('default');
    });

    test('chooses "web"', () => {
      expect(
        Platform.select({ android: 'android', ios: 'ios', web: 'web', default: 'default' })
      ).toEqual('web');
    });
  });
});
