/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import React from 'react';
import PropColor from './examples/PropColor';
import PropDisabled from './examples/PropDisabled';
import PropOnPress from './examples/PropOnPress';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf
} from '../../ui-explorer';

const ButtonScreen = () => (
  <UIExplorer title="Button" url="1-components/Button">
    <Description>
      <AppText>
        A basic button component. Supports a minimal level of customization. You can build your own
        custom button using <Code>TouchableOpacity</Code> or <Code>TouchableNativeFeedback</Code>.
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="accessibilityLabel"
        typeInfo="?string"
        description="Overrides the text that's read by a screen reader when the user interacts with the element."
      />

      <DocItem
        name="color"
        typeInfo="?string"
        description="Background color of the button."
        example={{
          render: () => <PropColor />
        }}
      />

      <DocItem
        name="disabled"
        typeInfo="?boolean"
        description="If true, disable all interactions for this element."
        example={{
          render: () => <PropDisabled />
        }}
      />

      <DocItem
        name="onPress"
        typeInfo="function"
        description="This function is called on press."
        example={{
          render: () => <PropOnPress />
        }}
      />

      <DocItem
        name="testID"
        typeInfo="?string"
        description="Used to locate this view in end-to-end tests."
      />

      <DocItem name="title" typeInfo="string" description="Text to display inside the button." />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('Button', ButtonScreen);
