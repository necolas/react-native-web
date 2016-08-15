/* eslint-env mocha */

import assert from 'assert'
import I18nManager from '..'

suite('apis/I18nManager', () => {
  suite('when RTL not enabled', () => {
    setup(() => {
      I18nManager.setPreferredLanguageRTL(false)
    })

    test('is "false" by default', () => {
      assert.equal(I18nManager.isRTL, false)
      assert.equal(document.documentElement.getAttribute('dir'), 'ltr')
    })

    test('is "true" when forced', () => {
      I18nManager.forceRTL(true)
      assert.equal(I18nManager.isRTL, true)
      assert.equal(document.documentElement.getAttribute('dir'), 'rtl')
      I18nManager.forceRTL(false)
    })
  })

  suite('when RTL is enabled', () => {
    setup(() => {
      I18nManager.setPreferredLanguageRTL(true)
    })

    teardown(() => {
      I18nManager.setPreferredLanguageRTL(false)
    })

    test('is "true" by default', () => {
      assert.equal(I18nManager.isRTL, true)
      assert.equal(document.documentElement.getAttribute('dir'), 'rtl')
    })

    test('is "false" when not allowed', () => {
      I18nManager.allowRTL(false)
      assert.equal(I18nManager.isRTL, false)
      assert.equal(document.documentElement.getAttribute('dir'), 'ltr')
      I18nManager.allowRTL(true)
    })
  })
})
