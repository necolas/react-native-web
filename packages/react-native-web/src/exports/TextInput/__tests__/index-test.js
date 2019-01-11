/* eslint-env jasmine, jest */

import React from 'react';
import ReactDOM from 'react-dom';
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
  describe('prop "autoComplete"', () => {
    test('value "on"', () => {
      const input = findNativeInput(shallow(<TextInput />));
      expect(input.prop('autoComplete')).toEqual('on');
    });

    test('value "off"', () => {
      const input = findNativeInput(shallow(<TextInput autoComplete="off" />));
      expect(input.prop('autoComplete')).toEqual('off');
    });
  });

  describe('prop "autoFocus"', () => {
    test('value "false"', () => {
      const input = findNativeInput(shallow(<TextInput />));
      expect(input.prop('autoFocus')).toEqual(undefined);
    });

    test('value "true"', () => {
      const input = findNativeInput(shallow(<TextInput autoFocus />));
      expect(input.prop('autoFocus')).toEqual(true);
    });
  });

  describe('prop "clearTextOnFocus"', () => {
    const defaultValue = 'defaultValue';

    testIfDocumentIsFocused('value "false"', () => {
      const input = findNativeInput(shallow(<TextInput defaultValue={defaultValue} />));
      input.simulate('focus');
      expect(input.node.value).toEqual(defaultValue);
    });

    testIfDocumentIsFocused('value "true"', () => {
      const input = findNativeInput(
        shallow(<TextInput clearTextOnFocus defaultValue={defaultValue} />)
      );
      input.simulate('focus');
      expect(input.node.value).toEqual('');
    });
  });

  test('prop "defaultValue"', () => {
    const defaultValue = 'defaultValue';
    const input = findNativeInput(shallow(<TextInput defaultValue={defaultValue} />));
    expect(input.prop('defaultValue')).toEqual(defaultValue);
  });

  describe('prop "editable"', () => {
    test('value "true"', () => {
      const input = findNativeInput(shallow(<TextInput />));
      expect(input.prop('readOnly')).toEqual(false);
    });

    test('value "false"', () => {
      const input = findNativeInput(shallow(<TextInput editable={false} />));
      expect(input.prop('readOnly')).toEqual(true);
    });
  });

  describe('prop "keyboardType"', () => {
    test('default value', () => {
      let input = findNativeInput(shallow(<TextInput />));
      expect(input.prop('type')).toEqual('text');
      input = findNativeInput(shallow(<TextInput keyboardType="default" />));
      expect(input.prop('type')).toEqual('text');
    });

    test('value "email-address"', () => {
      const input = findNativeInput(shallow(<TextInput keyboardType="email-address" />));
      expect(input.prop('type')).toEqual('email');
    });

    test('value "numeric"', () => {
      const input = findNativeInput(shallow(<TextInput keyboardType="numeric" />));
      expect(input.prop('type')).toEqual('number');
    });

    test('value "phone-pad"', () => {
      const input = findNativeInput(shallow(<TextInput keyboardType="phone-pad" />));
      expect(input.prop('type')).toEqual('tel');
    });

    test('value "url"', () => {
      const input = findNativeInput(shallow(<TextInput keyboardType="url" />));
      expect(input.prop('type')).toEqual('url');
    });
  });

  test('prop "maxLength"', () => {
    let input = findNativeInput(shallow(<TextInput />));
    expect(input.prop('maxLength')).toEqual(undefined);
    input = findNativeInput(shallow(<TextInput maxLength={10} />));
    expect(input.prop('maxLength')).toEqual(10);
  });

  describe('prop "multiline"', () => {
    test('value "false"', () => {
      const input = findNativeInput(shallow(<TextInput />));
      expect(input.length).toEqual(1);
    });

    test('value "true"', () => {
      const input = findNativeTextarea(shallow(<TextInput multiline />));
      expect(input.length).toEqual(1);
    });
  });

  describe('prop "numberOfLines"', () => {
    test('without "multiline"', () => {
      const input = findNativeInput(shallow(<TextInput numberOfLines={2} />));
      expect(input.length).toEqual(1);
    });

    test('with "multiline"', () => {
      const input = findNativeTextarea(shallow(<TextInput multiline numberOfLines={3} />));
      expect(input.prop('rows')).toEqual(3);
    });
  });

  test('prop "onBlur"', () => {
    const onBlur = jest.fn();
    const input = findNativeInput(mount(<TextInput onBlur={onBlur} />));
    const node = ReactDOM.findDOMNode(input.instance());

    // more accurate blur simulation
    input.simulate('blur');
    node.blur();

    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(TextInput.State.currentlyFocusedField()).toBe(null);
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

  describe('prop "onContentSizeChange"', () => {
    test('without "multiline"', () => {
      const onContentSizeChange = jest.fn();
      const input = findNativeInput(mount(<TextInput onContentSizeChange={onContentSizeChange} />));
      input.simulate('change');
      expect(onContentSizeChange).toHaveBeenCalledTimes(0);
    });

    test('with "multiline"', () => {
      const onContentSizeChange = jest.fn();
      const input = findNativeTextarea(
        mount(<TextInput multiline onContentSizeChange={onContentSizeChange} />)
      );
      const newText = 'my text';
      input.simulate('change', { target: { value: newText } });
      // NOTE: enzyme/jsdom don't support scrollHeight/scrollWidth so we only get 0
      // That also means we don't know whent the content size has "changed"
      // In practice we would expect this spy to be called twice, once on mount
      // and once when the text changes.
      expect(onContentSizeChange).toHaveBeenCalledTimes(1);
      expect(onContentSizeChange).toBeCalledWith({
        nativeEvent: { contentSize: { width: 0, height: 0 } }
      });
    });
  });

  test('prop "onFocus"', () => {
    const onFocus = jest.fn();
    const input = findNativeInput(mount(<TextInput onFocus={onFocus} />));
    const node = ReactDOM.findDOMNode(input.instance());

    // more accurate focus simulation
    input.simulate('focus');
    node.focus();

    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(TextInput.State.currentlyFocusedField()).toBe(node);
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

    test('arrow key', () => {
      const onKeyPress = jest.fn();
      const input = findNativeInput(mount(<TextInput onKeyPress={onKeyPress} />));
      input.simulate('keyPress', { which: 37 });
      expect(onKeyPress).toHaveBeenCalledTimes(1);
      expect(onKeyPress).toBeCalledWith(
        expect.objectContaining({
          nativeEvent: {
            altKey: undefined,
            ctrlKey: undefined,
            key: 'ArrowLeft',
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

    test('multi-line input with "blurOnSubmit" triggers "onSubmitEditing"', () => {
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

  describe('prop "selectTextOnFocus"', () => {
    testIfDocumentIsFocused('value "false"', () => {
      const input = findNativeInput(mount(<TextInput defaultValue={'text'} />));
      input.node.focus();
      expect(input.node.selectionEnd).toEqual(4);
      expect(input.node.selectionStart).toEqual(4);
    });

    // testIfDocumentIsFocused('value "true"', () => {
    // const input = findNativeInput(mount(<TextInput defaultValue={'text'} selectTextOnFocus />));
    // input.node.focus()
    // assert.equal(input.node.selectionEnd, 4)
    // assert.equal(input.node.selectionStart, 0)
    // });
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

  describe('prop "spellCheck"', () => {
    test('default value', () => {
      const input = findNativeInput(shallow(<TextInput />));
      expect(input.prop('spellCheck')).toEqual(true);
    });

    test('inherit from "autoCorrect"', () => {
      const input = findNativeInput(shallow(<TextInput autoCorrect={false} />));
      expect(input.prop('spellCheck')).toEqual(false);
    });

    test('value "false"', () => {
      const input = findNativeInput(shallow(<TextInput spellCheck={false} />));
      expect(input.prop('spellCheck')).toEqual(false);
    });
  });

  test('prop "value"', () => {
    const value = 'value';
    const input = findNativeInput(shallow(<TextInput value={value} />));
    expect(input.prop('value')).toEqual(value);
  });
});
