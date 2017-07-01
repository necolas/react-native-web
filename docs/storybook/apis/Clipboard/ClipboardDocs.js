/**
 * @flow
 */

import React from 'react';
import SetStringExample from './examples/SetString';
import { storiesOf } from '@kadira/storybook';
import UIExplorer, { DocItem } from '../../ui-explorer';

const sections = [
  {
    title: 'Methods',
    entries: [
      <DocItem
        description="Determines whether the browser environment supports Clipboard at all."
        label="web"
        name="static isAvailable"
        typeInfo="() => boolean"
      />,

      <DocItem
        description={
          'Copies a string to the clipboard. On web, some browsers may not support copying to the clipboard, therefore, this function returns a boolean to indicate if the copy was successful.'
        }
        example={{
          render: () => <SetStringExample />
        }}
        name="static setString"
        typeInfo="(string) => boolean"
      />,

      <DocItem
        description="Not properly supported on Web. Returns a `Promise` of an empty string."
        label="compat"
        name="static getString"
        typeInfo="()"
      />
    ]
  }
];

storiesOf('APIs', module).add('Clipboard', () =>
  <UIExplorer
    description="Clipboard gives you an interface for setting to the clipboard. (Getting clipboard content is not supported on web.)"
    sections={sections}
    title="Clipboard"
    url="apis/Clipboard"
  />
);
