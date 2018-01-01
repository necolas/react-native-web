/* eslint-env jasmine, jest */

import React from 'react';
import TextInput from '..';
import { mount, shallow } from 'enzyme';

const findNativeInput = wrapper => wrapper.find('input');
const findNativeTextarea = wrapper => wrapper.find('textarea');

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
    input = findNativeInput(shallow(<TextInput autoComplete="off" />));
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
    input = findNativeInput(shallow(<TextInput keyboardType="default" />));
    expect(input.prop('type')).toEqual('text');
    // email-address
    input = findNativeInput(shallow(<TextInput keyboardType="email-address" />));
    expect(input.prop('type')).toEqual('email');
    // numeric
    input = findNativeInput(shallow(<TextInput keyboardType="numeric" />));
    expect(input.prop('type')).toEqual('number');
    // phone-pad
    input = findNativeInput(shallow(<TextInput keyboardType="phone-pad" />));
    expect(input.prop('type')).toEqual('tel');
    // url
    input = findNativeInput(shallow(<TextInput keyboardType="url" />));
    expect(input.prop('type')).toEqual('url');
  });

  test('prop "maxLength"', () => {
    let input = findNativeInput(shallow(<TextInput />));
    expect(input.prop('maxLength')).toEqual(undefined);
    input = findNativeInput(shallow(<TextInput maxLength={10} />));
    expect(input.prop('maxLength')).toEqual(10);
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

    input = findNativeTextarea(shallow(<TextInput multiline numberOfLines={3} />));
    expect(input.prop('rows')).toEqual(3);
  });

  test('prop "onBlur"', () => {
    const onBlur = jest.fn();
    const input = findNativeInput(mount(<TextInput onBlur={onBlur} />));
    input.simulate('blur');
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  test('prop "onChange"', () => {
    const onChange = jest.fn();
    const input = findNativeInput(mount(<TextInput onChange={onChange} />));
    input.simulate('change');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('prop "onChangeText"', () => {
    const onChangeText = jest.fn();
    const newText = 'newText';
    const input = findNativeInput(mount(<TextInput onChangeText={onChangeText} />));
    input.simulate('change', { target: { value: newText } });
    expect(onChangeText).toHaveBeenCalledTimes(1);
    expect(onChangeText).toBeCalledWith(newText);
  });

  test('prop "onFocus"', () => {
    const onFocus = jest.fn();
    const input = findNativeInput(mount(<TextInput onFocus={onFocus} />));
    input.simulate('focus');
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  describe('prop "onKeyPress"', () => {
    test('backspace key', () => {
      const onKeyPress = jest.fn();
      const input = findNativeInput(mount(<TextInput onKeyPress={onKeyPress} />));
      input.simulate('keyDown', { which: 8 });
      expect(onKeyPress).toHaveBeenCalledTimes(1);
      expect(onKeyPress).toBeCalledWith(
        expect.objectContaining({
          nativeEvent: {
            altKey: undefined,
            ctrlKey: undefined,
            key: 'Backspace',
            metaKey: undefined,
            shiftKey: undefined,
            target: expect.anything()
          }
        })
      );
    });

    test('tab key', () => {
      const onKeyPress = jest.fn();
      const input = findNativeInput(mount(<TextInput onKeyPress={onKeyPress} />));
      input.simulate('keyDown', { which: 9 });
      expect(onKeyPress).toHaveBeenCalledTimes(1);
      expect(onKeyPress).toBeCalledWith(
        expect.objectContaining({
          nativeEvent: {
            altKey: undefined,
            ctrlKey: undefined,
            key: 'Tab',
            metaKey: undefined,
            shiftKey: undefined,
            target: expect.anything()
          }
        })
      );
    });

    test('enter key', () => {
      const onKeyPress = jest.fn();
      const input = findNativeInput(mount(<TextInput onKeyPress={onKeyPress} />));
      input.simulate('keyPress', { which: 13 });
      expect(onKeyPress).toHaveBeenCalledTimes(1);
      expect(onKeyPress).toBeCalledWith(
        expect.objectContaining({
          nativeEvent: {
            altKey: undefined,
            ctrlKey: undefined,
            key: 'Enter',
            metaKey: undefined,
            shiftKey: undefined,
            target: expect.anything()
          }
        })
      );
    });

    test('space key', () => {
      const onKeyPress = jest.fn();
      const input = findNativeInput(mount(<TextInput onKeyPress={onKeyPress} />));
      input.simulate('keyPress', { which: 32 });
      expect(onKeyPress).toHaveBeenCalledTimes(1);
      expect(onKeyPress).toBeCalledWith(
        expect.objectContaining({
          nativeEvent: {
            altKey: undefined,
            ctrlKey: undefined,
            key: ' ',
            metaKey: undefined,
            shiftKey: undefined,
            target: expect.anything()
          }
        })
      );
    });

    test('text key', () => {
      const onKeyPress = jest.fn();
      const input = findNativeInput(mount(<TextInput onKeyPress={onKeyPress} />));
      input.simulate('keyPress', { which: 97 });
      expect(onKeyPress).toHaveBeenCalledTimes(1);
      expect(onKeyPress).toBeCalledWith(
        expect.objectContaining({
          nativeEvent: {
            altKey: undefined,
            ctrlKey: undefined,
            key: 'a',
            metaKey: undefined,
            shiftKey: undefined,
            target: expect.anything()
          }
        })
      );
    });

    test('modifier keys are included', () => {
      const onKeyPress = jest.fn();
      const input = findNativeInput(mount(<TextInput onKeyPress={onKeyPress} />));
      input.simulate('keyPress', {
        altKey: true,
        ctrlKey: true,
        metaKey: true,
        shiftKey: true,
        which: 32
      });
      expect(onKeyPress).toHaveBeenCalledTimes(1);
      expect(onKeyPress).toBeCalledWith(
        expect.objectContaining({
          nativeEvent: {
            altKey: true,
            ctrlKey: true,
            key: ' ',
            metaKey: true,
            shiftKey: true,
            target: expect.anything()
          }
        })
      );
    });

    test('meta key + Enter calls "onKeyPress"', () => {
      const onKeyPress = jest.fn();
      const input = findNativeInput(mount(<TextInput onKeyPress={onKeyPress} />));
      input.simulate('keyDown', {
        metaKey: true,
        which: 13
      });
      expect(onKeyPress).toHaveBeenCalledTimes(1);
    });
  });

  test('prop "onSelectionChange"', done => {
    const input = findNativeInput(
      mount(<TextInput defaultValue="12345" onSelectionChange={onSelectionChange} />)
    );
    input.simulate('select', {
      target: { selectionStart: 0, selectionEnd: 3 }
    });
    function onSelectionChange(e) {
      expect(e.nativeEvent.selection.end).toEqual(3);
      expect(e.nativeEvent.selection.start).toEqual(0);
      done();
    }
  });

  describe('prop "onSubmitEditing"', () => {
    test('single-line input', done => {
      const input = findNativeInput(
        mount(<TextInput defaultValue="12345" onSubmitEditing={onSubmitEditing} />)
      );
      input.simulate('keyPress', { which: 13 });
      function onSubmitEditing(e) {
        expect(e.nativeEvent.target).toBeDefined();
        expect(e.nativeEvent.text).toBe('12345');
        done();
      }
    });

    test('multi-line input', () => {
      const onSubmitEditing = jest.fn();
      const input = findNativeTextarea(
        mount(<TextInput defaultValue="12345" multiline onSubmitEditing={onSubmitEditing} />)
      );
      input.simulate('keyPress', { which: 13 });
      expect(onSubmitEditing).not.toHaveBeenCalled();
    });

    test('multi-line input with "blurOnSubmit" triggers onSubmitEditing', () => {
      const onSubmitEditing = jest.fn();
      const input = findNativeTextarea(
        mount(
          <TextInput
            blurOnSubmit
            defaultValue="12345"
            multiline
            onSubmitEditing={onSubmitEditing}
          />
        )
      );

      // shift+enter should enter newline, not submit
      input.simulate('keyPress', { which: 13, shiftKey: true });
      input.simulate('keyPress', { which: 13 });
      expect(onSubmitEditing).toHaveBeenCalledTimes(1);
      expect(onSubmitEditing).not.toHaveBeenCalledWith(expect.objectContaining({ shiftKey: true }));
    });
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

  test('prop "value"', () => {
    const value = 'value';
    const input = findNativeInput(shallow(<TextInput value={value} />));
    expect(input.prop('value')).toEqual(value);
  });

  describe('prop "selection"', () => {
    test('set cursor location', () => {
      const cursorLocation = { start: 3, end: 3 };

      const inputDefaultSelection = findNativeInput(mount(<TextInput defaultValue="12345" />));
      const inputCustomSelection = findNativeInput(
        mount(<TextInput defaultValue="12345" selection={cursorLocation} />)
      );

      // default selection is 0
      expect(inputDefaultSelection.instance().selectionStart).toEqual(0);
      expect(inputDefaultSelection.instance().selectionEnd).toEqual(0);

      // custom selection sets cursor at custom position
      expect(inputCustomSelection.instance().selectionStart).toEqual(cursorLocation.start);
      expect(inputCustomSelection.instance().selectionEnd).toEqual(cursorLocation.end);
    });
  });
});
