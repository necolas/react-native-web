/* eslint-env jasmine, jest */

import AppState from '..';

describe('apis/AppState', () => {
  const handler = () => {};

  afterEach(() => {
    try {
      AppState.removeEventListener('change', handler);
    } catch (e) {}
  });

  describe('addEventListener', () => {
    test('throws if the provided "eventType" is not supported', () => {
      expect(() => AppState.addEventListener('foo', handler)).toThrow();
      expect(() => AppState.addEventListener('change', handler)).not.toThrow();
    });
  });

  describe('removeEventListener', () => {
    test('throws if the handler is not registered', () => {
      expect(() => AppState.removeEventListener('change', handler)).toThrow();
    });

    test('throws if the provided "eventType" is not supported', () => {
      AppState.addEventListener('change', handler);
      expect(() => AppState.removeEventListener('foo', handler)).toThrow();
      expect(() => AppState.removeEventListener('change', handler)).not.toThrow();
    });
  });
});
