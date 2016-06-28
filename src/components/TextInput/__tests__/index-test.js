/* eslint-env mocha */

import * as utils from '../../../modules/specHelpers'
import assert from 'assert'
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import StyleSheet from '../../../apis/StyleSheet'

import TextInput from '../'

const findInput = (dom) => dom.querySelector('input, textarea')
const findShallowInput = (vdom) => vdom.props.children.props.children[0]
const findShallowPlaceholder = (vdom) => vdom.props.children.props.children[1]

suite('components/TextInput', () => {
  test('prop "autoComplete"', () => {
    // off
    let input = findInput(utils.renderToDOM(<TextInput />))
    assert.equal(input.getAttribute('autocomplete'), undefined)
    // on
    input = findInput(utils.renderToDOM(<TextInput autoComplete />))
    assert.equal(input.getAttribute('autocomplete'), 'on')
  })

  test.skip('prop "autoFocus"', () => {
    // false
    let input = findInput(utils.renderToDOM(<TextInput />))
    assert.deepEqual(document.activeElement, document.body)
    // true
    input = findInput(utils.renderToDOM(<TextInput autoFocus />))
    assert.deepEqual(document.activeElement, input)
  })

  utils.testIfDocumentFocused('prop "clearTextOnFocus"', () => {
    const defaultValue = 'defaultValue'
    // false
    let input = findInput(utils.renderAndInject(<TextInput defaultValue={defaultValue} />))
    input.focus()
    assert.equal(input.value, defaultValue)
    // true
    input = findInput(utils.renderAndInject(<TextInput clearTextOnFocus defaultValue={defaultValue} />))
    input.focus()
    assert.equal(input.value, '')
  })

  test('prop "defaultValue"', () => {
    const defaultValue = 'defaultValue'
    const input = findShallowInput(utils.shallowRender(<TextInput defaultValue={defaultValue} />))
    assert.equal(input.props.defaultValue, defaultValue)
  })

  test('prop "editable"', () => {
    // true
    let input = findInput(utils.renderToDOM(<TextInput />))
    assert.equal(input.getAttribute('readonly'), undefined)
    // false
    input = findInput(utils.renderToDOM(<TextInput editable={false} />))
    assert.equal(input.getAttribute('readonly'), '')
  })

  test('prop "keyboardType"', () => {
    // default
    let input = findInput(utils.renderToDOM(<TextInput />))
    assert.equal(input.getAttribute('type'), undefined)
    input = findInput(utils.renderToDOM(<TextInput keyboardType='default' />))
    assert.equal(input.getAttribute('type'), undefined)
    // email-address
    input = findInput(utils.renderToDOM(<TextInput keyboardType='email-address' />))
    assert.equal(input.getAttribute('type'), 'email')
    // numeric
    input = findInput(utils.renderToDOM(<TextInput keyboardType='numeric' />))
    assert.equal(input.getAttribute('type'), 'number')
    // phone-pad
    input = findInput(utils.renderToDOM(<TextInput keyboardType='phone-pad' />))
    assert.equal(input.getAttribute('type'), 'tel')
    // url
    input = findInput(utils.renderToDOM(<TextInput keyboardType='url' />))
    assert.equal(input.getAttribute('type'), 'url')
  })

  test('prop "maxLength"', () => {
    let input = findInput(utils.renderToDOM(<TextInput />))
    assert.equal(input.getAttribute('maxlength'), undefined)
    input = findInput(utils.renderToDOM(<TextInput maxLength={10} />))
    assert.equal(input.getAttribute('maxlength'), '10')
  })

  test('prop "maxNumberOfLines"', () => {
    const generateValue = () => {
      let str = ''
      while (str.length < 100) str += 'x'
      return str
    }

    const result = utils.shallowRender(
      <TextInput
        maxNumberOfLines={3}
        multiline
        value={generateValue()}
      />
    )
    assert.equal(findShallowInput(result).props.maxRows, 3)
  })

  test('prop "multiline"', () => {
    // false
    let input = findInput(utils.renderToDOM(<TextInput />))
    assert.equal(input.tagName, 'INPUT')
    // true
    input = findInput(utils.renderToDOM(<TextInput multiline />))
    assert.equal(input.tagName, 'TEXTAREA')
  })

  test('prop "numberOfLines"', () => {
    // missing multiline
    let input = findInput(utils.renderToDOM(<TextInput numberOfLines={2} />))
    assert.equal(input.tagName, 'INPUT')
    // with multiline
    input = findInput(utils.renderAndInject(<TextInput multiline numberOfLines={2} />))
    assert.equal(input.tagName, 'TEXTAREA')

    const result = utils.shallowRender(
      <TextInput
        multiline
        numberOfLines={3}
      />
    )
    assert.equal(findShallowInput(result).props.minRows, 3)
  })

  test('prop "onBlur"', (done) => {
    const input = findInput(utils.renderToDOM(<TextInput onBlur={onBlur} />))
    ReactTestUtils.Simulate.blur(input)
    function onBlur(e) {
      assert.ok(e)
      done()
    }
  })

  test('prop "onChange"', (done) => {
    const input = findInput(utils.renderToDOM(<TextInput onChange={onChange} />))
    ReactTestUtils.Simulate.change(input)
    function onChange(e) {
      assert.ok(e)
      done()
    }
  })

  test('prop "onChangeText"', (done) => {
    const newText = 'newText'
    const input = findInput(utils.renderToDOM(<TextInput onChangeText={onChangeText} />))
    ReactTestUtils.Simulate.change(input, { target: { value: newText } })
    function onChangeText(text) {
      assert.equal(text, newText)
      done()
    }
  })

  test('prop "onFocus"', (done) => {
    const input = findInput(utils.renderToDOM(<TextInput onFocus={onFocus} />))
    ReactTestUtils.Simulate.focus(input)
    function onFocus(e) {
      assert.ok(e)
      done()
    }
  })

  test('prop "onLayout"')

  test('prop "onSelectionChange"', (done) => {
    const input = findInput(utils.renderAndInject(<TextInput defaultValue='12345' onSelectionChange={onSelectionChange} />))
    ReactTestUtils.Simulate.select(input, { target: { selectionStart: 0, selectionEnd: 3 } })
    function onSelectionChange(e) {
      assert.equal(e.selectionEnd, 3)
      assert.equal(e.selectionStart, 0)
      done()
    }
  })

  test('prop "placeholder"', () => {
    const placeholder = 'placeholder'
    const result = findShallowPlaceholder(utils.shallowRender(<TextInput placeholder={placeholder} />))
    assert.equal(result.props.children.props.children, placeholder)
  })

  test('prop "placeholderTextColor"', () => {
    const placeholder = 'placeholder'

    let result = findShallowPlaceholder(utils.shallowRender(<TextInput placeholder={placeholder} />))
    assert.equal(StyleSheet.flatten(result.props.children.props.style).color, 'darkgray')

    result = findShallowPlaceholder(utils.shallowRender(<TextInput placeholder={placeholder} placeholderTextColor='red' />))
    assert.equal(StyleSheet.flatten(result.props.children.props.style).color, 'red')
  })

  test('prop "secureTextEntry"', () => {
    let input = findInput(utils.renderToDOM(<TextInput secureTextEntry />))
    assert.equal(input.getAttribute('type'), 'password')
    // ignored for multiline
    input = findInput(utils.renderToDOM(<TextInput multiline secureTextEntry />))
    assert.equal(input.getAttribute('type'), undefined)
  })

  utils.testIfDocumentFocused('prop "selectTextOnFocus"', () => {
    const text = 'Text'
    // false
    let input = findInput(utils.renderAndInject(<TextInput defaultValue={text} />))
    input.focus()
    assert.equal(input.selectionEnd, 0)
    assert.equal(input.selectionStart, 0)
    // true
    input = findInput(utils.renderAndInject(<TextInput defaultValue={text} selectTextOnFocus />))
    input.focus()
    assert.equal(input.selectionEnd, 4)
    assert.equal(input.selectionStart, 0)
  })

  test('prop "value"', () => {
    const value = 'value'
    const input = findShallowInput(utils.shallowRender(<TextInput value={value} />))
    assert.equal(input.props.value, value)
  })
})
