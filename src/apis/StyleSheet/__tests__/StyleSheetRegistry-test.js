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
import StyleSheetRegistry from '../StyleSheetRegistry'

suite('apis/StyleSheet/StyleSheetRegistry', () => {
  setup(() => {
    StyleSheetRegistry._reset()
  })

  test('static renderToString', () => {
    const style1 = { alignItems: 'center', opacity: 1 }
    const style2 = { alignItems: 'center', opacity: 1 }
    StyleSheetRegistry.registerStyle(style1)
    StyleSheetRegistry.registerStyle(style2)

    const actual = StyleSheetRegistry.renderToString()
    const expected = `/* 2 unique declarations */
.__style1{-ms-flex-align:center;-webkit-align-items:center;-webkit-box-align:center;align-items:center;}
.__style2{opacity:1;}`

    assert.equal(actual, expected)
  })

  test('static getStyleAsNativeProps', () => {
    const style = { borderColorTop: 'white', opacity: 1 }
    const style1 = { opacity: 1 }
    StyleSheetRegistry.registerStyle(style1)

    // canUseCSS = false
    const actual1 = StyleSheetRegistry.getStyleAsNativeProps(style)
    const expected1 = {
      className: '',
      style: { borderColorTop: 'white', opacity: 1 }
    }
    assert.deepEqual(actual1, expected1)

    // canUseCSS = true
    const actual2 = StyleSheetRegistry.getStyleAsNativeProps(style, true)
    const expected2 = {
      className: '__style1',
      style: { borderColorTop: 'white' }
    }
    assert.deepEqual(actual2, expected2)
  })
})
