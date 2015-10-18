/* eslint-env mocha */

import { omitProps, pickProps } from '..'
import assert from 'assert'

suite('pickProps', () => {
  test('return value', () => {
    const obj = { a: 1, b: 2, c: { cc: { ccc: 3 } } }
    const props = [ 'a', 'b' ]
    const expected = { a: 1, b: 2 }
    const actual = pickProps(obj, props)

    assert.deepEqual(actual, expected)
  })
})

suite('omitProps', () => {
  test('return value', () => {
    const obj = { a: 1, b: 2, c: { cc: { ccc: 3 } } }
    const props = [ 'a', 'b' ]
    const expected = { c: { cc: { ccc: 3 } } }
    const actual = omitProps(obj, props)

    assert.deepEqual(actual, expected)
  })
})
