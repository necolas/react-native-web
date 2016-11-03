/* eslint-env mocha */

import NetInfo from '..';
import assert from 'assert';

suite('apis/NetInfo', () => {
  suite('isConnected', () => {
    const handler = () => {};

    teardown(() => {
      try { NetInfo.isConnected.removeEventListener('change', handler); } catch (e) {}
    });

    suite('addEventListener', () => {
      test('throws if the provided "eventType" is not supported', () => {
        assert.throws(() => NetInfo.isConnected.addEventListener('foo', handler));
        assert.doesNotThrow(() => NetInfo.isConnected.addEventListener('change', handler));
      });
    });

    suite('removeEventListener', () => {
      test('throws if the handler is not registered', () => {
        assert.throws(() => NetInfo.isConnected.removeEventListener('change', handler));
      });

      test('throws if the provided "eventType" is not supported', () => {
        NetInfo.isConnected.addEventListener('change', handler);
        assert.throws(() => NetInfo.isConnected.removeEventListener('foo', handler));
        assert.doesNotThrow(() => NetInfo.isConnected.removeEventListener('change', handler));
      });
    });
  });
});
