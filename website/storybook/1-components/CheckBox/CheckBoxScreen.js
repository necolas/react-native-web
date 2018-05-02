/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import CustomSize from './examples/CustomSize';
import PropColor from './examples/PropColor';
import PropDisabled from './examples/PropDisabled';
import PropOnValueChange from './examples/PropOnValueChange';
import PropValue from './examples/PropValue';
import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf
} from '../../ui-explorer';

const CheckBoxScreen = () => (
  <UIExplorer title="CheckBox" url="1-components/CheckBox">
    <Description>
      <AppText>
        This is a controlled component that requires an <Code>onValueChange</Code> callback that
        updates the value prop in order for the component to reflect user actions. If the{' '}
        <Code>value</Code> prop is not updated, the component will continue to render the supplied{' '}
        <Code>value</Code> prop instead of the expected result of any user actions.
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem name="...View props" />

      <DocItem
        description="Customize the color of the checkbox."
        example={{
          render: () => <PropColor />
        }}
        label="web"
        name="color"
        typeInfo="?color"
      />

      <DocItem
        description="If true, the user won't be able to interact with the checkbox."
        example={{
          render: () => <PropDisabled />
        }}
        name="disabled"
        typeInfo="?boolean = false"
      />

      <DocItem
        description="Invoked with the event when the value changes."
        name="onChange"
        typeInfo="?function"
      />

      <DocItem
        description="Invoked with the new value when the value changes."
        example={{
          render: () => <PropOnValueChange />
        }}
        name="onValueChange"
        typeInfo="?function"
      />

      <DocItem
        description="The value of the checkbox. If `true` the checkbox will be checked."
        example={{
          render: () => <PropValue />
        }}
        name="value"
        typeInfo="?boolean = false"
      />
    </Section>

    <Section title="More examples">
      <DocItem
        description="The checkbox size can be controlled by the 'height' and 'width' style properties"
        example={{
          code: '<CheckBox style={{ height: 32, width: 32 }} />',
          render: () => <CustomSize />
        }}
        name="Custom size"
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('CheckBox', CheckBoxScreen);
