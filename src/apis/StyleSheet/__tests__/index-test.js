/* eslint-env mocha */

import { resetCSS, predefinedCSS } from '../predefs'
import assert from 'assert'
import StyleSheet from '..'

const styles = { root: { opacity: 1 } }

suite('apis/StyleSheet', () => {
  setup(() => {
    StyleSheet._destroy()
  })

  suite('create', () => {
    test('returns styles object', () => {
      assert.equal(StyleSheet.create(styles), styles)
    })

    test('updates already-rendered style sheet', () => {
      // setup
      const div = document.createElement('div')
      document.body.appendChild(div)
      StyleSheet.create(styles)
      div.innerHTML = `<style id='${StyleSheet.elementId}'>${StyleSheet.renderToString()}</style>`

      // test
      StyleSheet.create({ root: { color: 'red' } })
      assert.equal(
        document.getElementById(StyleSheet.elementId).textContent,
        `${resetCSS}\n${predefinedCSS}\n` +
        `/* 2 unique declarations */\n` +
        `.__style1{opacity:1;}\n` +
        `.__style2{color:red;}`
      )

      // teardown
      document.body.removeChild(div)
    })
  })

  test('renderToString', () => {
    StyleSheet.create(styles)

    assert.equal(
      StyleSheet.renderToString(),
      `${resetCSS}\n${predefinedCSS}\n` +
      `/* 1 unique declarations */\n` +
      `.__style1{opacity:1;}`
    )
  })

  test('resolve', () => {
    assert.deepEqual(
      StyleSheet.resolve({ className: 'test', style: styles.root }),
      {
        className: 'test',
        style: { opacity: 1 }
      }
    )
  })
})
