/* eslint-env mocha */

import * as utils from '../../../modules/specHelpers'
import assert from 'assert'
import React from 'react'

import CoreComponent from '../'

suite('components/CoreComponent', () => {
  test('prop "accessibilityLabel"', () => {
    const accessibilityLabel = 'accessibilityLabel'
    const dom = utils.renderToDOM(<CoreComponent accessibilityLabel={accessibilityLabel} />)
    assert.equal(dom.getAttribute('aria-label'), accessibilityLabel)
  })

  test('prop "accessibilityLiveRegion"', () => {
    const accessibilityLiveRegion = 'polite'
    const dom = utils.renderToDOM(<CoreComponent accessibilityLiveRegion={accessibilityLiveRegion} />)
    assert.equal(dom.getAttribute('aria-live'), accessibilityLiveRegion)
  })

  test('prop "accessibilityRole"', () => {
    const accessibilityRole = 'banner'
    let dom = utils.renderToDOM(<CoreComponent accessibilityRole={accessibilityRole} />)
    assert.equal(dom.getAttribute('role'), accessibilityRole)
    assert.equal((dom.tagName).toLowerCase(), 'header')

    const button = 'button'
    dom = utils.renderToDOM(<CoreComponent accessibilityRole={button} />)
    assert.equal(dom.getAttribute('type'), button)
    assert.equal((dom.tagName).toLowerCase(), button)
  })

  test('prop "accessible"', () => {
    // accessible (implicit)
    let dom = utils.renderToDOM(<CoreComponent />)
    assert.equal(dom.getAttribute('aria-hidden'), null)
    // accessible (explicit)
    dom = utils.renderToDOM(<CoreComponent accessible />)
    assert.equal(dom.getAttribute('aria-hidden'), null)
    // not accessible
    dom = utils.renderToDOM(<CoreComponent accessible={false} />)
    assert.equal(dom.getAttribute('aria-hidden'), 'true')
  })

  test('prop "component"', () => {
    const component = 'main'
    const dom = utils.renderToDOM(<CoreComponent component={component} />)
    const tagName = (dom.tagName).toLowerCase()
    assert.equal(tagName, component)
  })

  test('prop "testID"', () => {
    // no testID
    let dom = utils.renderToDOM(<CoreComponent />)
    assert.equal(dom.getAttribute('data-testid'), null)
    // with testID
    const testID = 'Example.testID'
    dom = utils.renderToDOM(<CoreComponent testID={testID} />)
    assert.equal(dom.getAttribute('data-testid'), testID)
  })
})
