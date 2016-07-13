/* eslint-env mocha */

import assert from 'assert'
import createReactDOMComponent from '..'
import { shallow } from 'enzyme'

suite('modules/createReactDOMComponent', () => {
  test('prop "accessibilityLabel"', () => {
    const accessibilityLabel = 'accessibilityLabel'
    const element = shallow(createReactDOMComponent({ accessibilityLabel }))
    assert.equal(element.prop('aria-label'), accessibilityLabel)
  })

  test('prop "accessibilityLiveRegion"', () => {
    const accessibilityLiveRegion = 'polite'
    const element = shallow(createReactDOMComponent({ accessibilityLiveRegion }))
    assert.equal(element.prop('aria-live'), accessibilityLiveRegion)
  })

  test('prop "accessibilityRole"', () => {
    const accessibilityRole = 'banner'
    let element = shallow(createReactDOMComponent({ accessibilityRole }))
    assert.equal(element.prop('role'), accessibilityRole)
    assert.equal(element.is('header'), true)

    const button = 'button'
    element = shallow(createReactDOMComponent({ accessibilityRole: 'button' }))
    assert.equal(element.prop('type'), button)
    assert.equal(element.is('button'), true)
  })

  test('prop "type"', () => {
    const accessibilityRole = 'button'
    let element = shallow(createReactDOMComponent({ accessibilityRole }))
    assert.equal(element.prop('type'), accessibilityRole)
    assert.equal(element.is('button'), true)

    const type = 'submit'
    element = shallow(createReactDOMComponent({ accessibilityRole, type }))
    assert.equal(element.prop('type'), type)
    assert.equal(element.is('button'), true)
  })

  test('prop "accessible"', () => {
    // accessible (implicit)
    let element = shallow(createReactDOMComponent({}))
    assert.equal(element.prop('aria-hidden'), null)
    // accessible (explicit)
    element = shallow(createReactDOMComponent({ accessible: true }))
    assert.equal(element.prop('aria-hidden'), null)
    // not accessible
    element = shallow(createReactDOMComponent({ accessible: false }))
    assert.equal(element.prop('aria-hidden'), true)
  })

  test('prop "component"', () => {
    const component = 'main'
    let element = shallow(createReactDOMComponent({}))
    assert.equal(element.is('span'), true, 'Default element must be a "span"')
    element = shallow(createReactDOMComponent({ component }))
    assert.equal(element.is('main'), true)
  })

  test('prop "testID"', () => {
    // no testID
    let element = shallow(createReactDOMComponent({}))
    assert.equal(element.prop('data-testid'), null)
    // with testID
    const testID = 'Example.testID'
    element = shallow(createReactDOMComponent({ testID }))
    assert.equal(element.prop('data-testid'), testID)
  })
})
