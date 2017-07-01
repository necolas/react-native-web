/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import { storiesOf } from '@kadira/storybook';
import UIExplorer, { DocItem } from '../../ui-explorer';
import React from 'react';

const sections = [
  {
    title: 'Methods',
    entries: [
      <DocItem
        name="static get"
        typeInfo="(dimension: string) => Object"
        description="Get a dimension (e.g., `window` or `screen`)."
        example={{
          code: "const { height, width } = Dimensions.get('window')"
        }}
      />
    ]
  }
];

storiesOf('APIs', module).add('Dimensions', () =>
  <UIExplorer
    description="Note: dimensions may change (e.g., due to device rotation) so any rendering logic or styles that depend on these constants should try to call this function on every render, rather than caching the value."
    sections={sections}
    title="Dimensions"
  />
);
