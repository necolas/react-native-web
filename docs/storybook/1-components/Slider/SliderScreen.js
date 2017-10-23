/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */
import PropValue from './examples/PropValue';
import React from 'react';
import UIExplorer, {
  AppText,
  Description,
  DocItem,
  Section,
  storiesOf
} from '../../ui-explorer';

const SliderScreen = () => (
  <UIExplorer title="Slider" url="1-components/Slider">
    <Description>
      <AppText>
        A component used to select a single value from a range of values.
      </AppText>
    </Description>
    <Section title="Props">
      <DocItem
        name="value"
        typeInfo="?number = 0"
        description="The value of the slider. Default is 0."
        example={{
          render: () => <PropValue />
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('Slider', SliderScreen);
