/* eslint-env mocha */

import * as utils from '../../../modules/specHelpers'
import assert from 'assert'
import React from 'react'

import Image from '../'

suite('components/Image', () => {
  test('default accessibility', () => {
    const dom = utils.renderToDOM(<Image />)
    assert.equal(dom.getAttribute('role'), 'img')
  })

  test('prop "accessibilityLabel"', () => {
    const accessibilityLabel = 'accessibilityLabel'
    const result = utils.shallowRender(<Image accessibilityLabel={accessibilityLabel} />)
    assert.equal(result.props.accessibilityLabel, accessibilityLabel)
  })

  test('prop "accessible"', () => {
    const accessible = false
    const result = utils.shallowRender(<Image accessible={accessible} />)
    assert.equal(result.props.accessible, accessible)
  })

  test('prop "children"')

  test('prop "defaultSource"', () => {
    const defaultSource = { uri: 'https://google.com/favicon.ico' }
    const dom = utils.renderToDOM(<Image defaultSource={defaultSource} />)
    const backgroundImage = dom.style.backgroundImage
    assert(backgroundImage.indexOf(defaultSource.uri) > -1)
  })

  test('prop "onError"', function (done) {
    this.timeout(5000)
    utils.render(<Image
      onError={onError}
      source={{ uri: 'https://google.com/favicon.icox' }}
    />)
    function onError(e) {
      assert.equal(e.nativeEvent.type, 'error')
      done()
    }
  })

  test('prop "onLoad"', function (done) {
    this.timeout(5000)
    utils.render(<Image
      onLoad={onLoad}
      source={{ uri: 'https://google.com/favicon.ico' }}
    />)
    function onLoad(e) {
      assert.equal(e.nativeEvent.type, 'load')
      done()
    }
  })

  test('prop "onLoadEnd"')

  test('prop "onLoadStart"')

  test('prop "resizeMode"')

  test('prop "source"')

  test('prop "testID"', () => {
    const testID = 'testID'
    const result = utils.shallowRender(<Image testID={testID} />)
    assert.equal(result.props.testID, testID)
  })
})
