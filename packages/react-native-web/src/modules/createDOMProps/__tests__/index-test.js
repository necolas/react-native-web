/* eslint-env jasmine, jest */

import createDOMProps from '..';
import StyleResolver from '../../../exports/StyleSheet/StyleResolver';

const createProps = (props, resolver) => createDOMProps(null, resolver, props);

describe('modules/createDOMProps', () => {
  const resolver = new StyleResolver();

  describe('focus-related accessibility attributes', () => {
    test('with no accessibility props', () => {
      expect(createProps({}, resolver)).toEqual({});
    });

    describe('"accessibilityRole" of "link"', () => {
      const accessibilityRole = 'link';

      test('default case', () => {
        expect(createProps({ accessibilityRole }, resolver)).toEqual(
          expect.not.objectContaining({ tabIndex: '-1' })
        );
      });

      test('when "focusable" is true', () => {
        expect(createProps({ accessibilityRole, focusable: true }, resolver)).toEqual(
          expect.not.objectContaining({ tabIndex: '-1' })
        );
      });

      test('when "focusable" is false', () => {
        expect(createProps({ accessibilityRole, focusable: false }, resolver)).toEqual(
          expect.objectContaining({ tabIndex: '-1' })
        );
      });

      test('when "accessibilityDisabled" is true', () => {
        expect(createProps({ accessibilityRole, accessibilityDisabled: true }, resolver)).toEqual(
          expect.objectContaining({ 'aria-disabled': true })
        );
      });

      test('when "disabled" is false', () => {
        expect(createProps({ accessibilityRole, accessibilityDisabled: false }, resolver)).toEqual(
          expect.not.objectContaining({ tabIndex: '-1' })
        );
      });
    });

    const testFocusableRole = (accessibilityRole) => {
      test('default case', () => {
        expect(createProps({ accessibilityRole }, resolver)).toEqual(
          expect.objectContaining({ tabIndex: '0' })
        );
      });

      test('when "focusable" is true', () => {
        expect(createProps({ accessibilityRole, focusable: true }, resolver)).toEqual(
          expect.objectContaining({ tabIndex: '0' })
        );
      });

      test('when "focusable" is false', () => {
        expect(createProps({ accessibilityRole, focusable: false }, resolver)).toEqual(
          expect.objectContaining({ tabIndex: '-1' })
        );
      });

      test('when "accessibilityDisabled" is true', () => {
        expect(createProps({ accessibilityRole, accessibilityDisabled: true }, resolver)).toEqual(
          expect.objectContaining({ 'aria-disabled': true })
        );
      });

      test('when "accessibilityDisabled" is false', () => {
        expect(createProps({ accessibilityRole, accessibilityDisabled: false }, resolver)).toEqual(
          expect.objectContaining({ tabIndex: '0' })
        );
      });
    };

    describe('"accessibilityRole" of "button"', () => {
      testFocusableRole('button');
    });

    describe('with unfocusable accessibilityRole', () => {
      test('when "focusable" is true', () => {
        expect(createProps({ focusable: true }, resolver)).toEqual(
          expect.objectContaining({ tabIndex: '0' })
        );
      });

      test('when "focusable" is false', () => {
        expect(createProps({ focusable: false }, resolver)).toEqual(
          expect.objectContaining({ tabIndex: '-1' })
        );
      });
    });
  });

  test('prop "accessibilityLabel" becomes "aria-label"', () => {
    const accessibilityLabel = 'accessibilityLabel';
    const props = createProps({ accessibilityLabel }, resolver);
    expect(props['aria-label']).toEqual(accessibilityLabel);
  });

  test('prop "accessibilityLiveRegion" becomes "aria-live"', () => {
    const accessibilityLiveRegion = 'none';
    const props = createProps({ accessibilityLiveRegion }, resolver);
    expect(props['aria-live']).toEqual('off');
  });

  test('prop "accessibilityRole" becomes "role"', () => {
    const accessibilityRole = 'button';
    const props = createProps({ accessibilityRole }, resolver);
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
      const props = createProps({ accessibilityState }, resolver);
      expect(props).toMatchSnapshot();
    });

    test('values are "false"', () => {
      const accessibilityState = createAccessibilityState(false);
      const props = createProps({ accessibilityState }, resolver);
      expect(props).toMatchSnapshot();
    });

    test('values are "true"', () => {
      const accessibilityState = createAccessibilityState(true);
      const props = createProps({ accessibilityState }, resolver);
      expect(props).toMatchSnapshot();
    });
  });

  test('prop "className" is preserved', () => {
    const className = 'external-class-name';
    const props = createProps({ className }, resolver);
    expect(props.className).toEqual(className);
  });

  test('prop "nativeID" becomes "id"', () => {
    const nativeID = 'Example.nativeID';
    const props = createProps({ nativeID }, resolver);
    expect(props.id).toEqual(nativeID);
  });

  test('prop "testID" becomes "data-testid"', () => {
    const testID = 'Example.testID';
    const props = createProps({ testID }, resolver);
    expect(props['data-testid']).toEqual(testID);
  });

  test('includes cursor style for pressable roles', () => {
    expect(
      createDOMProps('span', resolver, { accessibilityRole: 'link' }).className
    ).toMatchSnapshot();
    expect(
      createDOMProps('span', resolver, { accessibilityRole: 'button' }).className
    ).toMatchSnapshot();
  });

  test('includes base reset style for browser-styled elements', () => {
    expect(createDOMProps('a', resolver, {}).className).toMatchSnapshot();
    expect(createDOMProps('button', resolver, {}).className).toMatchSnapshot();
    expect(createDOMProps('li', resolver, {}).className).toMatchSnapshot();
    expect(createDOMProps('ul', resolver, {}).className).toMatchSnapshot();
  });
});
