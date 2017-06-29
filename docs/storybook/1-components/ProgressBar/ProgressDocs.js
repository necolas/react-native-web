/**
 * @flow
 */

import PropColor from './examples/PropColor';
import CustomSize from './examples/CustomSize';
import PropIndeterminate from './examples/PropIndeterminate';
import PropProgress from './examples/PropProgress';
import PropTrackColor from './examples/PropTrackColor';
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import UIExplorer, { DocItem } from '../../ui-explorer';

const sections = [
  {
    title: 'Props',
    entries: [
      <DocItem name="...View props" />,

      <DocItem
        description="Color of the progress bar."
        example={{
          render: () => <PropColor />
        }}
        name="color"
        typeInfo="?string = #1976D2"
      />,

      <DocItem
        description="Whether the progress bar will show indeterminate progress."
        example={{
          render: () => <PropIndeterminate />
        }}
        name="indeterminate"
        typeInfo="?boolean = true"
      />,

      <DocItem
        description="The progress value (between 0 and 1)."
        example={{
          render: () => <PropProgress />
        }}
        name="progress"
        typeInfo="?number"
      />,

      <DocItem
        description="Color of the track bar."
        example={{
          render: () => <PropTrackColor />
        }}
        name="trackColor"
        typeInfo="?string = 'transparent'"
      />
    ]
  },
  {
    title: 'More examples',
    entries: [
      <DocItem
        description="Custom sizes can be created using styles"
        example={{
          code: '<ProgressBar style={{ borderRadius: 10, height: 10 }} trackColor="#D1E3F6" />',
          render: () => <CustomSize />
        }}
      />
    ]
  }
];

storiesOf('Components', module).add('ProgressBar', () =>
  <UIExplorer
    description="Display an activity progress bar"
    sections={sections}
    title="ProgressBar"
    url="components/ProgressBar"
  />
);
