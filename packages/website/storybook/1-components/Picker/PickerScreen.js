/* eslint-disable react/jsx-sort-props, react/jsx-no-bind, no-alert */

/**
 * @flow
 */

import React from 'react';
import PickerExample from './examples/PickerExample';
import UIExplorer, {
  AppText,
  Description,
  DocItem,
  Section,
  StyleList,
  storiesOf
} from '../../ui-explorer';
import { View } from 'react-native';

const PickerScreen = () => (
  <View>
    <UIExplorer title="Picker">
      <Description>
        <AppText>Renders the native &lt;select&gt; component.</AppText>
      </Description>
      <Section title="Props">
        <DocItem name="...View props" />

        <DocItem
          name="children"
          typeInfo="?Array<Picker.Item>"
          description="The items to display in the picker."
          example={{
            code: `<Picker>
  <Picker.Item label="Goblet of Fire" />
  <Picker.Item label="Order of the Phoenix" />
</Picker>`
          }}
        />

        <DocItem
          name="enabled"
          typeInfo="?boolean"
          description="If set to false, the picker will be disabled, i.e., the user will not be able to make a selection."
          example={{
            render: () => <PickerExample enabled={false} />
          }}
        />

        <DocItem
          name="onValueChange"
          typeInfo="?(itemValue, itemIndex) => void"
          description="Callback for when an item is selected. This is called with the value and index prop of the item that was selected."
          example={{
            render: () => (
              <PickerExample
                onValueChange={(itemValue, itemPosition) => {
                  window.alert(`itemValue: ${itemValue}, itemPosition: ${itemPosition}`);
                }}
              />
            )
          }}
        />

        <DocItem
          name="selectedValue"
          typeInfo="?string"
          description="Select the item with the matching value."
          example={{
            render: () => <PickerExample selectedValue="book-3" />
          }}
        />

        <DocItem
          name="style"
          typeInfo="?style"
          description={
            <StyleList
              stylePropTypes={[
                {
                  name: '…View#style'
                },
                {
                  name: 'color',
                  typeInfo: 'color'
                }
              ]}
            />
          }
        />

        <DocItem
          name="testID"
          typeInfo="?string"
          description="Used to locate this view in end-to-end tests."
        />
      </Section>
    </UIExplorer>

    <UIExplorer title="Picker.Item" url="1-components/Picker">
      <Description>Individual selectable item in a Picker.</Description>

      <Section title="Props">
        <DocItem
          name="color"
          typeInfo="?color"
          description="Color of the item label. (Limited by browser support.)"
        />

        <DocItem name="label" typeInfo="string" description="Text to display for this item." />

        <DocItem name="testID" typeInfo="?string" />

        <DocItem
          name="value"
          typeInfo="?number | string"
          description="The value to be passed to the picker's 'onValueChange' callback when this item is selected."
        />
      </Section>
    </UIExplorer>
  </View>
);

storiesOf('Components', module).add('Picker', PickerScreen);
