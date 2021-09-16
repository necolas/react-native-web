/* eslint-env jasmine, jest */

import AppState from '..';

describe('apis/AppState', () => {
  const handler = () => {};

  describe('addEventListener', () => {
    test('throws if the provided "eventType" is not supported', () => {
      expect(() => AppState.addEventListener('foo', handler)).toThrow();
      expect(() => AppState.addEventListener('change', handler).remove()).not.toThrow();
    });
  });

  describe('removeEventListener', () => {
    beforeEach(() => {
      // removeEventListener logs a deprecation warning, ignore
      jest.spyOn(console, 'error');
      console.error.mockImplementation(() => {});
    });

    afterEach(() => {
      console.error.mockRestore();
    });

    test('throws if the provided "eventType" is not supported', () => {
      AppState.addEventListener('change', handler);
      expect(() => AppState.removeEventListener('foo', handler)).toThrow();
      expect(() => AppState.removeEventListener('change', handler)).not.toThrow();
    });
  });
});
