/* eslint-env mocha */

import assert from 'assert'
import isObject from '../isObject'

suite('apis/StyleSheet/isObject', () => {
  test('returns "true" for objects', () => {
    assert.ok(isObject({}) === true)
  })
  test('returns "false" for non-objects', () => {
    assert.ok(isObject(function () {}) === false)
    assert.ok(isObject([]) === false)
    assert.ok(isObject('') === false)
  })
})
