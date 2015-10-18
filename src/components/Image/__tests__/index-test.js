/* eslint-env mocha */

import { assertProps, render, renderToDOM } from '../../../modules/specHelpers'
import assert from 'assert'
import React from 'react'

import Image from '../'

suite('components/Image', () => {
  test('default accessibility', () => {
    const dom = renderToDOM(<Image />)
    assert.equal(dom.getAttribute('role'), 'img')
  })

  test('prop "accessibilityLabel"', () => {
    assertProps.accessibilityLabel(Image)
  })

  test('prop "accessible"', () => {
    assertProps.accessible(Image)
  })

  test('prop "children"')

  test('prop "defaultSource"', () => {
    const defaultSource = { uri: 'https://google.com/favicon.ico' }
    const dom = renderToDOM(<Image defaultSource={defaultSource} />)
    const backgroundImage = dom.style.backgroundImage
    assert(backgroundImage.indexOf(defaultSource.uri) > -1)
  })

  test('prop "onError"', function (done) {
    this.timeout(5000)
    render(<Image
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
    render(<Image
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

  test('prop "style"', () => {
    assertProps.style(Image)
  })

  test('prop "testID"', () => {
    assertProps.testID(Image)
  })
})
