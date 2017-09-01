/**
 * @flow
 */

import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
  TextList
} from '../../ui-explorer';

const NetInfoScreen = () =>
  <UIExplorer title="NetInfo" url="2-apis/NetInfo">
    <Description>
      <AppText>
        NetInfo asynchronously determines the online/offline status of the application.
      </AppText>
      <AppText>
        Note that support for retrieving the connection type depends upon browswer support (and is
        limited to mobile browsers). It will default to <Code>unknown</Code> when support is
        missing.
      </AppText>
    </Description>

    <Section title="Methods">
      <DocItem
        description={[
          <AppText>
            Invokes the listener whenever network status changes. The listener receives one of the
            following connectivity types (from the DOM connection API):
          </AppText>,
          <TextList
            items={[
              'bluetooth',
              'cellular',
              'ethernet',
              'mixed',
              'none',
              'other',
              'unknown',
              'wifi',
              'wimax'
            ]}
          />
        ]}
        example={{
          code: "NetInfo.addEventListener('change', (connectionType) => {})"
        }}
        name="static addEventListener"
        typeInfo="(eventName, handler) => void"
      />

      <DocItem
        description="Returns a promise that resolves with one of the connectivity types listed above."
        example={{
          code: `NetInfo.fetch().then((connectionType) => {
  console.log('Connection type:', connectionType);
});`
        }}
        name="static fetch"
        typeInfo="() => Promise<string>"
      />

      <DocItem
        description="Removes the listener for network status changes."
        name="static removeEventListener"
        typeInfo="(eventName, handler) => void"
      />
    </Section>

    <Section title="Properties">
      <DocItem
        description="An object with the same methods as above but the listener receives a boolean which represents the internet connectivity. Use this if you are only interested with whether the device has internet connectivity."
        example={{
          code: `NetInfo.isConnected.fetch().then((isConnected) => {
  console.log('Connection status:', (isConnected ? 'online' : 'offline'));
});`
        }}
        name="isConnected"
        typeInfo="ObjectExpression"
      />
    </Section>
  </UIExplorer>;

storiesOf('APIs', module).add('NetInfo', NetInfoScreen);
