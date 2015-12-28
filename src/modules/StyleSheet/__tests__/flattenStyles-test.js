/* eslint-env mocha */

import assert from 'assert'
import flattenStyles from '../flattenStyles'

const styles = [
  [{
    top: 0,
    right: 0
  }],
  [
    [{
      background: 'red',
      color: 'green'
    }],
    [{
      top: 20
    }]
  ],
  [],
  null,
  false
]

const styleResult = {
  top: 20,
  right: 0,
  background: 'red',
  color: 'green'
}

suite('modules/StyleSheet/flattenStyles', () => {
  test('returns flattened styles', () => {
    const actual = flattenStyles(styles)
    assert.deepEqual(actual, styleResult)
  })
})
