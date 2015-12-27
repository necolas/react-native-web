/* eslint-env mocha */

import { resetCSS, predefinedCSS } from '../predefs'
import assert from 'assert'
import StyleSheet from '..'

const styles = { root: { borderWidth: 1 } }

suite('modules/StyleSheet', () => {
  setup(() => {
    StyleSheet._destroy()
  })

  suite('create', () => {
    const div = document.createElement('div')

    setup(() => {
      document.body.appendChild(div)
      StyleSheet.create(styles)
      div.innerHTML = `<style id='react-stylesheet'>${StyleSheet._renderToString()}</style>`
    })

    teardown(() => {
      document.body.removeChild(div)
    })

    test('returns styles object', () => {
      assert.equal(StyleSheet.create(styles), styles)
    })

    test('updates already-rendered style sheet', () => {
      StyleSheet.create({ root: { color: 'red' } })

      assert.equal(
        document.getElementById('react-stylesheet').textContent,
        `${resetCSS}\n${predefinedCSS}\n` +
        `/* 5 unique declarations */\n` +
        `.borderBottomWidth\\:1px{border-bottom-width:1px;}\n` +
        `.borderLeftWidth\\:1px{border-left-width:1px;}\n` +
        `.borderRightWidth\\:1px{border-right-width:1px;}\n` +
        `.borderTopWidth\\:1px{border-top-width:1px;}\n` +
        `.color\\:red{color:red;}`
      )
    })
  })

  test('resolve', () => {
    const props = { className: 'className', style: styles.root }
    const expected = { className: 'className borderTopWidth:1px borderRightWidth:1px borderBottomWidth:1px borderLeftWidth:1px', style: {} }
    StyleSheet.create(styles)
    assert.deepEqual(StyleSheet.resolve(props), expected)
  })

  test('_renderToString', () => {
    StyleSheet.create(styles)
    assert.equal(
      StyleSheet._renderToString(),
      `${resetCSS}\n${predefinedCSS}\n` +
      `/* 4 unique declarations */\n` +
      `.borderBottomWidth\\:1px{border-bottom-width:1px;}\n` +
      `.borderLeftWidth\\:1px{border-left-width:1px;}\n` +
      `.borderRightWidth\\:1px{border-right-width:1px;}\n` +
      `.borderTopWidth\\:1px{border-top-width:1px;}`
    )
  })
})
