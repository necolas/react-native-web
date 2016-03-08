/* eslint-env mocha */

import * as utils from '../../../modules/specHelpers'
import assert from 'assert'
import React from 'react'
import flattenStyle from '../../../apis/StyleSheet/flattenStyle'

import Image from '../'

const getStyleBackgroundSize = (element) => flattenStyle(element.props.style).backgroundSize

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

  suite('prop "resizeMode"', () => {
    test('value "contain"', () => {
      const result = utils.shallowRender(<Image resizeMode={Image.resizeMode.contain} />)
      assert.equal(getStyleBackgroundSize(result), 'contain')
    })

    test('value "cover"', () => {
      const result = utils.shallowRender(<Image resizeMode={Image.resizeMode.cover} />)
      assert.equal(getStyleBackgroundSize(result), 'cover')
    })

    test('value "none"', () => {
      const result = utils.shallowRender(<Image resizeMode={Image.resizeMode.none} />)
      assert.equal(getStyleBackgroundSize(result), 'auto')
    })

    test('value "stretch"', () => {
      const result = utils.shallowRender(<Image resizeMode={Image.resizeMode.stretch} />)
      assert.equal(getStyleBackgroundSize(result), '100% 100%')
    })

    test('no value', () => {
      const result = utils.shallowRender(<Image />)
      assert.equal(getStyleBackgroundSize(result), 'cover')
    })
  })

  test('prop "source"')

  suite('prop "style"', () => {
    test('converts "resizeMode" property', () => {
      const result = utils.shallowRender(<Image style={{ resizeMode: Image.resizeMode.contain }} />)
      assert.equal(getStyleBackgroundSize(result), 'contain')
    })

    test('removes "resizeMode" property', () => {
      const result = utils.shallowRender(<Image style={{ resizeMode: Image.resizeMode.contain }} />)
      assert.equal(flattenStyle(result.props.style).resizeMode, undefined)
    })
  })

  test('prop "testID"', () => {
    const testID = 'testID'
    const result = utils.shallowRender(<Image testID={testID} />)
    assert.equal(result.props.testID, testID)
  })
})
