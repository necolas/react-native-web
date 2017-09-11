/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import React from 'react';
import LegacyExample from './examples/VirtualizedListExample';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf
} from '../../ui-explorer';

const VirtualizedListScreen = () => (
  <UIExplorer title="VirtualizedList" url="1-components/VirtualizedList">
    <Description>
      <AppText>
        A basic button component. Supports a minimal level of customization. You can build your own
        custom button using <Code>TouchableOpacity</Code> or <Code>TouchableNativeFeedback</Code>.
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="legacy"
        typeInfo="?string"
        description="This is a example just to have an example..."
        example={{
          render: () => <LegacyExample />
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('VirtualizedList', VirtualizedListScreen);
