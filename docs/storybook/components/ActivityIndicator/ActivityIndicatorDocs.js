/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import PropAnimating from './examples/PropAnimating';
import PropColor from './examples/PropColor';
import PropHidesWhenStopped from './examples/PropHidesWhenStopped';
import PropSize from './examples/PropSize';
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import UIExplorer, { DocItem } from '../../ui-explorer';

const sections = [
  {
    title: 'Props',
    entries: [
      <DocItem name="...View props" />,

      <DocItem
        name="animating"
        typeInfo="?boolean = true"
        description="Whether to show the indicator or hide it."
        example={{
          render: () => <PropAnimating />
        }}
      />,

      <DocItem
        name="color"
        typeInfo="?color = #1976D2"
        description="The foreground color of the spinner."
        example={{
          render: () => <PropColor />
        }}
      />,

      <DocItem
        name="hidesWhenStopped"
        typeInfo="?boolean = true"
        description="Whether the indicator should hide when not animating."
        example={{
          render: () => <PropHidesWhenStopped />
        }}
      />,

      <DocItem
        name="size"
        typeInfo="?enum('small', 'large') | number = 'small'"
        description="Size of the indicator. Small has a height of 20px, large has a height of 36px."
        example={{
          render: () => <PropSize />
        }}
      />
    ]
  }
];

storiesOf('Components', module).add('ActivityIndicator', () =>
  <UIExplorer
    description="Displays a customizable activity indicator"
    sections={sections}
    title="ActivityIndicator"
    url="components/ActivityIndicator"
  />
);
