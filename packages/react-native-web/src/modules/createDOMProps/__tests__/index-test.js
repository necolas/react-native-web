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
        expect(createProps({ accessibilityRole, 'aria-disabled': true })).toEqual(
          expect.objectContaining({ 'aria-disabled': true, disabled: true, tabIndex: '-1' })
        );
      });

      test('when "disabled" is false', () => {
        expect(createProps({ accessibilityRole, disabled: false })).toEqual(
          expect.objectContaining({ 'data-focusable': true })
        );
        expect(createProps({ accessibilityRole, 'aria-disabled': false })).toEqual(
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

    const buttonLikeAccessibilityRoles = ['button', 'menuitem'];
    buttonLikeAccessibilityRoles.forEach(accessibilityRole => {
      describe(`"accessibilityRole" of "${accessibilityRole}"`, () => {
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
          expect(createProps({ accessibilityRole, 'aria-disabled': true })).toEqual(
            expect.objectContaining({ 'aria-disabled': true, disabled: true })
          );
        });

        test('when "disabled" is false', () => {
          expect(createProps({ accessibilityRole, disabled: false })).toEqual(
            expect.objectContaining({ 'data-focusable': true, tabIndex: '0' })
          );
          expect(createProps({ accessibilityRole, 'aria-disabled': false })).toEqual(
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
      });
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

  describe('prop "accessibilityRole"', () => {
    test('does not become "role" when value is "label"', () => {
      const accessibilityRole = 'label';
      const props = createProps({ accessibilityRole });
      expect(props.role).toBeUndefined();
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

  test('prop "testID" becomes "data-testid"', () => {
    const testID = 'Example.testID';
    const props = createProps({ testID });
    expect(props['data-testid']).toEqual(testID);
  });

  test('includes "rel" values for "a" elements (to securely open external links)', () => {
    const props = createDOMProps('a', { target: '_blank' });
    expect(props.rel).toMatchSnapshot();
  });

  test('includes reset styles for "a" elements', () => {
    const props = createDOMProps('a');
    expect(props.className).toMatchSnapshot();
  });

  test('includes reset styles for "button" elements', () => {
    const props = createDOMProps('button');
    expect(props.className).toMatchSnapshot();
  });

  test('includes cursor style for "button" role', () => {
    const props = createDOMProps('span', { accessibilityRole: 'button' });
    expect(props.className).toMatchSnapshot();
  });

  test('includes reset styles for "ul" elements', () => {
    const props = createDOMProps('ul');
    expect(props.className).toMatchSnapshot();
  });
});
