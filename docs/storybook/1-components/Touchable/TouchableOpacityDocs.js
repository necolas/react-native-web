/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import DelayEvents from './examples/DelayEvents';
import FeedbackEvents from './examples/FeedbackEvents';
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { TouchableOpacityDisabled } from './examples/PropDisabled';
import UIExplorer, { AppText, DocItem } from '../../ui-explorer';

const sections = [
  {
    title: 'Props',
    entries: [
      <DocItem name="...TouchableWithoutFeedback props" />,

      <DocItem
        name="activeOpacity"
        typeInfo="?number = 0.2"
        description="Determines what the opacity of the wrapped view should be when touch is active."
      />,

      <DocItem
        name="focusedOpacity"
        typeInfo="?number = 0.7"
        description="Determines what the opacity of the wrapped view should be when it is focused."
      />
    ]
  },
  {
    title: 'Instance methods',
    entries: [
      <DocItem
        name="setOpacityTo"
        typeInfo="(value: number, duration: number) => void"
        description="Transition the touchable to a new opacity."
      />
    ]
  },
  {
    title: 'More examples',
    entries: [
      <DocItem
        description="Disabled TouchableOpacity"
        example={{
          render: () => <TouchableOpacityDisabled />
        }}
      />,

      <DocItem
        description="Feedback events"
        example={{
          render: () => <FeedbackEvents touchable="opacity" />
        }}
      />,

      <DocItem
        description="Delay events"
        example={{
          render: () => <DelayEvents touchable="opacity" />
        }}
      />
    ]
  }
];

storiesOf('Components', module).add('TouchableOpacity', () =>
  <UIExplorer
    description={[
      <AppText>
        A wrapper for making views respond properly to touches. On press down, the opacity of the
        wrapped view is decreased, dimming it.
      </AppText>,
      <AppText>
        Opacity is controlled by wrapping the children in an Animated.View, which is added to the
        view hiearchy. Be aware that this can affect layout.
      </AppText>
    ]}
    sections={sections}
    title="TouchableOpacity"
    url="components/Touchable"
  />
);
