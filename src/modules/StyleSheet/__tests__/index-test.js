/* eslint-env mocha */

import { resetCSS, predefinedCSS } from '../predefs'
import assert from 'assert'
import StyleSheet from '..'

const styles = { root: { border: 0 } }

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
      `/* 1 unique declarations */\n` +
      `.border\\:0px{border:0px;}`
    )
  })

  test('resolve', () => {
    const props = { className: 'className', style: styles.root }
    const expected = { className: 'className border:0px', style: {} }
    StyleSheet.create(styles)
    assert.deepEqual(StyleSheet.resolve(props), expected)
  })
})
