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
          expect.not.objectContaining({ tabIndex: '-1' })
        );
      });

      test('when "focusable" is true', () => {
        expect(createProps({ accessibilityRole, focusable: true })).toEqual(
          expect.not.objectContaining({ tabIndex: '-1' })
        );
      });

      test('when "focusable" is false', () => {
        expect(createProps({ accessibilityRole, focusable: false })).toEqual(
          expect.objectContaining({ tabIndex: '-1' })
        );
      });

      test('when "accessibilityDisabled" is true', () => {
        expect(createProps({ accessibilityRole, accessibilityDisabled: true })).toEqual(
          expect.objectContaining({ 'aria-disabled': true })
        );
      });

      test('when "disabled" is false', () => {
        expect(createProps({ accessibilityRole, accessibilityDisabled: false })).toEqual(
          expect.not.objectContaining({ tabIndex: '-1' })
        );
      });
    });

    const testFocusableRole = (accessibilityRole) => {
      test('default case', () => {
        expect(createProps({ accessibilityRole })).toEqual(
          expect.objectContaining({ tabIndex: '0' })
        );
      });

      test('when "focusable" is true', () => {
        expect(createProps({ accessibilityRole, focusable: true })).toEqual(
          expect.objectContaining({ tabIndex: '0' })
        );
      });

      test('when "focusable" is false', () => {
        expect(createProps({ accessibilityRole, focusable: false })).toEqual(
          expect.objectContaining({ tabIndex: '-1' })
        );
      });

      test('when "accessibilityDisabled" is true', () => {
        expect(createProps({ accessibilityRole, accessibilityDisabled: true })).toEqual(
          expect.objectContaining({ 'aria-disabled': true })
        );
      });

      test('when "accessibilityDisabled" is false', () => {
        expect(createProps({ accessibilityRole, accessibilityDisabled: false })).toEqual(
          expect.objectContaining({ tabIndex: '0' })
        );
      });
    };

    describe('"accessibilityRole" of "button"', () => {
      testFocusableRole('button');
    });

    describe('with unfocusable accessibilityRole', () => {
      test('when "focusable" is true', () => {
        expect(createProps({ focusable: true })).toEqual(
          expect.objectContaining({ tabIndex: '0' })
        );
      });

      test('when "focusable" is false', () => {
        expect(createProps({ focusable: false })).toEqual(
          expect.objectContaining({ tabIndex: '-1' })
        );
      });
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
        selected: value
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
