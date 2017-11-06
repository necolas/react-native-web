/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import React from 'react';
import PropOnValueChange from './examples/PropOnValueChange';
import PropSelectedValue from './examples/PropSelectedValue';
import UIExplorer, {
  AppText,
  Description,
  DocItem,
  Section,
  storiesOf
} from '../../ui-explorer';

const PickerScreen = () => (
  <UIExplorer title="Picker" url="1-components/Picker">
    <Description>
      <AppText>Renders the native &lt;select&gt; component.</AppText>
    </Description>
    <Section title="Props">
      <DocItem
        name="onValueChange"
        typeInfo="?function"
        description="Callback for when an item is selected. This is called with the following parameters: - itemValue: the value prop of the item that was selected - itemPosition: the index of the selected item in this picker."
        example={{
          render: () => <PropOnValueChange />
        }}
      />

      <DocItem
        name="selectedValue"
        typeInfo="?string"
        description="Value matching value of one of the items. Can be a string or an integer."
        example={{
          render: () => <PropSelectedValue />
        }}
      />

      <DocItem name="style" typeInfo="?pickerStyleType" />

      <DocItem
        name="testID"
        typeInfo="?string"
        description="Used to locate this view in end-to-end tests."
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('Picker', PickerScreen);
