/* eslint-env jasmine, jest */

import React from 'react';
import TextInput from '..';
import { render } from '@testing-library/react';

function findInput(container) {
  return container.querySelector('input');
}

function findTextArea(container) {
  return container.querySelector('textarea');
}

const testIfDocumentIsFocused = (message, fn) => {
  if (document.hasFocus && document.hasFocus()) {
    test(message, fn);
  } else {
    test.skip(`${message} – document is not focused`, () => {});
  }
};

function createEvent(type, data = {}) {
  const event = document.createEvent('CustomEvent');
  event.initCustomEvent(type, true, true);
  if (data != null) {
    Object.keys(data).forEach(key => {
      const value = data[key];
      if (key === 'timeStamp' && !value) {
        return;
      }
      Object.defineProperty(event, key, { value });
    });
  }
  return event;
}

function createKeyboardEvent(
  type,
  {
    altKey = false,
    ctrlKey = false,
    isComposing = false,
    key = '',
    keyCode = 0,
    metaKey = false,
    preventDefault = () => {},
    shiftKey = false
  } = {}
) {
  return createEvent(type, {
    altKey,
    ctrlKey,
    isComposing,
    key,
    keyCode,
    metaKey,
    preventDefault,
    shiftKey
  });
}

function keydown(payload) {
  return createKeyboardEvent('keydown', payload);
}

