/* eslint-env mocha */

import { mount, shallow } from 'enzyme'
import assert from 'assert'
import React from 'react'
import StyleSheet from '../../../apis/StyleSheet'

import Image from '../'

suite('components/Image', () => {
  test('sets correct accessibility role"', () => {
    const image = shallow(<Image />)
    assert.equal(image.prop('accessibilityRole'), 'img')
  })

  test('prop "accessibilityLabel"', () => {
    const accessibilityLabel = 'accessibilityLabel'
    const image = shallow(<Image accessibilityLabel={accessibilityLabel} />)
    assert.equal(image.prop('accessibilityLabel'), accessibilityLabel)
  })

  test('prop "accessible"', () => {
    const accessible = false
    const image = shallow(<Image accessible={accessible} />)
    assert.equal(image.prop('accessible'), accessible)
  })

  test('prop "children"', () => {
    const children = <div className='unique' />
    const wrapper = shallow(<Image>{children}</Image>)
    assert.equal(wrapper.contains(children), true)
  })

  suite('prop "defaultSource"', () => {
    test('sets background image when value is an object', () => {
      const defaultSource = { uri: 'https://google.com/favicon.ico' }
      const image = shallow(<Image defaultSource={defaultSource} />)
      const backgroundImage = StyleSheet.flatten(image.prop('style')).backgroundImage
      assert(backgroundImage.indexOf(defaultSource.uri) > -1)
    })

    test('sets background image when value is a string', () => {
      // emulate require-ed asset
      const defaultSource = 'https://google.com/favicon.ico'
      const image = shallow(<Image defaultSource={defaultSource} />)
      const backgroundImage = StyleSheet.flatten(image.prop('style')).backgroundImage
      assert(backgroundImage.indexOf(defaultSource) > -1)
    })
  })

  test('prop "onError"', function (done) {
    this.timeout(5000)
    mount(<Image onError={onError} source={{ uri: 'https://google.com/favicon.icox' }} />)
    function onError(e) {
      assert.equal(e.nativeEvent.type, 'error')
      done()
    }
  })

  test('prop "onLoad"', function (done) {
    this.timeout(5000)
    const image = mount(<Image onLoad={onLoad} source={{ uri: 'https://google.com/favicon.ico' }} />)
    function onLoad(e) {
      assert.equal(e.nativeEvent.type, 'load')
      const backgroundImage = StyleSheet.flatten(image.ref('root').prop('style')).backgroundImage
      assert.notDeepEqual(backgroundImage, undefined)
      done()
    }
  })

  test('prop "onLoadEnd"', function (done) {
    this.timeout(5000)
    const image = mount(<Image onLoadEnd={onLoadEnd} source={{ uri: 'https://google.com/favicon.ico' }} />)
    function onLoadEnd() {
      assert.ok(true)
      const backgroundImage = StyleSheet.flatten(image.ref('root').prop('style')).backgroundImage
      assert.notDeepEqual(backgroundImage, undefined)
      done()
    }
  })

  test('prop "onLoadStart"', function (done) {
    this.timeout(5000)
    mount(<Image onLoadStart={onLoadStart} source={{ uri: 'https://google.com/favicon.ico' }} />)
    function onLoadStart() {
      assert.ok(true)
      done()
    }
  })

  suite('prop "resizeMode"', () => {
    const getBackgroundSize = (image) => StyleSheet.flatten(image.prop('style')).backgroundSize

    test('value "contain"', () => {
      const image = shallow(<Image resizeMode={Image.resizeMode.contain} />)
      assert.equal(getBackgroundSize(image), 'contain')
    })

    test('value "cover"', () => {
      const image = shallow(<Image resizeMode={Image.resizeMode.cover} />)
      assert.equal(getBackgroundSize(image), 'cover')
    })

    test('value "none"', () => {
      const image = shallow(<Image resizeMode={Image.resizeMode.none} />)
      assert.equal(getBackgroundSize(image), 'auto')
    })

    test('value "stretch"', () => {
      const image = shallow(<Image resizeMode={Image.resizeMode.stretch} />)
      assert.equal(getBackgroundSize(image), '100% 100%')
    })

    test('no value', () => {
      const image = shallow(<Image />)
      assert.equal(getBackgroundSize(image), 'cover')
    })
  })

  suite('prop "source"', function () {
    this.timeout(5000)

    test('sets background image when value is an object', (done) => {
      const source = { uri: 'https://google.com/favicon.ico' }
      mount(<Image onLoad={onLoad} source={source} />)
      function onLoad(e) {
        const src = e.nativeEvent.target.src
        assert.equal(src, source.uri)
        done()
      }
    })

    test('sets background image when value is a string', (done) => {
      // emulate require-ed asset
      const source = 'https://google.com/favicon.ico'
      mount(<Image onLoad={onLoad} source={source} />)
      function onLoad(e) {
        const src = e.nativeEvent.target.src
        assert.equal(src, source)
        done()
      }
    })
  })

  suite('prop "style"', () => {
    test('converts "resizeMode" property', () => {
      const image = shallow(<Image style={{ resizeMode: Image.resizeMode.contain }} />)
      assert.equal(StyleSheet.flatten(image.prop('style')).backgroundSize, 'contain')
    })

    test('removes "resizeMode" property', () => {
      const image = shallow(<Image style={{ resizeMode: Image.resizeMode.contain }} />)
      assert.equal(StyleSheet.flatten(image.prop('style')).resizeMode, undefined)
    })
  })

  test('prop "testID"', () => {
    const testID = 'testID'
    const image = shallow(<Image testID={testID} />)
    assert.equal(image.prop('testID'), testID)
  })
})
