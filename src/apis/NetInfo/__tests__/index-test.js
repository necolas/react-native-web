/* eslint-env jasmine, jest */

import NetInfo from '..';

describe('apis/NetInfo', () => {
  describe('getConnectionInfo', () => {
    test('fills out basic fields', done => {
      NetInfo.getConnectionInfo().then(result => {
        expect(result.effectiveType).toBeDefined();
        expect(result.type).toBeDefined();
        done();
      });
    });
  });

  describe('isConnected', () => {
    const handler = () => {};

    afterEach(() => {
      try {
        NetInfo.isConnected.removeEventListener('connectionChange', handler);
      } catch (e) {}
    });

    describe('addEventListener', () => {
      test('throws if the provided "eventType" is not supported', () => {
        expect(() => NetInfo.isConnected.addEventListener('foo', handler)).toThrow();
        expect(() =>
          NetInfo.isConnected.addEventListener('connectionChange', handler)
        ).not.toThrow();
      });
    });

    describe('removeEventListener', () => {
      test('throws if the handler is not registered', () => {
        expect(() => NetInfo.isConnected.removeEventListener('connectionChange', handler)).toThrow;
      });

      test('throws if the provided "eventType" is not supported', () => {
        NetInfo.isConnected.addEventListener('connectionChange', handler);
        expect(() => NetInfo.isConnected.removeEventListener('foo', handler)).toThrow;
        expect(() => NetInfo.isConnected.removeEventListener('connectionChange', handler)).not
          .toThrow;
      });
    });
  });
});