describe('components/TextInput', () => {
  describe('prop "autoComplete"', () => {
    test('value "on"', () => {
      const { container } = render(<TextInput />);
      const input = findInput(container);
      expect(input.getAttribute('autoComplete')).toEqual('on');
    });

    test('value "off"', () => {
      const { container } = render(<TextInput autoComplete="off" />);
      const input = findInput(container);
      expect(input.getAttribute('autoComplete')).toEqual('off');
    });

    test('autoCompleteType fallback', () => {
      const { container } = render(<TextInput autoCompleteType="off" />);
      const input = findInput(container);
      expect(input.getAttribute('autoComplete')).toEqual('off');
    });
  });

  describe('prop "autoFocus"', () => {
    test('value "false"', () => {
      const { container } = render(<TextInput />);
      const input = findInput(container);
      expect(document.activeElement).not.toBe(input);
    });

    test('value "true"', () => {
      const { container } = render(<input autoFocus />);
      const input = findInput(container);
      expect(document.activeElement).toBe(input);
    });
  });

  describe('prop "clearTextOnFocus"', () => {
    const defaultValue = 'defaultValue';

    testIfDocumentIsFocused('value "false"', () => {
      const { container } = render(<TextInput defaultValue={defaultValue} />);
      const input = findInput(container);
      input.focus();
      expect(input.node.value).toEqual(defaultValue);
    });

    testIfDocumentIsFocused('value "true"', () => {
      const { container } = render(<TextInput clearTextOnFocus defaultValue={defaultValue} />);
      const input = findInput(container);
      input.focus();
      expect(input.node.value).toEqual('');
    });
  });

  test('prop "defaultValue"', () => {
    const defaultValue = 'defaultValue';
    const { container } = render(<TextInput defaultValue={defaultValue} />);
    const input = findInput(container);
    expect(input.value).toEqual(defaultValue);
  });

  describe('prop "disabled"', () => {
    test('value "false"', () => {
      const { container } = render(<TextInput />);
      const input = findInput(container);
      expect(input.disabled).toEqual(false);
    });

    test('value "true"', () => {
      const { container } = render(<TextInput disabled={true} />);
      const input = findInput(container);
      expect(input.disabled).toEqual(true);
    });
  });

  describe('prop "editable"', () => {
    test('value "true"', () => {
      const { container } = render(<TextInput />);
      const input = findInput(container);
      expect(input.readOnly).toEqual(false);
    });

    test('value "false"', () => {
      const { container } = render(<TextInput editable={false} />);
      const input = findInput(container);
      expect(input.readOnly).toEqual(true);
    });
  });

  describe('prop "keyboardType"', () => {
    test('default value', () => {
      const { container } = render(<TextInput keyboardType="default" />);
      const input = findInput(container);
      expect(input.type).toEqual('text');
    });

    test('value "email-address"', () => {
      const { container } = render(<TextInput keyboardType="email-address" />);
      const input = findInput(container);
      expect(input.type).toEqual('email');
    });

    test('value "decimal-pad"', () => {
      const { container } = render(<TextInput keyboardType="decimal-pad" />);
      const input = findInput(container);
      expect(input.inputMode).toEqual('decimal');
    });

    test('value "number-pad"', () => {
      const { container } = render(<TextInput keyboardType="number-pad" />);
      const input = findInput(container);
      expect(input.inputMode).toEqual('numeric');
    });

    test('value "numeric"', () => {
      const { container } = render(<TextInput keyboardType="numeric" />);
      const input = findInput(container);
      expect(input.inputMode).toEqual('numeric');
    });

    test('value "phone-pad"', () => {
      const { container } = render(<TextInput keyboardType="phone-pad" />);
      const input = findInput(container);
      expect(input.type).toEqual('tel');
    });

    test('value "url"', () => {
      const { container } = render(<TextInput keyboardType="url" />);
      const input = findInput(container);
      expect(input.type).toEqual('url');
    });
  });

  test('prop "maxLength"', () => {
    let { container } = render(<TextInput />);
    let input = findInput(container);
    expect(input.getAttribute('maxLength')).toEqual(null);

    ({ container } = render(<TextInput maxLength={10} />));
    input = findInput(container);
    expect(input.getAttribute('maxLength')).toEqual('10');
  });

  describe('prop "multiline"', () => {
    test('value "false"', () => {
      const { container } = render(<TextInput />);
      const input = findInput(container);
      expect(input).toBeDefined();
    });

    test('value "true"', () => {
      const { container } = render(<TextInput multiline />);
      const textarea = findTextArea(container);
      expect(textarea).toBeDefined();
    });
  });

  describe('prop "numberOfLines"', () => {
    test('without "multiline"', () => {
      const { container } = render(<TextInput numberOfLines={2} />);
      const input = findInput(container);
      const textarea = findTextArea(container);
      expect(input).toBeDefined();
      expect(textarea).toBeNull();
    });

    test('with "multiline"', () => {
      const { container } = render(<TextInput multiline numberOfLines={3} />);
      const textarea = findTextArea(container);
      expect(textarea.getAttribute('rows')).toEqual('3');
    });
  });

  test('prop "onBlur"', () => {
    const onBlur = jest.fn();
    const { container } = render(<TextInput onBlur={onBlur} />);
    const input = findInput(container);
    input.dispatchEvent(new window.FocusEvent('blur', {}));
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(TextInput.State.currentlyFocusedField()).toBe(null);
  });

  test.skip('prop "onChange"', () => {
    const onChange = jest.fn();
    const { container } = render(<TextInput onChange={onChange} />);
    const input = findInput(container);
    // This doesn't cause ReactDOM to trigger 'change' event... ¯\_(ツ)_/¯
    input.dispatchEvent(new window.Event('change', { bubbles: true }));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test.skip('prop "onChangeText"', () => {
    const onChangeText = jest.fn();
    const { container } = render(<TextInput onChangeText={onChangeText} />);
    const input = findInput(container);
    // This doesn't cause ReactDOM to trigger 'change' event... ¯\_(ツ)_/¯
    input.dispatchEvent(keydown({ key: 'a' }));
    input.dispatchEvent(new window.Event('change', { bubbles: true }));
    expect(onChangeText).toHaveBeenCalledTimes(1);
    expect(onChangeText).toBeCalledWith('a');
  });

  test('prop "onFocus"', () => {
    const onFocus = jest.fn();
    const { container } = render(<TextInput onFocus={onFocus} />);
    const input = findInput(container);
    input.focus();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(TextInput.State.currentlyFocusedField()).toBe(input);
  });

  describe('prop "onKeyPress"', () => {
    test('arrow key', () => {
      const onKeyPress = jest.fn(e => {
        e.persist();
      });
      const { container } = render(<TextInput onKeyPress={onKeyPress} />);
      const input = findInput(container);
      input.dispatchEvent(keydown({ key: 'ArrowLeft' }));
      expect(onKeyPress).toHaveBeenCalledTimes(1);
      expect(onKeyPress).toBeCalledWith(
        expect.objectContaining({
          nativeEvent: expect.objectContaining({
            altKey: false,
            ctrlKey: false,
            key: 'ArrowLeft',
            metaKey: false,
            shiftKey: false,
            target: expect.anything()
          })
        })
      );
    });

    test('backspace key', () => {
      const onKeyPress = jest.fn(e => {
        e.persist();
      });
      const { container } = render(<TextInput onKeyPress={onKeyPress} />);
      const input = findInput(container);
      input.dispatchEvent(keydown({ key: 'Backspace' }));
      expect(onKeyPress).toHaveBeenCalledTimes(1);
      expect(onKeyPress).toBeCalledWith(
        expect.objectContaining({
          nativeEvent: expect.objectContaining({
            altKey: false,
            ctrlKey: false,
            key: 'Backspace',
            metaKey: false,
            shiftKey: false,
            target: expect.anything()
          })
        })
      );
    });

    test('enter key', () => {
      const onKeyPress = jest.fn(e => {
        e.persist();
      });
      const { container } = render(<TextInput onKeyPress={onKeyPress} />);
      const input = findInput(container);
      input.dispatchEvent(keydown({ key: 'Enter' }));
      expect(onKeyPress).toHaveBeenCalledTimes(1);
      expect(onKeyPress).toBeCalledWith(
        expect.objectContaining({
          nativeEvent: expect.objectContaining({
            altKey: false,
            ctrlKey: false,
            key: 'Enter',
            metaKey: false,
            shiftKey: false,
            target: expect.anything()
          })
        })
      );
    });

    test('escape key', () => {
      const onKeyPress = jest.fn(e => {
        e.persist();
      });
      const { container } = render(<TextInput onKeyPress={onKeyPress} />);
      const input = findInput(container);
      input.dispatchEvent(keydown({ key: 'Escape' }));
      expect(onKeyPress).toHaveBeenCalledTimes(1);
      expect(onKeyPress).toBeCalledWith(
        expect.objectContaining({
          nativeEvent: expect.objectContaining({
            altKey: false,
            ctrlKey: false,
            key: 'Escape',
            metaKey: false,
            shiftKey: false,
            target: expect.anything()
          })
        })
      );
    });

    test('space key', () => {
      const onKeyPress = jest.fn(e => {
        e.persist();
      });
      const { container } = render(<TextInput onKeyPress={onKeyPress} />);
      const input = findInput(container);
      input.dispatchEvent(keydown({ key: ' ' }));
      expect(onKeyPress).toHaveBeenCalledTimes(1);
      expect(onKeyPress).toBeCalledWith(
        expect.objectContaining({
          nativeEvent: expect.objectContaining({
            altKey: false,
            ctrlKey: false,
            key: ' ',
            metaKey: false,
            shiftKey: false,
            target: expect.anything()
          })
        })
      );
    });

    test('tab key', () => {
      const onKeyPress = jest.fn(e => {
        e.persist();
      });
      const { container } = render(<TextInput onKeyPress={onKeyPress} />);
      const input = findInput(container);
      input.dispatchEvent(keydown({ key: 'Tab' }));
      expect(onKeyPress).toHaveBeenCalledTimes(1);
      expect(onKeyPress).toBeCalledWith(
        expect.objectContaining({
          nativeEvent: expect.objectContaining({
            altKey: false,
            ctrlKey: false,
            key: 'Tab',
            metaKey: false,
            shiftKey: false,
            target: expect.anything()
          })
        })
      );
    });

    test('text key', () => {
      const onKeyPress = jest.fn(e => {
        e.persist();
      });
      const { container } = render(<TextInput onKeyPress={onKeyPress} />);
      const input = findInput(container);
      input.dispatchEvent(keydown({ key: 'a' }));
      expect(onKeyPress).toHaveBeenCalledTimes(1);
      expect(onKeyPress).toBeCalledWith(
        expect.objectContaining({
          nativeEvent: expect.objectContaining({
            altKey: false,
            ctrlKey: false,
            key: 'a',
            metaKey: false,
            shiftKey: false,
            target: expect.anything()
          })
        })
      );
    });

    test('modifier keys are included', () => {
      const onKeyPress = jest.fn(e => {
        e.persist();
      });
      const { container } = render(<TextInput onKeyPress={onKeyPress} />);
      const input = findInput(container);
      input.dispatchEvent(
        keydown({
          altKey: true,
          ctrlKey: true,
          metaKey: true,
          shiftKey: true,
          key: ' '
        })
      );
      expect(onKeyPress).toHaveBeenCalledTimes(1);
      expect(onKeyPress).toBeCalledWith(
        expect.objectContaining({
          nativeEvent: expect.objectContaining({
            altKey: true,
            ctrlKey: true,
            key: ' ',
            metaKey: true,
            shiftKey: true,
            target: expect.anything()
          })
        })
      );
    });

    test('meta key + Enter calls "onKeyPress"', () => {
      const onKeyPress = jest.fn(e => {
        e.persist();
      });
      const { container } = render(<TextInput onKeyPress={onKeyPress} />);
      const input = findInput(container);
      input.dispatchEvent(
        keydown({
          metaKey: true,
          key: 'Enter'
        })
      );
      expect(onKeyPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('prop "onSelectionChange"', () => {
    test('is called on select', () => {
      const { container } = render(
        <TextInput defaultValue="12345" onSelectionChange={onSelectionChange} />
      );
      const input = findInput(container);
      input.selectionStart = 0;
      input.selectionEnd = 3;
      input.dispatchEvent(new window.Event('select', {}));
      function onSelectionChange(e) {
        expect(e.nativeEvent.selection.end).toEqual(3);
        expect(e.nativeEvent.selection.start).toEqual(0);
      }
    });

    test.skip('is called on change', () => {
      const onSelectionChange = jest.fn();
      const { container } = render(<TextInput onSelectionChange={onSelectionChange} />);
      const input = findInput(container);
      // This doesn't cause ReactDOM to trigger 'change' event... ¯\_(ツ)_/¯
      input.dispatchEvent(new window.Event('change', { bubbles: true }));
      expect(onSelectionChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('prop "onSubmitEditing"', () => {
    test('single-line input', done => {
      const { container } = render(
        <TextInput defaultValue="12345" onSubmitEditing={onSubmitEditing} />
      );
      const input = findInput(container);
      input.dispatchEvent(keydown({ key: 'Enter' }));
      function onSubmitEditing(e) {
        expect(e.nativeEvent.target).toBeDefined();
        expect(e.nativeEvent.text).toBe('12345');
        done();
      }
    });

    test('single-line input while composing', () => {
      const onSubmitEditing = jest.fn();
      const { container } = render(
        <TextInput defaultValue="12345" onSubmitEditing={onSubmitEditing} />
      );
      const input = findInput(container);
      input.dispatchEvent(keydown({ key: 'Enter', isComposing: true, keyCode: 13 }));
      input.dispatchEvent(keydown({ key: 'Enter', isComposing: false, keyCode: 229 }));
      expect(onSubmitEditing).not.toHaveBeenCalled();
    });

    test('multi-line input', () => {
      const onSubmitEditing = jest.fn();
      const { container } = render(
        <TextInput defaultValue="12345" multiline onSubmitEditing={onSubmitEditing} />
      );
      const textarea = findTextArea(container);
      textarea.dispatchEvent(keydown({ key: 'Enter' }));
      expect(onSubmitEditing).not.toHaveBeenCalled();
    });

    test('multi-line input with "blurOnSubmit" triggers "onSubmitEditing"', () => {
      const onSubmitEditing = jest.fn();
      const preventDefault = jest.fn();

      const { container } = render(
        <TextInput blurOnSubmit defaultValue="12345" multiline onSubmitEditing={onSubmitEditing} />
      );
      const textarea = findTextArea(container);
      textarea.dispatchEvent(keydown({ key: 'Enter', preventDefault, shiftKey: true }));
      // shift+enter should enter newline, not submit
      expect(onSubmitEditing).not.toHaveBeenCalledWith(expect.objectContaining({ shiftKey: true }));
      expect(preventDefault).not.toHaveBeenCalled();

      textarea.dispatchEvent(keydown({ key: 'Enter', preventDefault }));
      expect(onSubmitEditing).toHaveBeenCalledTimes(1);
      expect(preventDefault).toHaveBeenCalledTimes(1);
    });
  });

  test('prop "returnKeyType"', () => {
    const returnKeyType = 'previous';
    const { container } = render(<TextInput returnKeyType={returnKeyType} />);
    const input = findInput(container);
    expect(input.getAttribute('enterkeyhint')).toEqual(returnKeyType);
  });

  test('prop "secureTextEntry"', () => {
    let { container } = render(<TextInput secureTextEntry />);
    const input = findInput(container);
    expect(input.getAttribute('type')).toEqual('password');
    // ignored for multiline
    ({ container } = render(<TextInput multiline secureTextEntry />));
    const textarea = findTextArea(container);
    expect(textarea.getAttribute('type')).toEqual(null);
  });

  describe('prop "selectTextOnFocus"', () => {
    testIfDocumentIsFocused('value "false"', () => {
      const { container } = render(<TextInput defaultValue={'text'} />);
      const input = findInput(container);
      input.focus();
      expect(input.selectionEnd).toEqual(4);
      expect(input.selectionStart).toEqual(4);
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
      const { container: defaultContainer } = render(<TextInput defaultValue="12345" />);
      const inputDefaultSelection = findInput(defaultContainer);
      // default selection is 0
      expect(inputDefaultSelection.selectionStart).toEqual(0);
      expect(inputDefaultSelection.selectionEnd).toEqual(0);

      const { container: customContainer } = render(
        <TextInput defaultValue="12345" selection={cursorLocation} />
      );
      const inputCustomSelection = findInput(customContainer);
      // custom selection sets cursor at custom position
      expect(inputCustomSelection.selectionStart).toEqual(cursorLocation.start);
      expect(inputCustomSelection.selectionEnd).toEqual(cursorLocation.end);
    });
  });

  describe('prop "spellCheck"', () => {
    test('default value', () => {
      const { container } = render(<TextInput />);
      const input = findInput(container);
      expect(input.getAttribute('spellCheck')).toEqual('true');
    });

    test('inherit from "autoCorrect"', () => {
      const { container } = render(<TextInput autoCorrect={false} />);
      const input = findInput(container);
      expect(input.getAttribute('spellCheck')).toEqual('false');
    });

    test('value "false"', () => {
      const { container } = render(<TextInput spellCheck={false} />);
      const input = findInput(container);
      expect(input.getAttribute('spellCheck')).toEqual('false');
    });
  });

  test('prop "value"', () => {
    const value = 'value';
    const { container } = render(<TextInput value={value} />);
    const input = findInput(container);
    expect(input.value).toEqual(value);
  });

  test('ref function is called when ref changes', () => {
    const refMock = jest.fn();
    const otherRefMock = jest.fn();

    const { rerender } = render(<TextInput ref={refMock} />);
    expect(refMock).toHaveBeenCalled();

    rerender(<TextInput ref={otherRefMock} />)
    expect(otherRefMock).toHaveBeenCalled();
  });

  test('ref function is not called every render', () => {
    const refMock = jest.fn();

    const { rerender } = render(<TextInput ref={refMock} />);
    expect(refMock).toHaveBeenCalledTimes(1);

    rerender(<TextInput ref={refMock} />);
    expect(refMock).toHaveBeenCalledTimes(1);
  });

  test('ref function is not called on prop changes', () => {
    const refMock = jest.fn();

    const { rerender } = render(<TextInput ref={refMock} testID={'foo'} />);
    expect(refMock).toHaveBeenCalledTimes(1);

    rerender(<TextInput ref={refMock} testID={'bar'} />);
    expect(refMock).toHaveBeenCalledTimes(1);
  });
});
