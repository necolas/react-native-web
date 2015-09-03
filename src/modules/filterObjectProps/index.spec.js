import { omitProps, pickProps } from '.'
import assert from 'assert'

suite('pickProps', () => {
  test('interface', () => {
    assert.throws(
      () => { pickProps({}, true) },
      TypeError,
      'pickProps should throw if the second argument is not an array'
    )
  })

  test('return value', () => {
    const obj = { a: 1, b: 2, c: { cc: { ccc: 3 } } }
    const props = [ 'a', 'b' ]
    const expected = { a: 1, b: 2 }
    const actual = pickProps(obj, props)

    assert.deepEqual(actual, expected)
  })
})

suite('omitProps', () => {
  test('interface', () => {
    assert.throws(
      () => { omitProps({}, true) },
      TypeError,
      'omitProps should throw if the second argument is not an array'
    )
  })

  test('return value', () => {
    const obj = { a: 1, b: 2, c: { cc: { ccc: 3 } } }
    const props = [ 'a', 'b' ]
    const expected = { c: { cc: { ccc: 3 } } }
    const actual = omitProps(obj, props)

    assert.deepEqual(actual, expected)
  })
})
