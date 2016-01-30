/* eslint-env mocha */

import assert from 'assert'
import flattenStyles from '../StyleSheet/flattenStyles'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'

export const assertProps = {
  style: function (Component, props) {
    let shallow
    // default styles
    shallow = shallowRender(<Component {...props} />)
    assert.deepEqual(
      flattenStyles(shallow.props.style),
      flattenStyles(Component.defaultProps.style)
    )
    // filtering of unsupported styles
    const styleToFilter = { unsupported: 'unsupported' }
    shallow = shallowRender(<Component {...props} style={styleToFilter} />)
    assert.deepEqual(
      shallow.props.style.unsupported,
      undefined,
      'unsupported "style" properties must not be transferred'
    )
    // merging of custom styles
    const styleToMerge = { margin: '10' }
    shallow = shallowRender(<Component {...props} style={styleToMerge} />)
    assert.deepEqual(
      flattenStyles(shallow.props.style),
      flattenStyles({ ...Component.defaultProps.style, ...styleToMerge })
    )
  }
}

export function render(element, container) {
  return container
    ? ReactDOM.render(element, container)
    : ReactTestUtils.renderIntoDocument(element)
}

export function renderAndInject(element) {
  const id = '_renderAndInject'
  let div = document.getElementById(id)

  if (!div) {
    div = document.createElement('div')
    div.id = id
    document.body.appendChild(div)
  } else {
    div.innerHTML = ''
  }

  const result = render(element, div)
  return ReactDOM.findDOMNode(result)
}

export function renderToDOM(element, container) {
  const result = render(element, container)
  return ReactDOM.findDOMNode(result)
}

export function shallowRender(component, context = {}) {
  const shallowRenderer = ReactTestUtils.createRenderer()
  shallowRenderer.render(component, context)
  return shallowRenderer.getRenderOutput()
}

export function testIfDocumentFocused(message, fn) {
  if (document.hasFocus && document.hasFocus()) {
    test(message, fn)
  } else {
    test.skip(`${message} – WARNING: document is not focused`)
  }
}
