/* eslint-env mocha */

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import assert from 'assert'
import flattenStyle from '../flattenStyle'

suite('apis/StyleSheet/flattenStyle', () => {
  test('should merge style objects', () => {
    const style1 = {opacity: 1}
    const style2 = {order: 2}
    const flatStyle = flattenStyle([style1, style2])
    assert.equal(flatStyle.opacity, 1)
    assert.equal(flatStyle.order, 2)
  })

  test('should override style properties', () => {
    const style1 = {backgroundColor: '#000', order: 1}
    const style2 = {backgroundColor: '#023c69', order: null}
    const flatStyle = flattenStyle([style1, style2])
    assert.equal(flatStyle.backgroundColor, '#023c69')
    assert.strictEqual(flatStyle.order, null)
  })

  test('should overwrite properties with `undefined`', () => {
    const style1 = {backgroundColor: '#000'}
    const style2 = {backgroundColor: undefined}
    const flatStyle = flattenStyle([style1, style2])
    assert.strictEqual(flatStyle.backgroundColor, undefined)
  })

  test('should not fail on falsy values', () => {
    assert.doesNotThrow(() => flattenStyle([null, false, undefined]))
  })

  test('should recursively flatten arrays', () => {
    const style1 = {order: 2}
    const style2 = {opacity: 1}
    const style3 = {order: 3}
    const flatStyle = flattenStyle([null, [], [style1, style2], style3])
    assert.equal(flatStyle.order, 3)
    assert.equal(flatStyle.opacity, 1)
  })
})
