import UIExplorer, { Description, DocItem, Section, storiesOf } from '../../ui-explorer';

import React from 'react';
import AlertExample from './examples/AlertExample';
import AlertAndroid from './examples/AlertAndroid';
import AlertIOS from './examples/AlertIOS';

const AlertScreen = () => (
  <UIExplorer title="Alert" url="2-apis/Alert">
    <Description>
      Launches an alert dialog with the specified title and message. Optionally provide a list of
      buttons. Tapping any button will fire the respective onPress callback and dismiss the alert.
      <a href="https://facebook.github.io/react-native/docs/alert">See the alert API docs</a>
    </Description>

    <Section title="Methods">
      <DocItem
        example={{
          render: () => <AlertExample />
        }}
        name="static alert"
        typeInfo="(title: string, message: string, options: [alertOption], type: {cancelable: boolean})"
      />
    </Section>
    <Section title="Custom styles examples">
      <DocItem
        example={{
          render: () => <AlertAndroid />
        }}
        name="Android styled alert"
      />

      <DocItem
        example={{
          render: () => <AlertIOS />
        }}
        name="iOS styled alert"
      />
    </Section>
  </UIExplorer>
);

storiesOf('APIs', module).add('Alert', AlertScreen);
