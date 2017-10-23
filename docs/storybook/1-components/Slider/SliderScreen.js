/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */
import PropDisabled from './examples/PropDisabled';
import PropMaximumTrackTintColor from './examples/PropMaximumTrackTintColor';
import PropMinimumTrackTintColor from './examples/PropMinimumTrackTintColor';
import PropOnValueChange from './examples/PropOnValueChange.js';
import PropStep from './examples/PropStep';
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
      <DocItem name="...View props" />

      <DocItem
        name="disabled"
        typeInfo="?boolean = false"
        description="If true, the user won't be able to interact with the slider"
        example={{
          render: () => <PropDisabled />
        }}
      />

      <DocItem
        name="maximumTrackTintColor"
        typeInfo="?color = #939393"
        description="The color used for the track to the right of the button."
        example={{
          render: () => <PropMaximumTrackTintColor />
        }}
      />

      <DocItem
        name="maximumValue"
        typeInfo="?number = 1"
        description="Initial maximum value of the slider."
      />

      <DocItem
        name="minimumTrackTintColor"
        typeInfo="?color = #009688"
        description="The color used for the track to the left of the button, including the button color."
        example={{
          render: () => <PropMinimumTrackTintColor />
        }}
      />

      <DocItem
        name="minimumValue"
        typeInfo="?number = 0"
        description="Initial minimum value of the slider."
      />

      <DocItem
        name="onSlidingComplete"
        typeInfo="?function"
        description="Callback that is called when the user releases the slider, regardless if the value has changed. The current value is passed as an argument to the callback handler."
      />

      <DocItem
        name="onValueChange"
        typeInfo="?function"
        description="Callback continuously called while the user is dragging the slider."
        example={{
          render: () => <PropOnValueChange />
        }}
      />

      <DocItem
        name="step"
        typeInfo="?number = 0"
        description="Step value of the slider. The value should be between 0 and (maximumValue - minimumValue)."
        example={{
          render: () => <PropStep />
        }}
      />

      <DocItem
        name="style"
        typeInfo="?ViewPropTypes.style"
        description="Used to style and layout the Slider."
      />

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
