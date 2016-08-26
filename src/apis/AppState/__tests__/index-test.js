/* eslint-env mocha */

import AppState from '..';
import assert from 'assert';

suite('apis/AppState', () => {
  const handler = () => {};

  teardown(() => {
    try { AppState.removeEventListener('change', handler); } catch (e) {}
  });

  suite('addEventListener', () => {
    test('throws if the provided "eventType" is not supported', () => {
      assert.throws(() => AppState.addEventListener('foo', handler));
      assert.doesNotThrow(() => AppState.addEventListener('change', handler));
    });
  });

  suite('removeEventListener', () => {
    test('throws if the handler is not registered', () => {
      assert.throws(() => AppState.removeEventListener('change', handler));
    });

    test('throws if the provided "eventType" is not supported', () => {
      AppState.addEventListener('change', handler);
      assert.throws(() => AppState.removeEventListener('foo', handler));
      assert.doesNotThrow(() => AppState.removeEventListener('change', handler));
    });
  });
});
