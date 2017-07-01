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
      />,
      <DocItem
        name="static addEventLitener"
        typeInfo="(type: string, handler: function) => void"
        description="Add an event handler. Supported events: [`change`]"
        example={{
          code: "Dimensions.addEventLitener('change', ({window, screen}) => console.log({window, screen}))"
        }}
      />,
      <DocItem
        name="static removeEventLitener"
        typeInfo="(type: string, handler: function) => void"
        description="Remove an event handler."
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
