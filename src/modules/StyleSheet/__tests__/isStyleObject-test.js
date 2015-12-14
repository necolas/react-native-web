/* eslint-env mocha */

import assert from 'assert'
import isStyleObject from '../isStyleObject'

const styles = {
  root: {
    margin: 0
  },
  align: {
    left: {
      textAlign: 'left'
    },
    right: {
      textAlign: 'right'
    }
  }
}

suite('modules/StyleSheet/isStyleObject', () => {
  test('returns "false" for non-style objects', () => {
    assert.ok(isStyleObject(styles) === false)
    assert.ok(isStyleObject(styles.align) === false)
  })
  test('returns "true" for style objects', () => {
    assert.ok(isStyleObject(styles.root) === true)
    assert.ok(isStyleObject(styles.align.left) === true)
  })
})
