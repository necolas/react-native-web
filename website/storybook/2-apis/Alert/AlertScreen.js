/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import Alert from './examples/Alert';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
  TextList
} from '../../ui-explorer';
import React from 'react';

const AlertScreen = () => (
  <UIExplorer title="Alert" url="2-apis/Alert">
    <Description>Launches an alert dialog with the specified title and message.</Description>
    <Description>
      Optionally provide a list of buttons. Tapping any button will fire the respective onPress
      callback and dismiss the alert. By default, the only button will be an 'OK' button.
    </Description>
    <Description>
      The alert's default style and API behavior is the same as the Android version of React
      Native's Alert.
    </Description>

    <Section title="Methods">
      <DocItem
        name="static alert"
        typeInfo="(title: string, message?: string, buttons?: Array<{ text?: string, onPress?: function }>, options?: { cancelable?: boolean, onDismiss?: function }) => void"
        description={[
          <AppText>
            At most three buttons can be specified. Like Android, there is a concept of a neutral,
            negative and a positive button:
          </AppText>,
          <TextList
            items={[
              <AppText>
                If you specify one button, it will be the 'positive' one (such as 'OK')
              </AppText>,
              <AppText>Two buttons mean 'negative', 'positive' (such as 'Cancel', 'OK')</AppText>,
              <AppText>
                Three buttons mean 'neutral', 'negative', 'positive' (such as 'Later', 'Cancel',
                'OK')
              </AppText>
            ]}
          />,
          <AppText>
            By default alerts on Android can be dismissed by tapping outside of the alert box. This
            event can be handled by providing an optional <Code>options</Code> parameter, with an{' '}
            <Code>onDismiss</Code> callback property <Code>{'{ onDismiss: () => {} }'}</Code>.
          </AppText>,
          <AppText>
            Alternatively, the dismissing behavior can be disabled altogether by providing an
            optional <Code>options</Code> parameter with the <Code>cancelable</Code> property set to{' '}
            <Code>false</Code> i.e. <Code>{'{ cancelable: false }'}</Code>
          </AppText>,
          <AppText>Example usage:</AppText>,
          <AppText>
            <Code>{`Alert.alert(
  'Alert Title',
  'My Alert Msg',
  [
    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ],
  { cancelable: false }
)`}</Code>
          </AppText>
        ]}
        example={{
          render: () => <Alert />
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('APIs', module).add('Alert', AlertScreen);
