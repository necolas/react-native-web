/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import RTLToggleExample from './examples/RTLToggle';
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import UIExplorer, { DocItem } from '../../ui-explorer';

const sections = [
  {
    title: 'Properties',
    entries: [
      <DocItem
        name="isRTL"
        typeInfo="boolean = false"
        description="Whether the application is currently in RTL mode."
      />
    ]
  },
  {
    title: 'Methods',
    entries: [
      <DocItem
        name="static allowRTL"
        typeInfo="(allowRTL: boolean) => void"
        description="Allow the application to display in RTL mode."
      />,

      <DocItem
        name="static forceRTL"
        typeInfo="(forceRTL: boolean) => void"
        description="Force the application to display in RTL mode."
      />,

      <DocItem
        label="web"
        name="static setPreferredLanguageRTL"
        typeInfo="(isRTL: boolean) => void"
        description="Set the application's preferred writing direction to RTL. You will need to determine the user's preferred locale server-side (from HTTP headers) and decide whether it's an RTL language."
      />
    ]
  },
  {
    title: 'Examples',
    entries: [
      <DocItem
        description="Toggling LTR/RTL layout at runtime"
        example={{
          render: () => <RTLToggleExample />
        }}
      />
    ]
  }
];

storiesOf('APIs', module).add('I18nManager', () =>
  <UIExplorer
    description="Control and set the layout and writing direction of the application."
    sections={sections}
    title="I18nManager"
    url="apis/I18nManager"
  />
);
