/* eslint-env mocha */

import assert from 'assert';
import React from 'react';
import StyleSheet from '../../../apis/StyleSheet';
import TextareaAutosize from 'react-textarea-autosize';
import TextInput from '..';
import { mount, shallow } from 'enzyme';

const placeholderText = 'placeholderText';
const findNativeInput = (wrapper) => wrapper.find('input');
const findNativeTextarea = (wrapper) => wrapper.find(TextareaAutosize);
const findPlaceholder = (wrapper) => wrapper.find({ children: placeholderText });

const testIfDocumentIsFocused = (message, fn) => {
  if (document.hasFocus && document.hasFocus()) {
    test(message, fn);
  } else {
    test.skip(`${message} – document is not focused`);
  }
};

suite('components/TextInput', () => {
  test('prop "autoComplete"', () => {
    // off
    let input = findNativeInput(shallow(<TextInput />));
    assert.equal(input.prop('autoComplete'), undefined);
    // on
    input = findNativeInput(shallow(<TextInput autoComplete />));
    assert.equal(input.prop('autoComplete'), 'on');
  });

  test('prop "autoFocus"', () => {
    // false
    let input = findNativeInput(mount(<TextInput />));
    assert.equal(input.prop('autoFocus'), undefined);
    // true
    input = findNativeInput(mount(<TextInput autoFocus />));
    assert.equal(input.prop('autoFocus'), true);
  });

  testIfDocumentIsFocused('prop "clearTextOnFocus"', () => {
    const defaultValue = 'defaultValue';
    // false
    let input = findNativeInput(mount(<TextInput defaultValue={defaultValue} />));
    input.simulate('focus');
    assert.equal(input.node.value, defaultValue);
    // true
    input = findNativeInput(mount(<TextInput clearTextOnFocus defaultValue={defaultValue} />));
    input.simulate('focus');
    assert.equal(input.node.value, '');
  });

  test('prop "defaultValue"', () => {
    const defaultValue = 'defaultValue';
    const input = findNativeInput(shallow(<TextInput defaultValue={defaultValue} />));
    assert.equal(input.prop('defaultValue'), defaultValue);
  });

  test('prop "editable"', () => {
    // true
    let input = findNativeInput(shallow(<TextInput />));
    assert.equal(input.prop('readOnly'), false);
    // false
    input = findNativeInput(shallow(<TextInput editable={false} />));
    assert.equal(input.prop('readOnly'), true);
  });

  test('prop "keyboardType"', () => {
    // default
    let input = findNativeInput(shallow(<TextInput />));
    assert.equal(input.prop('type'), 'text');
    input = findNativeInput(shallow(<TextInput keyboardType='default' />));
    assert.equal(input.prop('type'), 'text');
    // email-address
    input = findNativeInput(shallow(<TextInput keyboardType='email-address' />));
    assert.equal(input.prop('type'), 'email');
    // numeric
    input = findNativeInput(shallow(<TextInput keyboardType='numeric' />));
    assert.equal(input.prop('type'), 'number');
    // phone-pad
    input = findNativeInput(shallow(<TextInput keyboardType='phone-pad' />));
    assert.equal(input.prop('type'), 'tel');
    // url
    input = findNativeInput(shallow(<TextInput keyboardType='url' />));
    assert.equal(input.prop('type'), 'url');
  });

  test('prop "maxLength"', () => {
    let input = findNativeInput(shallow(<TextInput />));
    assert.equal(input.prop('maxLength'), undefined);
    input = findNativeInput(shallow(<TextInput maxLength={10} />));
    assert.equal(input.prop('maxLength'), '10');
  });

  test('prop "maxNumberOfLines"', () => {
    const generateValue = () => {
      let str = '';
      while (str.length < 100) { str += 'x'; }
      return str;
    };

    const input = findNativeTextarea(shallow(
      <TextInput
        maxNumberOfLines={3}
        multiline
        value={generateValue()}
      />
    ));
    assert.equal(input.prop('maxRows'), 3);
  });

  test('prop "multiline"', () => {
    // false
    let input = findNativeInput(shallow(<TextInput />));
    assert.equal(input.length, 1);
    // true
    input = findNativeTextarea(shallow(<TextInput multiline />));
    assert.equal(input.length, 1);
  });

  test('prop "numberOfLines"', () => {
    // missing multiline
    let input = findNativeInput(shallow(<TextInput numberOfLines={2} />));
    assert.equal(input.length, 1);
    // with multiline
    input = findNativeTextarea(shallow(<TextInput multiline numberOfLines={2} />));
    assert.equal(input.length, 1);

    input = findNativeTextarea(shallow(
      <TextInput
        multiline
        numberOfLines={3}
      />
    ));
    assert.equal(input.prop('minRows'), 3);
  });

  test('prop "onBlur"', (done) => {
    const input = findNativeInput(mount(<TextInput onBlur={onBlur} />));
    input.simulate('blur');
    function onBlur(e) {
      assert.ok(e);
      done();
    }
  });

  test('prop "onChange"', (done) => {
    const input = findNativeInput(mount(<TextInput onChange={onChange} />));
    input.simulate('change');
    function onChange(e) {
      assert.ok(e);
      done();
    }
  });

  test('prop "onChangeText"', (done) => {
    const newText = 'newText';
    const input = findNativeInput(mount(<TextInput onChangeText={onChangeText} />));
    input.simulate('change', { target: { value: newText } });
    function onChangeText(text) {
      assert.equal(text, newText);
      done();
    }
  });

  test('prop "onFocus"', (done) => {
    const input = findNativeInput(mount(<TextInput onFocus={onFocus} />));
    input.simulate('focus');
    function onFocus(e) {
      assert.ok(e);
      done();
    }
  });

  test('prop "onLayout"');

  test('prop "onSelectionChange"', (done) => {
    const input = findNativeInput(mount(<TextInput defaultValue='12345' onSelectionChange={onSelectionChange} />));
    input.simulate('select', { target: { selectionStart: 0, selectionEnd: 3 } });
    function onSelectionChange(e) {
      assert.equal(e.selectionEnd, 3);
      assert.equal(e.selectionStart, 0);
      done();
    }
  });

  test('prop "placeholder"', () => {
    let textInput = shallow(<TextInput />);
    assert.equal(findPlaceholder(textInput).length, 0);

    textInput = shallow(<TextInput placeholder={placeholderText} />);
    assert.equal(findPlaceholder(textInput).length, 1);
  });

  test('prop "placeholderTextColor"', () => {
    let placeholderElement = findPlaceholder(shallow(<TextInput placeholder={placeholderText} />));
    assert.equal(StyleSheet.flatten(placeholderElement.prop('style')).color, 'darkgray');

    placeholderElement = findPlaceholder(
      shallow(<TextInput placeholder={placeholderText} placeholderTextColor='red' />)
    );
    assert.equal(StyleSheet.flatten(placeholderElement.prop('style')).color, 'red');
  });

  test('prop "secureTextEntry"', () => {
    let input = findNativeInput(shallow(<TextInput secureTextEntry />));
    assert.equal(input.prop('type'), 'password');
    // ignored for multiline
    input = findNativeTextarea(shallow(<TextInput multiline secureTextEntry />));
    assert.equal(input.prop('type'), undefined);
  });

  testIfDocumentIsFocused('prop "selectTextOnFocus"', () => {
    const text = 'Text';
    // false
    let input = findNativeInput(mount(<TextInput defaultValue={text} />));
    input.node.focus();
    assert.equal(input.node.selectionEnd, 4);
    assert.equal(input.node.selectionStart, 4);
    // true
    input = findNativeInput(mount(<TextInput defaultValue={text} selectTextOnFocus />));
    // input.node.focus()
    // assert.equal(input.node.selectionEnd, 4)
    // assert.equal(input.node.selectionStart, 0)
  });

  test('prop "style"', () => {
    const styles = StyleSheet.create({
      root: {
        borderWidth: 1,
        textAlign: 'center'
      }
    });
    const textInput = shallow(<TextInput style={styles.root} />);
    const input = findNativeInput(textInput);
    const borderWidth = StyleSheet.flatten(textInput.prop('style')).borderWidth;
    assert.equal(borderWidth, 1, 'expected View styles to be applied to the "View"');
    assert.equal(input.prop('style').textAlign, 'center', 'expected Text styles to be applied to the "input"');
  });

  test('prop "value"', () => {
    const value = 'value';
    const input = findNativeInput(shallow(<TextInput value={value} />));
    assert.equal(input.prop('value'), value);
  });
});
