/* eslint-env jasmine, jest */

import Linking from '..';

describe('apis/Linking', () => {
  const handler = () => {};

  afterEach(() => {
    try {
      Linking.removeEventListener('url', handler);
    } catch (e) {}
  });

  describe('addEventListener', () => {
    test('throws if the provided "eventType" is not supported', () => {
      expect(() => Linking.addEventListener('foo', handler)).toThrow();
      expect(() => Linking.addEventListener('url', handler)).not.toThrow();
    });
  });

  describe('removeEventListener', () => {
    test('throws if the handler is not registered', () => {
      expect(() => Linking.removeEventListener('url', handler)).toThrow();
    });

    test('throws if the provided "eventType" is not supported', () => {
      Linking.addEventListener('url', handler);
      expect(() => Linking.removeEventListener('foo', handler)).toThrow();
      expect(() => Linking.removeEventListener('url', handler)).not.toThrow();
    });
  });
});
