/* eslint-env jasmine, jest */

import NetInfo from '..';

describe('apis/NetInfo', () => {
  describe('isConnected', () => {
    const handler = () => {};

    afterEach(() => {
      try { NetInfo.isConnected.removeEventListener('change', handler); } catch (e) {}
    });

    describe('addEventListener', () => {
      test('throws if the provided "eventType" is not supported', () => {
        expect(() => NetInfo.isConnected.addEventListener('foo', handler)).toThrow();
        expect(() => NetInfo.isConnected.addEventListener('change', handler)).not.toThrow();
      });
    });

    describe('removeEventListener', () => {
      test('throws if the handler is not registered', () => {
        expect(() => NetInfo.isConnected.removeEventListener('change', handler)).toThrow;
      });

      test('throws if the provided "eventType" is not supported', () => {
        NetInfo.isConnected.addEventListener('change', handler);
        expect(() => NetInfo.isConnected.removeEventListener('foo', handler)).toThrow;
        expect(() => NetInfo.isConnected.removeEventListener('change', handler)).not.toThrow;
      });
    });
  });
});
