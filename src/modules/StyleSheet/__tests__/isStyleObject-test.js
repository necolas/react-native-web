/* eslint-env mocha */

import assert from 'assert'
import isStyleObject from '../isStyleObject'

const style = { margin: 0 }
const notStyle = { root: style }

suite('modules/StyleSheet/isStyleObject', () => {
  test('returns "true" for style objects', () => {
    assert.ok(isStyleObject(style) === true)
  })
  test('returns "false" for non-style objects', () => {
    assert.ok(isStyleObject(notStyle) === false)
  })
})
