/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import CustomSize from './examples/CustomSize';
import PropActiveThumbColor from './examples/PropActiveThumbColor';
import PropActiveTrackColor from './examples/PropActiveTrackColor';
import PropDisabled from './examples/PropDisabled';
import PropOnValueChange from './examples/PropOnValueChange';
import PropThumbColor from './examples/PropThumbColor';
import PropTrackColor from './examples/PropTrackColor';
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
        description="The color of the thumb grip when the switch is turned on."
        example={{
          render: () => <PropActiveThumbColor />
        }}
        name="activeThumbColor"
        typeInfo="?color = #009688"
      />

      <DocItem
        description="The color of the track when the switch is turned on."
        example={{
          render: () => <PropActiveTrackColor />
        }}
        name="activeTrackColor"
        typeInfo="?color = #A3D3CF"
      />

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
        description="The color of the thumb grip when the switch is turned off."
        example={{
          render: () => <PropThumbColor />
        }}
        name="thumbColor"
        typeInfo="?color = #FAFAFA"
      />

      <DocItem
        description="The color of the track when the switch is turned off."
        example={{
          render: () => <PropTrackColor />
        }}
        name="trackColor"
        typeInfo="?color = #939393"
      />

      <DocItem
        description="The value of the switch. If `true` the switch will be turned on."
        example={{
          render: () => <PropValue />
        }}
        name="value"
        typeInfo="?boolean = false"
      />

      <DocItem
        description="(For compatibility with React Native. Equivalent to &quot;activeTrackColor&quot;)"
        label="compat"
        name="onTintColor"
        typeInfo="?color"
      />

      <DocItem
        description="(For compatibility with React Native. Equivalent to &quot;trackColor&quot;)"
        label="compat"
        name="tintColor"
        typeInfo="?color"
      />

      <DocItem
        description="(For compatibility with React Native. Equivalent to &quot;thumbColor&quot;)"
        label="compat"
        name="thumbTintColor"
        typeInfo="?color"
      />
    </Section>

    <Section title="More examples">
      <DocItem
        description="Custom sizes can be created using styles"
        example={{
          code: '<Switch style={{ height: 30 }} />',
          render: () => <CustomSize />
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('Switch', SwitchScreen);
