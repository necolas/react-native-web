/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import CustomStyleOverrides from './examples/CustomStyleOverrides';
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { TouchableHighlightDisabled } from './examples/PropDisabled';
import UIExplorer, { AppText, DocItem } from '../../ui-explorer';

const sections = [
  {
    title: 'Props',
    entries: [
      <DocItem name="...TouchableWithoutFeedback props" />,

      <DocItem
        name="activeOpacity"
        typeInfo="?number = 0.85"
        description="Determines what the opacity of the wrapped view should be when touch is active."
      />,

      <DocItem
        name="onHideUnderlay"
        typeInfo="?function"
        description="Called immediately after the underlay is hidden."
      />,

      <DocItem
        name="onShowUnderlay"
        typeInfo="?function"
        description="Called immediately after the underlay is shown"
      />,

      <DocItem
        name="underlayColor"
        typeInfo="?color = black"
        description="The color of the underlay that will show through when the touch is active."
      />
    ]
  },
  {
    title: 'More examples',
    entries: [
      <DocItem
        description="Disabled TouchableHighlight"
        example={{
          code: '',
          render: () => <TouchableHighlightDisabled />
        }}
      />,

      <DocItem
        description="Custom style overrides"
        example={{
          code: '',
          render: () => <CustomStyleOverrides />
        }}
      />
    ]
  }
];

storiesOf('Components', module).add('TouchableHighlight', () =>
  <UIExplorer
    description={[
      <AppText>
        A wrapper for making views respond properly to touches. On press down, the opacity of the
        wrapped view is decreased, which allows the underlay color to show through, darkening or
        tinting the view.
      </AppText>,
      <AppText>
        The underlay comes from wrapping the child in a new View, which can affect layout, and
        sometimes cause unwanted visual artifacts if not used correctly, for example if the
        backgroundColor of the wrapped view isn't explicitly set to an opaque color.
      </AppText>,
      <AppText>
        TouchableHighlight must have one child (not zero or more than one). If you wish to have
        several child components, wrap them in a View.
      </AppText>
    ]}
    sections={sections}
    title="TouchableHighlight"
    url="components/Touchable"
  />
);
