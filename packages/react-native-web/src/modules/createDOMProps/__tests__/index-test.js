/* eslint-env jasmine, jest */

import createDOMProps from '..';

const createProps = props => createDOMProps(null, props);

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
            importantForAccessibility: 'no-hide-descendants'
          })
        ).toEqual(expect.objectContaining({ tabIndex: '-1' }));
      });
    });

    const testFocusableRole = accessibilityRole => {
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
            importantForAccessibility: 'no-hide-descendants'
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

  test('"label" component lets "htmlFor" through', () => {
    const component = 'label';
    const htmlFor = 'email';
    const props = createDOMProps(component, { htmlFor });
    expect(props.htmlFor).toEqual(htmlFor);
  });

  test('non-"label" removes "htmlFor"', () => {
    const htmlFor = 'email';
    const props = createProps({ htmlFor });
    expect(props.htmlFor).toEqual(undefined);
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

  describe('prop "accessibilityRelationship"', () => {
    function createAccessibilityRelationship(value) {
      return {
        activedescendant: value,
        controls: value,
        describedby: value,
        details: value,
        haspopup: value,
        labelledby: value,
        owns: value
      };
    }

    test('values are "undefined"', () => {
      const accessibilityRelationship = createAccessibilityRelationship(undefined);
      const props = createProps({ accessibilityRelationship });
      expect(props).toMatchSnapshot();
    });

    test('values are "id" string', () => {
      const accessibilityRelationship = createAccessibilityRelationship('id');
      const props = createProps({ accessibilityRelationship });
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
