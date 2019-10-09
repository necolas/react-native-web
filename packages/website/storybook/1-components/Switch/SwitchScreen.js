/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import CustomSize from './examples/CustomSize';
import PropDisabled from './examples/PropDisabled';
import PropOnValueChange from './examples/PropOnValueChange';
import PropThumbColor from './examples/PropThumbColor';
import PropTrackColor from './examples/PropTrackColor';
import PropValue from './examples/PropValue';
import TouchableWrapper from './examples/TouchableWrapper';
import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf
} from '../../ui-explorer';

const SwitchScreen = () => (
  <UIExplorer title="Switch" url="1-components/Switch">
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
        description="If true, the user won't be able to interact with the switch."
        example={{
          render: () => <PropDisabled />
        }}
        name="disabled"
        typeInfo="?boolean = false"
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
        description="The color of the thumb grip."
        example={{
          render: () => <PropThumbColor />
        }}
        name="thumbColor"
        typeInfo="?color = #009688"
      />

      <DocItem
        description="The colors of the track when the switch is turned off and turned on."
        example={{
          render: () => <PropTrackColor />
        }}
        name="trackColor"
        typeInfo="?object = { true = #939393, false = #A3D3CF }"
      />

      <DocItem
        description="The value of the switch. If `true` the switch will be turned on."
        example={{
          render: () => <PropValue />
        }}
        name="value"
        typeInfo="?boolean = false"
      />
    </Section>

    <Section title="More examples">
      <DocItem
        description="Custom sizes can be created using styles."
        example={{
          code: '<Switch style={{ height: 30 }} />',
          render: () => <CustomSize />
        }}
      />

      <DocItem
        description="Wrapped in a Touchable."
        example={{
          render: () => <TouchableWrapper />
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('Switch', SwitchScreen);
