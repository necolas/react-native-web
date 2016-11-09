/* eslint-env jasmine, jest */

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

describe('components/TextInput', () => {
  test('prop "autoComplete"', () => {
    // on
    let input = findNativeInput(shallow(<TextInput />));
    expect(input.prop('autoComplete')).toEqual('on');
    // off
    input = findNativeInput(shallow(<TextInput autoComplete='off' />));
    expect(input.prop('autoComplete')).toEqual('off');
  });

  test('prop "autoFocus"', () => {
    // false
    let input = findNativeInput(mount(<TextInput />));
    expect(input.prop('autoFocus')).toEqual(undefined);
    // true
    input = findNativeInput(mount(<TextInput autoFocus />));
    expect(input.prop('autoFocus')).toEqual(true);
  });

  testIfDocumentIsFocused('prop "clearTextOnFocus"', () => {
    const defaultValue = 'defaultValue';
    // false
    let input = findNativeInput(mount(<TextInput defaultValue={defaultValue} />));
    input.simulate('focus');
    expect(input.node.value).toEqual(defaultValue);
    // true
    input = findNativeInput(mount(<TextInput clearTextOnFocus defaultValue={defaultValue} />));
    input.simulate('focus');
    expect(input.node.value).toEqual('');
  });

  test('prop "defaultValue"', () => {
    const defaultValue = 'defaultValue';
    const input = findNativeInput(shallow(<TextInput defaultValue={defaultValue} />));
    expect(input.prop('defaultValue')).toEqual(defaultValue);
  });

  test('prop "editable"', () => {
    // true
    let input = findNativeInput(shallow(<TextInput />));
    expect(input.prop('readOnly')).toEqual(false);
    // false
    input = findNativeInput(shallow(<TextInput editable={false} />));
    expect(input.prop('readOnly')).toEqual(true);
  });

  test('prop "keyboardType"', () => {
    // default
    let input = findNativeInput(shallow(<TextInput />));
    expect(input.prop('type')).toEqual('text');
    input = findNativeInput(shallow(<TextInput keyboardType='default' />));
    expect(input.prop('type')).toEqual('text');
    // email-address
    input = findNativeInput(shallow(<TextInput keyboardType='email-address' />));
    expect(input.prop('type')).toEqual('email');
    // numeric
    input = findNativeInput(shallow(<TextInput keyboardType='numeric' />));
    expect(input.prop('type')).toEqual('number');
    // phone-pad
    input = findNativeInput(shallow(<TextInput keyboardType='phone-pad' />));
    expect(input.prop('type')).toEqual('tel');
    // url
    input = findNativeInput(shallow(<TextInput keyboardType='url' />));
    expect(input.prop('type')).toEqual('url');
  });

  test('prop "maxLength"', () => {
    let input = findNativeInput(shallow(<TextInput />));
    expect(input.prop('maxLength')).toEqual(undefined);
    input = findNativeInput(shallow(<TextInput maxLength={10} />));
    expect(input.prop('maxLength')).toEqual(10);
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
    expect(input.prop('maxRows')).toEqual(3);
  });

  test('prop "multiline"', () => {
    // false
    let input = findNativeInput(shallow(<TextInput />));
    expect(input.length).toEqual(1);
    // true
    input = findNativeTextarea(shallow(<TextInput multiline />));
    expect(input.length).toEqual(1);
  });

  test('prop "numberOfLines"', () => {
    // missing multiline
    let input = findNativeInput(shallow(<TextInput numberOfLines={2} />));
    expect(input.length).toEqual(1);
    // with multiline
    input = findNativeTextarea(shallow(<TextInput multiline numberOfLines={2} />));
    expect(input.length).toEqual(1);

    input = findNativeTextarea(shallow(
      <TextInput
        multiline
        numberOfLines={3}
      />
    ));
    expect(input.prop('minRows')).toEqual(3);
  });

  test('prop "onBlur"', (done) => {
    const input = findNativeInput(mount(<TextInput onBlur={onBlur} />));
    input.simulate('blur');
    function onBlur(e) {
      expect(e).toBeTruthy();
      done();
    }
  });

  test('prop "onChange"', (done) => {
    const input = findNativeInput(mount(<TextInput onChange={onChange} />));
    input.simulate('change');
    function onChange(e) {
      expect(e).toBeTruthy();
      done();
    }
  });

  test('prop "onChangeText"', (done) => {
    const newText = 'newText';
    const input = findNativeInput(mount(<TextInput onChangeText={onChangeText} />));
    input.simulate('change', { target: { value: newText } });
    function onChangeText(text) {
      expect(text).toEqual(newText);
      done();
    }
  });

  test('prop "onFocus"', (done) => {
    const input = findNativeInput(mount(<TextInput onFocus={onFocus} />));
    input.simulate('focus');
    function onFocus(e) {
      expect(e).toBeTruthy();
      done();
    }
  });

  test('prop "onLayout"');

  test('prop "onSelectionChange"', (done) => {
    const input = findNativeInput(mount(<TextInput defaultValue='12345' onSelectionChange={onSelectionChange} />));
    input.simulate('select', { target: { selectionStart: 0, selectionEnd: 3 } });
    function onSelectionChange(e) {
      expect(e.nativeEvent.selection.end).toEqual(3);
      expect(e.nativeEvent.selection.start).toEqual(0);
      done();
    }
  });

  test('prop "placeholder"', () => {
    let textInput = shallow(<TextInput />);
    expect(findPlaceholder(textInput).length).toEqual(0);

    textInput = shallow(<TextInput placeholder={placeholderText} />);
    expect(findPlaceholder(textInput).length).toEqual(1);
  });

  test('prop "placeholderTextColor"', () => {
    let placeholderElement = findPlaceholder(shallow(<TextInput placeholder={placeholderText} />));
    expect(StyleSheet.flatten(placeholderElement.prop('style')).color).toEqual('darkgray');

    placeholderElement = findPlaceholder(
      shallow(<TextInput placeholder={placeholderText} placeholderTextColor='red' />)
    );
    expect(StyleSheet.flatten(placeholderElement.prop('style')).color).toEqual('red');
  });

  test('prop "secureTextEntry"', () => {
    let input = findNativeInput(shallow(<TextInput secureTextEntry />));
    expect(input.prop('type')).toEqual('password');
    // ignored for multiline
    input = findNativeTextarea(shallow(<TextInput multiline secureTextEntry />));
    expect(input.prop('type')).toEqual(undefined);
  });

  testIfDocumentIsFocused('prop "selectTextOnFocus"', () => {
    const text = 'Text';
    // false
    let input = findNativeInput(mount(<TextInput defaultValue={text} />));
    input.node.focus();
    expect(input.node.selectionEnd).toEqual(4);
    expect(input.node.selectionStart).toEqual(4);
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
    expect(borderWidth).toEqual(1);
    expect(input.prop('style').textAlign).toEqual('center');
  });

  test('prop "value"', () => {
    const value = 'value';
    const input = findNativeInput(shallow(<TextInput value={value} />));
    expect(input.prop('value')).toEqual(value);
  });
});
