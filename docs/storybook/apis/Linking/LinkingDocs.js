/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import { storiesOf } from '@kadira/storybook';
import UIExplorer, { DocItem } from '../../ui-explorer';
import OpenURLExample from './examples/OpenURL';
import React from 'react';

const sections = [
  {
    title: 'Methods',
    entries: [
      <DocItem name="canOpenURL" typeInfo="(url) => Promise<true>" />,

      <DocItem name="getInitialURL" typeInfo="() => Promise<string>" />,

      <DocItem
        name="openURL"
        typeInfo="(url: string) => Promise<>"
        description="Try to open the given url in a secure fashion. The method returns a Promise object. If the url opens, the promise is resolved. If not, the promise is rejected."
        example={{
          render: () => <OpenURLExample />
        }}
      />
    ]
  }
];

storiesOf('APIs', module).add('Linking', () =>
  <UIExplorer
    description="Linking gives you a general interface for securely opening external URLs from JavaScript."
    sections={sections}
    title="Linking"
    url="apis/Linking"
  />
);
