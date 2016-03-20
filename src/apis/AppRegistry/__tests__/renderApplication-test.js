/* eslint-env mocha */

import assert from 'assert'
import React from 'react'
import { elementId } from '../../StyleSheet'
import { prerenderApplication } from '../renderApplication'

const component = () => <div />

suite('apis/AppRegistry/renderApplication', () => {
  test('prerenderApplication', () => {
    const { html, style, styleElement } = prerenderApplication(component, {})

    assert.ok(html.indexOf('<div ') > -1)
    assert.ok(typeof style === 'string')
    assert.equal(styleElement.type, 'style')
    assert.equal(styleElement.props.id, elementId)
    assert.equal(styleElement.props.dangerouslySetInnerHTML.__html, style)
  })
})
