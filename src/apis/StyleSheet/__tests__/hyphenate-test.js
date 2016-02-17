/* eslint-env mocha */

import assert from 'assert'
import hyphenate from '../hyphenate'

suite('apis/StyleSheet/hyphenate', () => {
  test('style property', () => {
    assert.equal(hyphenate('alignItems'), 'align-items')
    assert.equal(hyphenate('color'), 'color')
  })
  test('vendor prefixed style property', () => {
    assert.equal(hyphenate('MozTransition'), '-moz-transition')
    assert.equal(hyphenate('msTransition'), '-ms-transition')
    assert.equal(hyphenate('WebkitTransition'), '-webkit-transition')
  })
})
