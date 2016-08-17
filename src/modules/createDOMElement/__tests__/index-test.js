/* eslint-env mocha */

import assert from 'assert'
import createDOMElement from '..'
import { shallow } from 'enzyme'

suite('modules/createDOMElement', () => {
  test('renders correct DOM element', () => {
    let element = shallow(createDOMElement('span'))
    assert.equal(element.is('span'), true)
    element = shallow(createDOMElement('main'))
    assert.equal(element.is('main'), true)
  })

  test('prop "accessibilityLabel"', () => {
    const accessibilityLabel = 'accessibilityLabel'
    const element = shallow(createDOMElement('span', { accessibilityLabel }))
    assert.equal(element.prop('aria-label'), accessibilityLabel)
  })

  test('prop "accessibilityLiveRegion"', () => {
    const accessibilityLiveRegion = 'polite'
    const element = shallow(createDOMElement('span', { accessibilityLiveRegion }))
    assert.equal(element.prop('aria-live'), accessibilityLiveRegion)
  })

  test('prop "accessibilityRole"', () => {
    const accessibilityRole = 'banner'
    let element = shallow(createDOMElement('span', { accessibilityRole }))
    assert.equal(element.prop('role'), accessibilityRole)
    assert.equal(element.is('header'), true)

    const button = 'button'
    element = shallow(createDOMElement('span', { accessibilityRole: 'button' }))
    assert.equal(element.prop('type'), button)
    assert.equal(element.is('button'), true)
  })

  test('prop "accessible"', () => {
    // accessible (implicit)
    let element = shallow(createDOMElement('span', {}))
    assert.equal(element.prop('aria-hidden'), null)
    // accessible (explicit)
    element = shallow(createDOMElement('span', { accessible: true }))
    assert.equal(element.prop('aria-hidden'), null)
    // not accessible
    element = shallow(createDOMElement('span', { accessible: false }))
    assert.equal(element.prop('aria-hidden'), true)
  })

  test('prop "testID"', () => {
    // no testID
    let element = shallow(createDOMElement('span', {}))
    assert.equal(element.prop('data-testid'), null)
    // with testID
    const testID = 'Example.testID'
    element = shallow(createDOMElement('span', { testID }))
    assert.equal(element.prop('data-testid'), testID)
  })
})
