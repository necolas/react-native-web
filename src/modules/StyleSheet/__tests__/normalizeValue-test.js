/* eslint-env mocha */

import assert from 'assert'
import normalizeValue from '../normalizeValue'

suite('modules/StyleSheet/normalizeValue', () => {
  test('normalizes property values requiring units', () => {
    assert.deepEqual(normalizeValue('margin', 0), '0px')
  })
  test('ignores unitless property values', () => {
    assert.deepEqual(normalizeValue('flexGrow', 1), 1)
  })
})
