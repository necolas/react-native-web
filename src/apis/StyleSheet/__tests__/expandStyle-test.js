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
      borderTopWidth: '1px',
      borderLeftWidth: '2px',
      borderRightWidth: '2px',
      borderBottomWidth: '2px',
      marginTop: '50px',
      marginBottom: '25px',
      marginLeft: '10px',
      marginRight: '10px'
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
