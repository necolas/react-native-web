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
       "aria-valuemin": 0,
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

      test('when "aria-disabled" is true', () => {
        expect(
          createProps({ accessibilityRole, 'aria-disabled': true })
        ).toEqual(expect.objectContaining({ 'aria-disabled': true }));
      });

      test('when "aria-disabled" is false', () => {
        expect(
          createProps({ accessibilityRole, 'aria-disabled': false })
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

      test('when "aria-disabled" is true', () => {
        expect(
          createProps({ accessibilityRole, 'aria-disabled': true })
        ).toEqual(expect.objectContaining({ 'aria-disabled': true }));
      });

      test('when "aria-disabled" is false', () => {
        expect(
          createProps({ accessibilityRole, 'aria-disabled': false })
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

  test('prop "accessibilityState" becomes "aria-*"', () => {
    const props = createProps({
      accessibilityState: {
        busy: true,
        checked: 'mixed',
        disabled: true,
        expanded: false,
        selected: true
      }
    });
    expect(props['aria-busy']).toEqual(true);
    expect(props['aria-checked']).toEqual('mixed');
    expect(props['aria-disabled']).toEqual(true);
    expect(props['aria-expanded']).toEqual(false);
    expect(props['aria-selected']).toEqual(true);
  });

  test('prop "accessibilityState" disables native elements', () => {
    const props = createDOMProps('button', {
      accessibilityState: { disabled: true }
    });
    expect(props.disabled).toEqual(true);
    expect(props.tabIndex).toEqual('-1');
  });

  test('"aria-*" props take precedence over "accessibilityState"', () => {
    const props = createProps({
      accessibilityState: { checked: true, disabled: true },
      'aria-checked': false,
      'aria-disabled': false
    });
    expect(props['aria-checked']).toEqual(false);
    expect(props['aria-disabled']).toBeUndefined();
  });

  test('prop "accessibilityValue" becomes "aria-value*"', () => {
    const props = createProps({
      accessibilityValue: { max: 10, min: 0, now: 5, text: 'five' }
    });
    expect(props['aria-valuemax']).toEqual(10);
    expect(props['aria-valuemin']).toEqual(0);
    expect(props['aria-valuenow']).toEqual(5);
    expect(props['aria-valuetext']).toEqual('five');
  });

  test('"aria-value*" props take precedence over "accessibilityValue"', () => {
    const props = createProps({
      accessibilityValue: { now: 5 },
      'aria-valuenow': 7
    });
    expect(props['aria-valuenow']).toEqual(7);
  });

  test('prop "aria-required" becomes "aria-required" and "required"', () => {
    const props = createDOMProps('input', { 'aria-required': false });
    expect(props['aria-required']).toEqual(false);
    expect(props.required).toEqual(false);
  });

  test('prop "accessibilityRole" becomes "role"', () => {
    const accessibilityRole = 'button';
    const props = createProps({ accessibilityRole });
    expect(props.role).toEqual('button');
  });

  test('omits redundant role="heading" on native heading elements', () => {
    expect(
      createDOMProps('h1', { accessibilityRole: 'header' }).role
    ).toBeUndefined();
    expect(
      createDOMProps('h3', { role: 'heading', 'aria-level': 3 }).role
    ).toBeUndefined();
    // Non-heading hosts still receive the ARIA role.
    expect(createDOMProps('div', { role: 'heading' }).role).toEqual('heading');
  });

  test('prop "nativeID" becomes "id"', () => {
    const nativeID = 'Example.nativeID';
    const props = createProps({ nativeID });
    expect(props.id).toEqual(nativeID);
  });
});
