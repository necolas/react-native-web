/**
 * @flow
 */

import { storiesOf } from '@kadira/storybook';
import React from 'react';
import UIExplorer, { DocItem } from '../../ui-explorer';

const sections = [
  {
    title: 'Properties',
    entries: [
      <DocItem
        description="`Platform.OS` will be `web` when running in a Web browser."
        example={{
          code: `import { Platform } from 'react-native';

const styles = StyleSheet.create({
  height: (Platform.OS === 'web') ? 200 : 100,
});`
        }}
        name="OS"
        typeInfo="string"
      />
    ]
  },
  {
    title: 'Methods',
    entries: [
      <DocItem
        description="`Platform.select` takes an object containing `Platform.OS` as keys and returns the value for the platform you are currently running on."
        example={{
          code: `import { Platform } from 'react-native';

const containerStyles = {
  flex: 1,
  ...Platform.select({
    android: {
      backgroundColor: 'blue'
    },
    ios: {
      backgroundColor: 'red'
    },
    web: {
      backgroundColor: 'green'
    }
  })
});`
        }}
        name="select"
        typeInfo="(object) => any"
      />
    ]
  }
];

storiesOf('APIs', module).add('Platform', () =>
  <UIExplorer
    description="Detect what is the platform in which the app is running. This piece of functionality can be useful when only small parts of a component are platform specific."
    sections={sections}
    title="Platform"
    url="apis/Platform"
  />
);
