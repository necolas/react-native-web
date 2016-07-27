/* eslint-env mocha */

import assert from 'assert'
import I18nManager from '..'

suite('apis/I18nManager', () => {
  suite('when RTL not enabled', () => {
    setup(() => {
      I18nManager.setRTL(false)
    })

    test('is "false" by default', () => {
      assert.equal(I18nManager.isRTL, false)
    })

    test('is "true" when forced', () => {
      I18nManager.forceRTL(true)
      assert.equal(I18nManager.isRTL, true)
      I18nManager.forceRTL(false)
    })
  })

  suite('when RTL is enabled', () => {
    setup(() => {
      I18nManager.setRTL(true)
    })

    test('is "true" by default', () => {
      assert.equal(I18nManager.isRTL, true)
    })

    test('is "false" when not allowed', () => {
      I18nManager.allowRTL(false)
      assert.equal(I18nManager.isRTL, false)
      I18nManager.allowRTL(true)
    })
  })
})
