/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createDOMProps from '..';

const createProps = (props) => createDOMProps(null, props);

describe('modules/createDOMProps', () => {
  test('web props', () => {
    const props = {
      'aria-activedescendant': 'activedescendant',
      'aria-atomic': true,
      'aria-autocomplete': 'list',
      'aria-busy': true,
      'aria-checked': true,
      'aria-columncount': 5,
      'aria-columnindex': 3,
      'aria-columnspan': 2,
      'aria-controls': 'controls',
      'aria-current': 'current',
      'aria-describedby': 'describedby',
      'aria-details': 'details',
      'aria-disabled': true,
      'aria-errormessage': 'errormessage',
      'aria-expanded': true,
      'aria-flowto': 'flowto',
      'aria-haspopup': true,
      'aria-hidden': true,
      'aria-invalid': true,
      'aria-keyshortcuts': 'Cmd+S',
      'aria-label': 'label',
      'aria-labelledby': 'labelledby',
      'aria-level': 3,
      'aria-live': 'polite',
      'aria-modal': true,
      'aria-multiline': true,
      'aria-multiselectable': true,
      'aria-orientation': 'portrait',
      'aria-owns': 'owns',
      'aria-placeholder': 'placeholder',
      'aria-posinset': 5,
      'aria-pressed': true,
      'aria-readonly': true,
      'aria-required': true,
      role: 'main',
      'aria-roledescription': 'roledescription',
      'aria-rowcount': 5,
      'aria-rowindex': 3,
      'aria-rowspan': 3,
      'aria-selected': true,
      'aria-setsize': 5,
      'aria-sort': 'ascending',
      'aria-valuemax': 5,
      'aria-valuemin': 0,
      'aria-valuenow': 3,
      'aria-valuetext': '3',
      className: 'className',
      dataSet: {
        custom: 'custom'
      },
      id: 'id',
      tabIndex: 0,
      testID: 'testID'
    };

    const _props = createProps(props);
    expect(_props).toMatchInlineSnapshot(`
      {
        "aria-activedescendant": "activedescendant",
        "aria-atomic": true,
        "aria-autocomplete": "list",
        "aria-busy": true,
        "aria-checked": true,
        "aria-columncount": 5,
        "aria-columnindex": 3,
        "aria-columnspan": 2,
        "aria-controls": "controls",
        "aria-current": "current",
        "aria-describedby": "describedby",
        "aria-details": "details",
        "aria-disabled": true,
        "aria-errormessage": "errormessage",
        "aria-expanded": true,
        "aria-flowto": "flowto",
        "aria-haspopup": true,
        "aria-hidden": true,
        "aria-invalid": true,
        "aria-keyshortcuts": "Cmd+S",
        "aria-label": "label",
        "aria-labelledby": "labelledby",
        "aria-level": 3,
        "aria-live": "polite",
        "aria-modal": true,
        "aria-multiline": true,
        "aria-multiselectable": true,
        "aria-orientation": "portrait",
        "aria-owns": "owns",
        "aria-placeholder": "placeholder",
        "aria-posinset": 5,
        "aria-pressed": true,
        "aria-readonly": true,
        "aria-required": true,
        "aria-roledescription": "roledescription",
        "aria-rowcount": 5,
        "aria-rowindex": 3,
        "aria-rowspan": 3,
        "aria-selected": true,
        "aria-setsize": 5,
        "aria-sort": "ascending",
        "aria-valuemax": 5,
        "aria-valuenow": 3,
        "aria-valuetext": "3",
        "className": "className",
        "data-custom": "custom",
        "data-testid": "testID",
        "id": "id",
        "role": "main",
        "tabIndex": 0,
      }
    `);
  });

  // @deprecated
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
        expect(
          createProps({ accessibilityRole, accessibilityDisabled: true })
        ).toEqual(expect.objectContaining({ 'aria-disabled': true }));
      });

      test('when "disabled" is false', () => {
        expect(
          createProps({ accessibilityRole, accessibilityDisabled: false })
        ).toEqual(expect.not.objectContaining({ tabIndex: '-1' }));
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
        expect(
          createProps({ accessibilityRole, accessibilityDisabled: true })
        ).toEqual(expect.objectContaining({ 'aria-disabled': true }));
      });

      test('when "accessibilityDisabled" is false', () => {
        expect(
          createProps({ accessibilityRole, accessibilityDisabled: false })
        ).toEqual(expect.objectContaining({ tabIndex: '0' }));
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

  test('prop "accessibilityRequired" becomes "aria-required" and "required"', () => {
    const accessibilityRequired = false;
    const props = createDOMProps('input', { accessibilityRequired });
    expect(props['aria-required']).toEqual(false);
    expect(props.required).toEqual(false);
  });

  test('prop "accessibilityRole" becomes "role"', () => {
    const accessibilityRole = 'button';
    const props = createProps({ accessibilityRole });
    expect(props.role).toEqual('button');
  });

  test('prop "nativeID" becomes "id"', () => {
    const nativeID = 'Example.nativeID';
    const props = createProps({ nativeID });
    expect(props.id).toEqual(nativeID);
  });
});
