/* eslint-env mocha */

import * as utils from '../../specHelpers'
import assert from 'assert'

import createNativeComponent from '../'

suite('modules/createNativeComponent', () => {
  test('prop "accessibilityLabel"', () => {
    const accessibilityLabel = 'accessibilityLabel'
    const dom = utils.renderToDOM(createNativeComponent({ accessibilityLabel }))
    assert.equal(dom.getAttribute('aria-label'), accessibilityLabel)
  })

  test('prop "accessibilityLiveRegion"', () => {
    const accessibilityLiveRegion = 'polite'
    const dom = utils.renderToDOM(createNativeComponent({ accessibilityLiveRegion }))
    assert.equal(dom.getAttribute('aria-live'), accessibilityLiveRegion)
  })

  test('prop "accessibilityRole"', () => {
    const accessibilityRole = 'banner'
    let dom = utils.renderToDOM(createNativeComponent({ accessibilityRole }))
    assert.equal(dom.getAttribute('role'), accessibilityRole)
    assert.equal((dom.tagName).toLowerCase(), 'header')

    const button = 'button'
    dom = utils.renderToDOM(createNativeComponent({ accessibilityRole: 'button' }))
    assert.equal(dom.getAttribute('type'), button)
    assert.equal((dom.tagName).toLowerCase(), button)
  })

  test('prop "accessible"', () => {
    // accessible (implicit)
    let dom = utils.renderToDOM(createNativeComponent({}))
    assert.equal(dom.getAttribute('aria-hidden'), null)
    // accessible (explicit)
    dom = utils.renderToDOM(createNativeComponent({ accessible: true }))
    assert.equal(dom.getAttribute('aria-hidden'), null)
    // not accessible
    dom = utils.renderToDOM(createNativeComponent({ accessible: false }))
    assert.equal(dom.getAttribute('aria-hidden'), 'true')
  })

  test('prop "component"', () => {
    const component = 'main'
    const dom = utils.renderToDOM(createNativeComponent({ component }))
    const tagName = (dom.tagName).toLowerCase()
    assert.equal(tagName, component)
  })

  test('prop "testID"', () => {
    // no testID
    let dom = utils.renderToDOM(createNativeComponent({}))
    assert.equal(dom.getAttribute('data-testid'), null)
    // with testID
    const testID = 'Example.testID'
    dom = utils.renderToDOM(createNativeComponent({ testID }))
    assert.equal(dom.getAttribute('data-testid'), testID)
  })
})
