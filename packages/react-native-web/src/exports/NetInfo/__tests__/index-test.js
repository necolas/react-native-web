/* eslint-env jasmine, jest */

import NetInfo from '..';

const handler = () => {};

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

  describe('addEventListener', () => {
    test('throws if the provided "eventType" is not supported', () => {
      expect(() => NetInfo.addEventListener('foo', handler)).toThrow();
    });
  });

  describe('removeEventListener', () => {
    test('throws if the provided "eventType" is not supported', () => {
      expect(() => NetInfo.removeEventListener('foo', handler)).toThrow();
    });
    test('throws if the handler is not registered', () => {
      expect(() => NetInfo.removeEventListener('connectionChange', handler)).toThrow();
    });
  });

  describe('isConnected', () => {
    afterEach(() => {
      try {
        NetInfo.isConnected.removeEventListener('connectionChange', handler);
      } catch (e) {}
    });

    describe('fetch', () => {
      test('returns a boolean', done => {
        NetInfo.isConnected.fetch().then(isConnected => {
          expect(isConnected).toBe(true);
          done();
        });
      });
    });

    describe('addEventListener', () => {
      test('throws if the provided "eventType" is not supported', () => {
        expect(() => NetInfo.isConnected.addEventListener('foo', handler)).toThrow();
      });
    });

    describe('removeEventListener', () => {
      test('throws if the provided "eventType" is not supported', () => {
        NetInfo.isConnected.addEventListener('connectionChange', handler);
        expect(() => NetInfo.isConnected.removeEventListener('foo', handler)).toThrow();
      });
      test('throws if the handler is not registered', () => {
        expect(() =>
          NetInfo.isConnected.removeEventListener('connectionChange', handler)
        ).toThrow();
      });
    });
  });
});
