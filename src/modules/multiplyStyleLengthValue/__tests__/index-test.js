/* eslint-env mocha */

import assert from 'assert'
import multiplyStyleLengthValue from '..'

suite('modules/multiplyStyleLengthValue', () => {
  test('number', () => {
    assert.equal(multiplyStyleLengthValue(2, -1), -2)
    assert.equal(multiplyStyleLengthValue(2, 2), 4)
    assert.equal(multiplyStyleLengthValue(2.5, 2), 5)
  })

  test('length', () => {
    assert.equal(multiplyStyleLengthValue('2rem', -1), '-2rem')
    assert.equal(multiplyStyleLengthValue('2px', 2), '4px')
    assert.equal(multiplyStyleLengthValue('2.5em', 2), '5em')
    assert.equal(multiplyStyleLengthValue('2e3px', 2), '4000px')
  })
})
