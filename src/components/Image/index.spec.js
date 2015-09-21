import { assertProps, render, renderToDOM } from '../../modules/specHelpers'
import assert from 'assert'
import React from 'react/addons'

import Image from '.'

suite('Image', () => {
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

  test.skip('prop "children"', () => { })

  test('prop "defaultSource"', () => {
    const defaultSource = { uri: 'https://google.com/favicon.ico' }
    const dom = renderToDOM(<Image defaultSource={defaultSource} />)
    const backgroundImage = dom.style.backgroundImage
    assert(backgroundImage.indexOf(defaultSource.uri) > -1)
  })

  test('prop "onError"', function (done) {
    this.timeout(5000)

    function onError(e) {
      assert.equal(e.nativeEvent.type, 'error')
      done()
    }

    render(<Image
      onError={onError}
      source={{ uri: 'https://google.com/favicon.icox' }}
    />)
  })

  test('prop "onLoad"', function (done) {
    this.timeout(5000)

    function onLoad(e) {
      assert.equal(e.nativeEvent.type, 'load')
      done()
    }

    render(<Image
      onLoad={onLoad}
      source={{ uri: 'https://google.com/favicon.ico' }}
    />)
  })

  test.skip('prop "onLoadEnd"', () => { })

  test.skip('prop "onLoadStart"', () => { })

  test.skip('prop "resizeMode"', () => { })

  test.skip('prop "source"', () => { })

  test('prop "style"', () => {
    assertProps.style(Image)
  })

  test('prop "testID"', () => {
    assertProps.testID(Image)
  })
})
