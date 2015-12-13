/* eslint-env mocha */

import { resetCSS, predefinedCSS } from '../predefs'
import assert from 'assert'
import StyleSheet from '..'

const styles = { root: { borderWidth: 1 } }

suite('modules/StyleSheet', () => {
  setup(() => {
    StyleSheet.destroy()
  })

  test('create', () => {
    assert.equal(StyleSheet.create(styles), styles)
  })

  test('renderToString', () => {
    StyleSheet.create(styles)
    assert.equal(
      StyleSheet.renderToString(),
      `${resetCSS}\n${predefinedCSS}\n` +
      `/* 4 unique declarations */\n` +
      `.borderBottomWidth\\:1px{border-bottom-width:1px;}\n` +
      `.borderLeftWidth\\:1px{border-left-width:1px;}\n` +
      `.borderRightWidth\\:1px{border-right-width:1px;}\n` +
      `.borderTopWidth\\:1px{border-top-width:1px;}`
    )
  })

  test('resolve', () => {
    const props = { className: 'className', style: styles.root }
    const expected = { className: 'className borderTopWidth:1px borderRightWidth:1px borderBottomWidth:1px borderLeftWidth:1px', style: {} }
    StyleSheet.create(styles)
    assert.deepEqual(StyleSheet.resolve(props), expected)
  })
})
