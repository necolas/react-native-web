/* eslint-env mocha */

import assert from 'assert'
import expandStyle from '../expandStyle'

suite('modules/StyleSheet/expandStyle', () => {
  test('style property', () => {
    const initial = {
      borderTopWidth: 1,
      borderWidth: 2,
      marginTop: 50,
      marginVertical: 25,
      margin: 10
    }

    const expectedStyle = {
      borderTopWidth: 1,
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderBottomWidth: 2,
      marginTop: 50,
      marginBottom: 25,
      marginLeft: 10,
      marginRight: 10
    }

    assert.deepEqual(expandStyle(initial), expectedStyle)
  })
})
