/* eslint-env mocha */

import assert from 'assert'
import createReactStyleObject from '../createReactStyleObject'

suite('apis/StyleSheet/createReactStyleObject', () => {
  test('converts ReactNative style to ReactDOM style', () => {
    const reactNativeStyle = { display: 'flex', marginVertical: 0, opacity: 0 }
    const expectedStyle = { display: 'flex', marginTop: '0px', marginBottom: '0px', opacity: 0 }

    assert.deepEqual(createReactStyleObject(reactNativeStyle), expectedStyle)
  })
})
