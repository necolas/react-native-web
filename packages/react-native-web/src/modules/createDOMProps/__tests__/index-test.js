/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createDOMProps from '..';
import * as forwardedProps from '../../forwardedProps';

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
      role: 'main',
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
  describe('prop "focusable"', () => {
    test('is not set', () => {
      expect(createProps({})).toEqual({});
    });

    test.each(['button', 'checkbox', 'link', 'radio', 'textbox', 'switch'])(
      'is "0" by default for role "%s"',
      (role) => {
        expect(createProps({ role }).tabIndex).toEqual('0');
        expect(createProps({ role, focusable: false }).tabIndex).toEqual('-1');
        expect(createDOMProps('button', { role }).tabIndex).toBeUndefined();
      }
    );

    test('is true', () => {
      expect(createProps({ focusable: true }).tabIndex).toEqual('0');
    });

    test('is false', () => {
      expect(createProps({ focusable: false }).tabIndex).toEqual('-1');
    });

    test('is overridden by "tabIndex"', () => {
      expect(createProps({ focusable: false, tabIndex: 0 }).tabIndex).toEqual(
        0
      );
      expect(createProps({ focusable: true, tabIndex: -1 }).tabIndex).toEqual(
        -1
      );
    });

    test('ignores "tabIndex" other than 0 and -1', () => {
      expect(createProps({ tabIndex: 5 }).tabIndex).toBeUndefined();
      expect(createProps({ focusable: true, tabIndex: 5 }).tabIndex).toEqual(
        '0'
      );
    });
  });

  describe('prop "disabled"', () => {
    test('is set on native elements that support it', () => {
      expect(createDOMProps('button', { disabled: true }).disabled).toBe(true);
      expect(
        createDOMProps('button', { disabled: false }).disabled
      ).toBeUndefined();
      expect(
        createDOMProps('div', { disabled: true }).disabled
      ).toBeUndefined();
    });

    test('is passed to components', () => {
      const Component = () => null;
      expect(createDOMProps(Component, { disabled: true }).disabled).toBe(true);
      expect(createDOMProps(Component, { disabled: false }).disabled).toBe(
        false
      );
    });
  });

  test('prop "accessibilityLabel" becomes "aria-label"', () => {
    const accessibilityLabel = 'accessibilityLabel';
    const props = createProps({ accessibilityLabel });
    expect(props['aria-label']).toEqual(accessibilityLabel);
  });

  test('prop "accessibilityLabelledBy" becomes "aria-labelledby"', () => {
    const props = createProps({ accessibilityLabelledBy: ['abc', 'def'] });
    expect(props['aria-labelledby']).toEqual('abc def');
  });

  test('prop "accessibilityLiveRegion" becomes "aria-live"', () => {
    const accessibilityLiveRegion = 'none';
    const props = createProps({ accessibilityLiveRegion });
    expect(props['aria-live']).toEqual('off');
  });

  test('prop "accessibilityHint" becomes "aria-description"', () => {
    const props = createProps({ accessibilityHint: 'hint' });
    expect(props['aria-description']).toEqual('hint');
  });

  test('prop "accessibilityState" becomes "aria-*"', () => {
    const props = createDOMProps('button', {
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
    expect(props.accessibilityState).toBeUndefined();
  });

  test('prop "aria-*" takes precedence over "accessibilityState"', () => {
    const props = createProps({
      'aria-checked': false,
      accessibilityState: { checked: true }
    });
    expect(props['aria-checked']).toEqual(false);
  });

  test('prop "accessibilityValue" becomes "aria-value*"', () => {
    const props = createProps({
      accessibilityValue: { max: 10, min: 0, now: 5, text: 'five' }
    });
    expect(props['aria-valuemax']).toEqual(10);
    expect(props['aria-valuemin']).toEqual(0);
    expect(props['aria-valuenow']).toEqual(5);
    expect(props['aria-valuetext']).toEqual('five');
    expect(props.accessibilityValue).toBeUndefined();
  });

  test('props "accessibilityActions" and "onAccessibilityAction" are removed', () => {
    const props = createProps({
      accessibilityActions: [{ name: 'activate' }],
      onAccessibilityAction: () => {}
    });
    expect(props.accessibilityActions).toBeUndefined();
    expect(props.onAccessibilityAction).toBeUndefined();
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

  test('style "pointerEvents" "box-none" and "box-only" add class names', () => {
    ['box-none', 'box-only'].forEach((pointerEvents) => {
      const props = createProps({ style: { pointerEvents } });
      expect(props.className).toEqual(createProps({ pointerEvents }).className);
      expect(props.style).toBeUndefined();
    });
  });

  test('React Native accessibility props are not passed through', () => {
    forwardedProps.accessibilityProps
      .filter((prop) => prop.startsWith('accessibility'))
      .concat(['accessibilityActions', 'onAccessibilityAction'])
      .forEach((prop) => {
        expect(createProps({ [prop]: 'value' })).not.toHaveProperty(prop);
      });
  });

  test('prop "inert" is passed through', () => {
    expect(createProps({ inert: true })).toHaveProperty('inert', true);
  });
});
