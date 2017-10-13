/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import DimensionsChange from './examples/DimensionsChange';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
  TextList
} from '../../ui-explorer';
import React from 'react';

const DimensionsScreen = () => (
  <UIExplorer title="Dimensions" url="2-apis/Dimensions">
    <Description>
      Note: dimensions may change (e.g., due to device rotation) so any rendering logic or styles
      that depend on these constants should try to call this function on every render, rather than
      caching the value.
    </Description>

    <Section title="Methods">
      <DocItem
        name="static get"
        typeInfo="(dimension: string) => Object"
        description="Get a dimension (e.g., `window` or `screen`)."
        example={{
          code: "const { height, width } = Dimensions.get('window')"
        }}
      />

      <DocItem
        name="static set"
        typeInfo="(dimensions: ?{[key:string]: any}) => void"
        description="This should only be called server-side with an estimate
        for initial dimensions to be used when pre-rendering pages on the
        server."
      />

      <DocItem
        name="static addEventListener"
        typeInfo="(type: string, handler: function) => void"
        description={[
          <AppText>Add an event handler. Supported events:</AppText>,
          <TextList
            items={[
              <AppText>
                <Code>change</Code>: Fires when a property within the <Code>Dimensions</Code> object
                changes. The argument to the event handler is an object with <Code>window</Code> and{' '}
                <Code>screen</Code> properties whose values are the same as the return values of{' '}
                <Code>Dimensions.get('window')</Code> and <Code>Dimensions.get('screen')</Code>,
                respectively.
              </AppText>
            ]}
          />
        ]}
        example={{
          render: () => <DimensionsChange />
        }}
      />

      <DocItem
        name="static removeEventListener"
        typeInfo="(type: string, handler: function) => void"
        description="Remove an event handler."
      />
    </Section>
  </UIExplorer>
);

storiesOf('APIs', module).add('Dimensions', DimensionsScreen);
