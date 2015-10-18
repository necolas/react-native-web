/* eslint-env mocha */

import * as utils from '../../../modules/specHelpers'
import assert from 'assert'
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'

import TextInput from '../'

suite('components/TextInput', () => {
  test('prop "accessibilityLabel"', () => {
    const accessibilityLabel = 'accessibilityLabel'
    const result = utils.shallowRender(<TextInput accessibilityLabel={accessibilityLabel} />)
    assert.equal(result.props.accessibilityLabel, accessibilityLabel)
  })

  test('prop "autoComplete"', () => {
    // off
    let dom = utils.renderToDOM(<TextInput />)
    assert.equal(dom.getAttribute('autocomplete'), undefined)
    // on
    dom = utils.renderToDOM(<TextInput autoComplete />)
    assert.equal(dom.getAttribute('autocomplete'), 'on')
  })

  test('prop "autoFocus"', () => {
    // false
    let dom = utils.renderToDOM(<TextInput />)
    assert.deepEqual(document.activeElement, document.body)
    // true
    dom = utils.renderToDOM(<TextInput autoFocus />)
    assert.deepEqual(document.activeElement, dom)
  })

  utils.testIfDocumentFocused('prop "clearTextOnFocus"', () => {
    const defaultValue = 'defaultValue'
    // false
    let dom = utils.renderAndInject(<TextInput defaultValue={defaultValue} />)
    dom.focus()
    assert.equal(dom.value, defaultValue)
    // true
    dom = utils.renderAndInject(<TextInput clearTextOnFocus defaultValue={defaultValue} />)
    dom.focus()
    assert.equal(dom.value, '')
  })

  test('prop "defaultValue"', () => {
    const defaultValue = 'defaultValue'
    const result = utils.shallowRender(<TextInput defaultValue={defaultValue} />)
    assert.equal(result.props.defaultValue, defaultValue)
  })

  test('prop "editable"', () => {
    // true
    let dom = utils.renderToDOM(<TextInput />)
    assert.equal(dom.getAttribute('readonly'), undefined)
    // false
    dom = utils.renderToDOM(<TextInput editable={false} />)
    assert.equal(dom.getAttribute('readonly'), '')
  })

  test('prop "keyboardType"', () => {
    // default
    let dom = utils.renderToDOM(<TextInput />)
    assert.equal(dom.getAttribute('type'), undefined)
    dom = utils.renderToDOM(<TextInput keyboardType='default' />)
    assert.equal(dom.getAttribute('type'), undefined)
    // email-address
    dom = utils.renderToDOM(<TextInput keyboardType='email-address' />)
    assert.equal(dom.getAttribute('type'), 'email')
    // numeric
    dom = utils.renderToDOM(<TextInput keyboardType='numeric' />)
    assert.equal(dom.getAttribute('type'), 'number')
    // phone-pad
    dom = utils.renderToDOM(<TextInput keyboardType='phone-pad' />)
    assert.equal(dom.getAttribute('type'), 'tel')
    // url
    dom = utils.renderToDOM(<TextInput keyboardType='url' />)
    assert.equal(dom.getAttribute('type'), 'url')
  })

  test('prop "maxLength"', () => {
    let dom = utils.renderToDOM(<TextInput />)
    assert.equal(dom.getAttribute('maxlength'), undefined)
    dom = utils.renderToDOM(<TextInput maxLength={10} />)
    assert.equal(dom.getAttribute('maxlength'), '10')
  })

  test('prop "maxNumberOfLines"', () => {
    const style = { borderWidth: 0, fontSize: 20, lineHeight: 1 }
    const value = (() => {
      let str = ''
      while (str.length < 100) str += 'x'
      return str
    }())
    let dom = utils.renderAndInject(
      <TextInput
        maxNumberOfLines={3}
        multiline
        style={style}
        value={value}
      />
    )
    const height = dom.getBoundingClientRect().height
    // need a range because of cross-browser differences
    assert.ok(height >= 60, height)
    assert.ok(height <= 66, height)
  })

  test('prop "multiline"', () => {
    // false
    let dom = utils.renderToDOM(<TextInput />)
    assert.equal(dom.tagName, 'INPUT')
    // true
    dom = utils.renderToDOM(<TextInput multiline />)
    assert.equal(dom.tagName, 'TEXTAREA')
  })

  test('prop "numberOfLines"', () => {
    const style = { borderWidth: 0, fontSize: 20, lineHeight: 1 }
    // missing multiline
    let dom = utils.renderToDOM(<TextInput numberOfLines={2} />)
    assert.equal(dom.tagName, 'INPUT')
    // with multiline
    dom = utils.renderAndInject(<TextInput multiline numberOfLines={2} style={style} />)
    assert.equal(dom.tagName, 'TEXTAREA')
    const height = dom.getBoundingClientRect().height
    // need a range because of cross-browser differences
    assert.ok(height >= 40)
    assert.ok(height <= 46)
  })

  test('prop "onBlur"', (done) => {
    const input = utils.renderToDOM(<TextInput onBlur={onBlur} />)
    ReactTestUtils.Simulate.blur(input)
    function onBlur(e) {
      assert.ok(e)
      done()
    }
  })

  test('prop "onChange"', (done) => {
    const input = utils.renderToDOM(<TextInput onChange={onChange} />)
    ReactTestUtils.Simulate.change(input)
    function onChange(e) {
      assert.ok(e)
      done()
    }
  })

  test('prop "onChangeText"', (done) => {
    const newText = 'newText'
    const input = utils.renderToDOM(<TextInput onChangeText={onChangeText} />)
    ReactTestUtils.Simulate.change(input, { target: { value: newText } })
    function onChangeText(text) {
      assert.equal(text, newText)
      done()
    }
  })

  test('prop "onFocus"', (done) => {
    const input = utils.renderToDOM(<TextInput onFocus={onFocus} />)
    ReactTestUtils.Simulate.focus(input)
    function onFocus(e) {
      assert.ok(e)
      done()
    }
  })

  test('prop "onLayout"')

  test('prop "onSelectionChange"', (done) => {
    const input = utils.renderAndInject(<TextInput defaultValue='12345' onSelectionChange={onSelectionChange} />)
    ReactTestUtils.Simulate.select(input, { target: { selectionStart: 0, selectionEnd: 3 } })
    function onSelectionChange(e) {
      assert.equal(e.selectionEnd, 3)
      assert.equal(e.selectionStart, 0)
      done()
    }
  })

  test('prop "placeholder"')

  test('prop "placeholderTextColor"')

  test('prop "secureTextEntry"', () => {
    let dom = utils.renderToDOM(<TextInput secureTextEntry />)
    assert.equal(dom.getAttribute('type'), 'password')
    // ignored for multiline
    dom = utils.renderToDOM(<TextInput multiline secureTextEntry />)
    assert.equal(dom.getAttribute('type'), undefined)
  })

  utils.testIfDocumentFocused('prop "selectTextOnFocus"', () => {
    const text = 'Text'
    // false
    let dom = utils.renderAndInject(<TextInput defaultValue={text} />)
    dom.focus()
    assert.equal(dom.selectionEnd, 0)
    assert.equal(dom.selectionStart, 0)
    // true
    dom = utils.renderAndInject(<TextInput defaultValue={text} selectTextOnFocus />)
    dom.focus()
    assert.equal(dom.selectionEnd, 4)
    assert.equal(dom.selectionStart, 0)
  })

  test('prop "style"', () => {
    utils.assertProps.style(TextInput)
  })

  test('prop "testID"', () => {
    const testID = 'testID'
    const result = utils.shallowRender(<TextInput testID={testID} />)
    assert.equal(result.props.testID, testID)
  })

  test('prop "value"', () => {
    const value = 'value'
    const result = utils.shallowRender(<TextInput value={value} />)
    assert.equal(result.props.value, value)
  })
})
