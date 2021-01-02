/* eslint-env jasmine, jest */

import createDOMProps from '..';

const createProps = (props) => createDOMProps(null, props);

describe('modules/createDOMProps', () => {
  describe('focus-related accessibility attributes', () => {
    test('with no accessibility props', () => {
      expect(createProps({})).toEqual({});
    });

    describe('"accessibilityRole" of "link"', () => {
      const accessibilityRole = 'link';

      test('default case', () => {
        expect(createProps({ accessibilityRole })).toEqual(
          expect.objectContaining({ 'data-focusable': true })
        );
      });

      test('when "accessible" is true', () => {
        expect(createProps({ accessibilityRole, accessible: true })).toEqual(
          expect.objectContaining({ 'data-focusable': true })
        );
      });

      test('when "accessible" is false', () => {
        expect(createProps({ accessibilityRole, accessible: false })).toEqual(
          expect.objectContaining({ tabIndex: '-1' })
        );
      });

      test('when "disabled" is true', () => {
        expect(createProps({ accessibilityRole, disabled: true })).toEqual(
          expect.objectContaining({ 'aria-disabled': true, disabled: true, tabIndex: '-1' })
        );
      });

      test('when "disabled" is false', () => {
        expect(createProps({ accessibilityRole, disabled: false })).toEqual(
          expect.objectContaining({ 'data-focusable': true })
        );
      });

      test('when "importantForAccessibility" is "no"', () => {
        expect(createProps({ accessibilityRole, importantForAccessibility: 'no' })).toEqual(
          expect.objectContaining({ tabIndex: '-1' })
        );
      });

      test('when "importantForAccessibility" is "no-hide-descendants"', () => {
        expect(
          createProps({
            accessibilityRole,
            importantForAccessibility: 'no-hide-descendants',
          })
        ).toEqual(expect.objectContaining({ tabIndex: '-1' }));
      });
    });

    const testFocusableRole = (accessibilityRole) => {
      test('default case', () => {
        expect(createProps({ accessibilityRole })).toEqual(
          expect.objectContaining({ 'data-focusable': true, tabIndex: '0' })
        );
      });

      test('when "accessible" is true', () => {
        expect(createProps({ accessibilityRole, accessible: true })).toEqual(
          expect.objectContaining({ 'data-focusable': true, tabIndex: '0' })
        );
      });

      test('when "accessible" is false', () => {
        expect(createProps({ accessibilityRole, accessible: false })).not.toEqual(
          expect.objectContaining({ 'data-focusable': true, tabIndex: '0' })
        );
      });

      test('when "disabled" is true', () => {
        expect(createProps({ accessibilityRole, disabled: true })).toEqual(
          expect.objectContaining({ 'aria-disabled': true, disabled: true })
        );
      });

      test('when "disabled" is false', () => {
        expect(createProps({ accessibilityRole, disabled: false })).toEqual(
          expect.objectContaining({ 'data-focusable': true, tabIndex: '0' })
        );
      });

      test('when "importantForAccessibility" is "no"', () => {
        expect(createProps({ accessibilityRole, importantForAccessibility: 'no' })).not.toEqual(
          expect.objectContaining({ 'data-focusable': true, tabIndex: '0' })
        );
      });

      test('when "importantForAccessibility" is "no-hide-descendants"', () => {
        expect(
          createProps({
            accessibilityRole,
            importantForAccessibility: 'no-hide-descendants',
          })
        ).not.toEqual(expect.objectContaining({ 'data-focusable': true, tabIndex: '0' }));
      });
    };

    describe('"accessibilityRole" of "button"', () => {
      testFocusableRole('button');
    });

    describe('"accessibilityRole" of "menuitem"', () => {
      testFocusableRole('menuitem');
    });

    describe('with unfocusable accessibilityRole', () => {
      test('when "accessible" is true', () => {
        expect(createProps({ accessible: true })).toEqual(
          expect.objectContaining({ 'data-focusable': true, tabIndex: '0' })
        );
      });

      test('when "accessible" is false', () => {
        expect(createProps({ accessible: false })).toEqual({});
      });

      test('when "importantForAccessibility" is "no"', () => {
        expect(createProps({ importantForAccessibility: 'no' })).toEqual({});
        expect(createProps({ accessible: true, importantForAccessibility: 'no' })).not.toEqual(
          expect.objectContaining({ 'data-focusable': true, tabIndex: '0' })
        );
      });

      test('when "importantForAccessibility" is "no-hide-descendants"', () => {
        expect(
          createProps({ accessible: true, importantForAccessibility: 'no-hide-descendants' })
        ).not.toEqual(expect.objectContaining({ 'data-focusable': true, tabIndex: '0' }));
      });
    });
  });

  describe('prop "onClick"', () => {
    const callsOnClick = (component, accessibilityRole, disabled = false) => {
      const onClick = jest.fn();
      const event = { stopPropagation: jest.fn() };
      const finalProps = createDOMProps(component, { accessibilityRole, disabled, onClick });
      finalProps.onClick(event);
      return onClick.mock.calls.length === 1;
    };

    test('is called for various roles', () => {
      expect(callsOnClick('div', 'link')).toBe(true);
      expect(callsOnClick('div', 'button')).toBe(true);
      expect(callsOnClick('div', 'textbox')).toBe(true);
      expect(callsOnClick('div', 'menuitem')).toBe(true);
      expect(callsOnClick('div', 'bogus')).toBe(true);
      expect(callsOnClick('a')).toBe(true);
      expect(callsOnClick('button')).toBe(true);
      expect(callsOnClick('input')).toBe(true);
      expect(callsOnClick('select')).toBe(true);
      expect(callsOnClick('textarea')).toBe(true);
      expect(callsOnClick('h1')).toBe(true);
    });

    test('is not called when disabled is true', () => {
      expect(callsOnClick('div', 'link', true)).toBe(false);
      expect(callsOnClick('div', 'button', true)).toBe(false);
      expect(callsOnClick('div', 'menuitem', true)).toBe(false);
      expect(callsOnClick('a', undefined, true)).toBe(false);
      expect(callsOnClick('button', undefined, true)).toBe(false);
      expect(callsOnClick('input', undefined, true)).toBe(false);
      expect(callsOnClick('select', undefined, true)).toBe(false);
      expect(callsOnClick('textarea', undefined, true)).toBe(false);

      expect(callsOnClick('div', 'textbox', true)).toBe(true);
      expect(callsOnClick('div', 'bogus', true)).toBe(true);
      expect(callsOnClick('h1', undefined, true)).toBe(true);
    });
  });

  describe('prop "onKeyDown"', () => {
    const callsOnClick = (key) => (component, accessibilityRole, disabled = false) => {
      const onClick = jest.fn();
      const onKeyDown = jest.fn();
      const event = { key, preventDefault: jest.fn() };
      const finalProps = createDOMProps(component, {
        accessibilityRole,
        disabled,
        onClick,
        onKeyDown,
      });
      finalProps.onKeyDown(event);
      // The original onKeyDown should always be called
      expect(onKeyDown).toHaveBeenCalled();
      return onClick.mock.calls.length === 1;
    };

    const respondsToEnter = callsOnClick('Enter');
    const respondsToSpace = callsOnClick(' ');

    test('does not emulate "onClick" when disabled', () => {
      expect(respondsToEnter('div', 'link', true)).toBe(false);
      expect(respondsToEnter('div', 'button', true)).toBe(false);
      expect(respondsToEnter('div', 'textbox', true)).toBe(false);
      expect(respondsToEnter('div', 'menuitem', true)).toBe(false);
      expect(respondsToEnter('div', 'bogus', true)).toBe(false);
    });

    test('does not emulate "onClick" for native elements', () => {
      expect(respondsToEnter('a')).toBe(false);
      expect(respondsToEnter('button')).toBe(false);
      expect(respondsToEnter('input')).toBe(false);
      expect(respondsToEnter('select')).toBe(false);
      expect(respondsToEnter('textarea')).toBe(false);
      expect(respondsToEnter('h1')).toBe(false);
      expect(respondsToEnter('div', 'link')).toBe(false);

      expect(respondsToSpace('a')).toBe(false);
      expect(respondsToSpace('button')).toBe(false);
      expect(respondsToSpace('input')).toBe(false);
      expect(respondsToSpace('select')).toBe(false);
      expect(respondsToSpace('textarea')).toBe(false);
      expect(respondsToSpace('h1')).toBe(false);
      expect(respondsToSpace('div', 'link')).toBe(false);
    });

    test('emulates "onClick" for "Enter" for certain roles', () => {
      expect(respondsToEnter('div', 'button')).toBe(true);
      expect(respondsToEnter('div', 'menuitem')).toBe(true);
      expect(respondsToEnter('div', 'textbox')).toBe(false);
      expect(respondsToEnter('div', 'bogus')).toBe(false);
    });

    test('emulates "onClick" for "Enter" for items marked accessible', () => {
      const onClick = jest.fn();
      const event = { key: 'Enter', preventDefault: jest.fn() };
      const finalProps = createDOMProps('div', {
        accessible: true,
        accessibilityRole: 'article',
        onClick,
      });
      finalProps.onKeyDown(event);
      expect(onClick).toHaveBeenCalled();
    });

    test('emulates "onClick" for "Space" for certain roles', () => {
      expect(respondsToSpace('div', 'button')).toBe(true);
      expect(respondsToSpace('div', 'menuitem')).toBe(true);
      expect(respondsToSpace('div', 'textbox')).toBe(false);
      expect(respondsToSpace('div', 'bogus')).toBe(false);
    });
  });

  test('prop "accessibilityLabel" becomes "aria-label"', () => {
    const accessibilityLabel = 'accessibilityLabel';
    const props = createProps({ accessibilityLabel });
    expect(props['aria-label']).toEqual(accessibilityLabel);
  });

  test('prop "accessibilityLiveRegion" becomes "aria-live"', () => {
    const accessibilityLiveRegion = 'none';
    const props = createProps({ accessibilityLiveRegion });
    expect(props['aria-live']).toEqual('off');
  });

  test('prop "accessibilityRole" becomes "role"', () => {
    const accessibilityRole = 'button';
    const props = createProps({ accessibilityRole });
    expect(props.role).toEqual('button');
  });

  describe('prop "accessibilityState"', () => {
    function createAccessibilityState(value) {
      return {
        busy: value,
        checked: value,
        disabled: value,
        expanded: value,
        grabbed: value,
        hidden: value,
        invalid: value,
        modal: value,
        pressed: value,
        readonly: value,
        required: value,
        selected: value,
      };
    }

    test('values are "undefined"', () => {
      const accessibilityState = createAccessibilityState(undefined);
      const props = createProps({ accessibilityState });
      expect(props).toMatchSnapshot();
    });

    test('values are "false"', () => {
      const accessibilityState = createAccessibilityState(false);
      const props = createProps({ accessibilityState });
      expect(props).toMatchSnapshot();
    });

    test('values are "true"', () => {
      const accessibilityState = createAccessibilityState(true);
      const props = createProps({ accessibilityState });
      expect(props).toMatchSnapshot();
    });
  });

  test('prop "className" is preserved', () => {
    const className = 'external-class-name';
    const props = createProps({ className });
    expect(props.className).toEqual(className);
  });

  test('prop "importantForAccessibility" becomes "aria-hidden"', () => {
    const props = createProps({ importantForAccessibility: 'no-hide-descendants' });
    expect(props['aria-hidden']).toEqual(true);
  });

  test('prop "nativeID" becomes "id"', () => {
    const nativeID = 'Example.nativeID';
    const props = createProps({ nativeID });
    expect(props.id).toEqual(nativeID);
  });

  test('prop "testID" becomes "data-testid"', () => {
    const testID = 'Example.testID';
    const props = createProps({ testID });
    expect(props['data-testid']).toEqual(testID);
  });

  test('includes "rel" values for "a" elements (to securely open external links)', () => {
    const props = createDOMProps('a', { target: '_blank' });
    expect(props.rel).toMatchSnapshot();
  });

  test('includes cursor style for pressable roles', () => {
    expect(createDOMProps('span', { accessibilityRole: 'link' }).className).toMatchSnapshot();
    expect(createDOMProps('span', { accessibilityRole: 'button' }).className).toMatchSnapshot();
  });

  test('includes base reset style for browser-styled elements', () => {
    expect(createDOMProps('a').className).toMatchSnapshot();
    expect(createDOMProps('button').className).toMatchSnapshot();
    expect(createDOMProps('li').className).toMatchSnapshot();
    expect(createDOMProps('ul').className).toMatchSnapshot();
  });
});
