/* eslint-env mocha */

import assert from 'assert'
import hyphenate from '../hyphenate'

suite('modules/StyleSheet/hyphenate', () => {
  test('style property', () => {
    assert.equal(hyphenate('alignItems'), 'align-items')
  })
  test('vendor prefixed style property', () => {
    assert.equal(hyphenate('WebkitAppearance'), '-webkit-appearance')
  })
})
