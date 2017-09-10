/**
 * @flow
 */

import React from 'react';
import UIExplorer, { Description, DocItem, Section, storiesOf } from '../../ui-explorer';

const PlatformScreen = () => (
  <UIExplorer title="Platform" url="2-apis/Platform">
    <Description>
      Detect what is the platform in which the app is running. This piece of functionality can be
      useful when only small parts of a component are platform specific.
    </Description>
    <Section title="Properties">
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
    </Section>

    <Section title="Methods">
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
    </Section>
  </UIExplorer>
);

storiesOf('APIs', module).add('Platform', PlatformScreen);
