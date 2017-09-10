/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import CustomStyleOverrides from './examples/CustomStyleOverrides';
import DelayEvents from './examples/DelayEvents';
import FeedbackEvents from './examples/FeedbackEvents';
import React from 'react';
import { TouchableHighlightDisabled } from './examples/PropDisabled';
import UIExplorer, { AppText, Description, DocItem, Section, storiesOf } from '../../ui-explorer';

const TouchableHighlightScreen = () => (
  <UIExplorer title="TouchableHighlight" url="1-components/Touchable">
    <Description>
      <AppText>
        A wrapper for making views respond properly to touches. On press down, the opacity of the
        wrapped view is decreased, which allows the underlay color to show through, darkening or
        tinting the view.
      </AppText>
      <AppText>
        The underlay comes from wrapping the child in a new View, which can affect layout, and
        sometimes cause unwanted visual artifacts if not used correctly, for example if the
        backgroundColor of the wrapped view isn't explicitly set to an opaque color.
      </AppText>
      <AppText>
        TouchableHighlight must have one child (not zero or more than one). If you wish to have
        several child components, wrap them in a View.
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem name="...TouchableWithoutFeedback props" />

      <DocItem
        name="activeOpacity"
        typeInfo="?number = 0.85"
        description="Determines what the opacity of the wrapped view should be when touch is active."
      />

      <DocItem
        name="onHideUnderlay"
        typeInfo="?function"
        description="Called immediately after the underlay is hidden."
      />

      <DocItem
        name="onShowUnderlay"
        typeInfo="?function"
        description="Called immediately after the underlay is shown"
      />

      <DocItem
        name="underlayColor"
        typeInfo="?color = black"
        description="The color of the underlay that will show through when the touch is active."
      />
    </Section>

    <Section title="More examples">
      <DocItem
        description="Disabled"
        example={{
          render: () => <TouchableHighlightDisabled />
        }}
      />

      <DocItem
        description="Feedback events"
        example={{
          render: () => <FeedbackEvents touchable="highlight" />
        }}
      />

      <DocItem
        description="Delay events"
        example={{
          render: () => <DelayEvents touchable="highlight" />
        }}
      />

      <DocItem
        description="Custom style overrides"
        example={{
          render: () => <CustomStyleOverrides />
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('TouchableHighlight', TouchableHighlightScreen);
