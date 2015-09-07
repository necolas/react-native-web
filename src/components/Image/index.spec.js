import assert from 'assert'
import React from 'react/addons'

import Image from '.'
import View from '../View'

const ReactTestUtils = React.addons.TestUtils

function shallowRender(component, context = {}) {
  const shallowRenderer = React.addons.TestUtils.createRenderer()
  shallowRenderer.render(component, context)
  return shallowRenderer.getRenderOutput()
}

function render(component, node) {
  return node ? React.render(component, node) : ReactTestUtils.renderIntoDocument(component)
}

function getImageDOM(props) {
  const result = ReactTestUtils.renderIntoDocument(<Image {...props} />)
  return React.findDOMNode(result)
}

suite('Image', () => {
  test('defaults', () => {
    const result = shallowRender(<Image />)
    assert.equal(result.type, View)
  })

  test('prop "accessibilityLabel"', () => {
    const accessibilityLabel = 'accessibilityLabel'
    const element = getImageDOM()
    const elementHasLabel = getImageDOM({ accessibilityLabel })

    assert.equal(element.getAttribute('aria-label'), null)
    assert.equal(elementHasLabel.getAttribute('aria-label'), accessibilityLabel)
  })

  test.skip('prop "children"', () => { })

  test('prop "defaultSource"', () => {
    const defaultSource = { uri: 'https://google.com/favicon.ico' }
    const elementHasdefaultSource = getImageDOM({ defaultSource })

    assert.equal(elementHasdefaultSource.style.backgroundImage, `url(${defaultSource.uri})`)
  })

  test('prop "onError"', (done) => {
    function onError(e) {
      assert.equal(e.nativeEvent.type, 'error')
      done()
    }

    render(<Image
      onError={onError}
      source={{ uri: 'https://google.com/favicon.icox' }}
    />)
  })

  test('prop "onLoad"', (done) => {
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
    const initial = shallowRender(<Image />)
    assert.deepEqual(
      initial.props.style,
      Image.defaultProps.style
    )

    const unsupported = shallowRender(<Image style={{ unsupported: 'true' }} />)
    assert.deepEqual(
      unsupported.props.style.unsupported,
      null,
      'unsupported "style" properties must not be transferred'
    )
  })

  test('prop "testID"', () => {
    const testID = 'Example.image'
    const elementHasTestID = getImageDOM({ testID })

    assert.equal(
      elementHasTestID.getAttribute('data-testid'),
      testID
    )
  })
})
