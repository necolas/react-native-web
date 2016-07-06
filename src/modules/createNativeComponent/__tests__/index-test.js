/* eslint-env mocha */

import assert from 'assert'
import createNativeComponent from '..'
import { shallow } from 'enzyme'

suite('modules/createNativeComponent', () => {
  test('prop "accessibilityLabel"', () => {
    const accessibilityLabel = 'accessibilityLabel'
    const element = shallow(createNativeComponent({ accessibilityLabel }))
    assert.equal(element.prop('aria-label'), accessibilityLabel)
  })

  test('prop "accessibilityLiveRegion"', () => {
    const accessibilityLiveRegion = 'polite'
    const element = shallow(createNativeComponent({ accessibilityLiveRegion }))
    assert.equal(element.prop('aria-live'), accessibilityLiveRegion)
  })

  test('prop "accessibilityRole"', () => {
    const accessibilityRole = 'banner'
    let element = shallow(createNativeComponent({ accessibilityRole }))
    assert.equal(element.prop('role'), accessibilityRole)
    assert.equal(element.is('header'), true)

    const button = 'button'
    element = shallow(createNativeComponent({ accessibilityRole: 'button' }))
    assert.equal(element.prop('type'), button)
    assert.equal(element.is('button'), true)
  })

  test('prop "accessible"', () => {
    // accessible (implicit)
    let element = shallow(createNativeComponent({}))
    assert.equal(element.prop('aria-hidden'), null)
    // accessible (explicit)
    element = shallow(createNativeComponent({ accessible: true }))
    assert.equal(element.prop('aria-hidden'), null)
    // not accessible
    element = shallow(createNativeComponent({ accessible: false }))
    assert.equal(element.prop('aria-hidden'), true)
  })

  test('prop "component"', () => {
    const component = 'main'
    const element = shallow(createNativeComponent({ component }))
    assert.equal(element.is('main'), true)
  })

  test('prop "testID"', () => {
    // no testID
    let element = shallow(createNativeComponent({}))
    assert.equal(element.prop('data-testid'), null)
    // with testID
    const testID = 'Example.testID'
    element = shallow(createNativeComponent({ testID }))
    assert.equal(element.prop('data-testid'), testID)
  })
})
