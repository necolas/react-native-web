/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import DelayEvents from './examples/DelayEvents';
import FeedbackEvents from './examples/FeedbackEvents';
import React from 'react';
import { TouchableOpacityDisabled } from './examples/PropDisabled';
import UIExplorer, { AppText, Description, DocItem, Section, storiesOf } from '../../ui-explorer';

const TouchableOpacityScreen = () => (
  <UIExplorer title="TouchableOpacity" url="1-components/Touchable">
    <Description>
      <AppText>
        A wrapper for making views respond properly to touches. On press down, the opacity of the
        wrapped view is decreased, dimming it.
      </AppText>
      <AppText>
        Opacity is controlled by wrapping the children in an Animated.View, which is added to the
        view hiearchy. Be aware that this can affect layout.
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem name="...TouchableWithoutFeedback props" />

      <DocItem
        name="activeOpacity"
        typeInfo="?number = 0.2"
        description="Determines what the opacity of the wrapped view should be when touch is active."
      />

      <DocItem
        name="focusedOpacity"
        typeInfo="?number = 0.7"
        description="Determines what the opacity of the wrapped view should be when it is focused."
      />
    </Section>

    <Section title="Instance methods">
      <DocItem
        name="setOpacityTo"
        typeInfo="(value: number, duration: number) => void"
        description="Transition the touchable to a new opacity."
      />
    </Section>

    <Section title="More examples">
      <DocItem
        description="Disabled TouchableOpacity"
        example={{
          render: () => <TouchableOpacityDisabled />
        }}
      />

      <DocItem
        description="Feedback events"
        example={{
          render: () => <FeedbackEvents touchable="opacity" />
        }}
      />

      <DocItem
        description="Delay events"
        example={{
          render: () => <DelayEvents touchable="opacity" />
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('TouchableOpacity', TouchableOpacityScreen);
