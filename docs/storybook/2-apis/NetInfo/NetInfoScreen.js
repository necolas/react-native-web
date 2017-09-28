/**
 * @flow
 */

import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  ExternalLink,
  Section,
  storiesOf,
  TextList
} from '../../ui-explorer';

const NetInfoScreen = () => (
  <UIExplorer title="NetInfo" url="2-apis/NetInfo">
    <Description>
      <AppText>
        NetInfo asynchronously determines the online/offline status and additional connection
        information (where available) of the application.
      </AppText>
      <AppText>
        Note that support for retrieving the connection type depends upon browswer support and the
        current platform. It will default to <Code>unknown</Code> when support is missing. Under the
        hood it leverages the{' '}
        <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation">
          NetworkInformation API
        </ExternalLink>.
      </AppText>
    </Description>

    <Section title="Methods">
      <DocItem
        description={[
          <AppText>
            Invokes the listener whenever network status changes. The listener an object with at
            least <Code>effectiveType</Code> and <Code>type</Code>, plus any additional properties
            from the browser's NetworkInformation API:
          </AppText>,
          <AppText style={{ fontWeight: '500' }}>effectiveType (EffectiveConnectionType)</AppText>,
          <TextList items={['slow-2g', '2g', '3g', '4g', 'unknown']} />,
          <AppText style={{ fontWeight: '500' }}>type (ConnectionType)</AppText>,
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
          code: "NetInfo.addEventListener('connectionChange', ({ effectiveType, type }) => {})"
        }}
        name="static addEventListener"
        typeInfo="(eventName, handler) => void"
      />

      <DocItem
        description="Returns a promise that resolves with an object of the format listed above."
        example={{
          code: `NetInfo.getConnectionInfo().then(({ effectiveType, type }) => {
  console.log('Effective connection type:', effectiveType);
  console.log('Legacy connection type:', type);
});`
        }}
        name="static getConnectionInfo"
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
          code: `NetInfo.isConnected.getConnectionInfo().then((isConnected) => {
  console.log('Connection status:', (isConnected ? 'online' : 'offline'));
});`
        }}
        name="isConnected"
        typeInfo="ObjectExpression"
      />
    </Section>
  </UIExplorer>
);

storiesOf('APIs', module).add('NetInfo', NetInfoScreen);
