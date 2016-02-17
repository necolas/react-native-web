/* eslint-env mocha */

import assert from 'assert'
import expandStyle from '../expandStyle'

suite('apis/StyleSheet/expandStyle', () => {
  test('style resolution', () => {
    const initial = {
      borderTopWidth: 1,
      borderWidth: 2,
      marginTop: 50,
      marginVertical: 25,
      margin: 10
    }

    const expected = {
      borderTopWidth: 1,
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderBottomWidth: 2,
      marginTop: 50,
      marginBottom: 25,
      marginLeft: 10,
      marginRight: 10
    }

    assert.deepEqual(expandStyle(initial), expected)
  })

  test('flex', () => {
    const value = 10

    const initial = {
      flex: value
    }

    const expected = {
      flexGrow: value,
      flexShrink: 1,
      flexBasis: 'auto'
    }

    assert.deepEqual(expandStyle(initial), expected)
  })
})
