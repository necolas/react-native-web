/* eslint-env mocha */

import assert from 'assert'
import I18nManager from '../../I18nManager'
import i18nStyle from '../i18nStyle'

const initial = {
  borderLeftColor: 'red',
  borderRightColor: 'blue',
  borderTopLeftRadius: 10,
  borderTopRightRadius: '1rem',
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: '2rem',
  borderLeftStyle: 'solid',
  borderRightStyle: 'dotted',
  borderLeftWidth: 5,
  borderRightWidth: 6,
  left: 1,
  marginLeft: 7,
  marginRight: 8,
  paddingLeft: 9,
  paddingRight: 10,
  right: 2,
  textAlign: 'left',
  textShadowOffset: { width: 10, height: 10 },
  writingDirection: 'ltr'
}

const noflipInitial = Object.keys(initial).reduce((acc, prop) => {
  const newProp = `${prop}$noflip`
  acc[newProp] = initial[prop]
  return acc
}, {})

const expected = {
  borderLeftColor: 'blue',
  borderRightColor: 'red',
  borderTopLeftRadius: '1rem',
  borderTopRightRadius: 10,
  borderBottomLeftRadius: '2rem',
  borderBottomRightRadius: 20,
  borderLeftStyle: 'dotted',
  borderRightStyle: 'solid',
  borderLeftWidth: 6,
  borderRightWidth: 5,
  left: 2,
  marginLeft: 8,
  marginRight: 7,
  paddingLeft: 10,
  paddingRight: 9,
  right: 1,
  textAlign: 'right',
  textShadowOffset: { width: -10, height: 10 },
  writingDirection: 'rtl'
}

suite('apis/StyleSheet/i18nStyle', () => {
  suite('LTR mode', () => {
    setup(() => {
      I18nManager.allowRTL(false)
    })

    teardown(() => {
      I18nManager.allowRTL(true)
    })

    test('does not auto-flip', () => {
      assert.deepEqual(i18nStyle(initial), initial)
    })
    test('normalizes properties', () => {
      assert.deepEqual(i18nStyle(noflipInitial), initial)
    })
  })

  suite('RTL mode', () => {
    setup(() => {
      I18nManager.forceRTL(true)
    })

    teardown(() => {
      I18nManager.forceRTL(false)
    })

    test('does auto-flip', () => {
      assert.deepEqual(i18nStyle(initial), expected)
    })
    test('normalizes properties', () => {
      assert.deepEqual(i18nStyle(noflipInitial), initial)
    })
  })
})
