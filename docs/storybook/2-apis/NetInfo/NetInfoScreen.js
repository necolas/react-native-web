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
  storiesOf
} from '../../ui-explorer';

const NetInfoScreen = () => (
  <UIExplorer title="NetInfo" url="2-apis/NetInfo">
    <Description>
      <AppText>
        NetInfo asynchronously determines the online/offline status and additional connection
        information (where available) of the application.
      </AppText>
      <AppText>
        Note that connection type information is limited to how well the browser supports the{' '}
        <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation">
          NetworkInformation API
        </ExternalLink>. Connection types will be <Code>unknown</Code> when support is missing.
      </AppText>
    </Description>

    <Section title="Types">
      <DocItem
        description={
          <AppText>
            One of <Code>slow-2g</Code>, <Code>2g</Code>, <Code>3g</Code>, <Code>4g</Code>,{' '}
            <Code>unknown</Code>.
          </AppText>
        }
        name="ConnectionType"
      />
      <DocItem
        description={
          <AppText>
            One of <Code>bluebooth</Code>, <Code>cellular</Code>, <Code>ethernet</Code>,{' '}
            <Code>mixed</Code>, <Code>mixed</Code>, <Code>none</Code>, <Code>other</Code>,{' '}
            <Code>unknown</Code>, <Code>wifi</Code>, <Code>wimax</Code>
          </AppText>
        }
        name="EffectiveConnectionType"
      />

      <DocItem
        description={
          <Code>{`{
  effectiveType: EffectiveConnectionType;
  type: ConnectionType;
  downlink?: number;
  downlinkMax?: number;
  rtt?: number;
}`}</Code>
        }
        name="ConnectionEventType"
      />
    </Section>

    <Section title="Methods">
      <DocItem
        description={
          <AppText>
            Adds an event handler. The <Code>connectionChange</Code> event fires when the network
            status changes. The argument to the event handler is an object of type{' '}
            <Code>ConnectionEventType</Code>.
          </AppText>
        }
        example={{
          code: `NetInfo.addEventListener('connectionChange', ({ effectiveType, type }) => {
  console.log('Effective connection type:', effectiveType);
  console.log('Connection type:', type);
})`
        }}
        name="static addEventListener"
        typeInfo="(eventName, handler) => void"
      />

      <DocItem
        description={
          <AppText>
            Returns a promise that resolves with an object of type <Code>ConnectionEventType</Code>.
          </AppText>
        }
        example={{
          code: `NetInfo.getConnectionInfo().then(({ effectiveType, type }) => {
  console.log('Effective connection type:', effectiveType);
  console.log('Connection type:', type);
});`
        }}
        name="static getConnectionInfo"
        typeInfo="() => Promise<ConnectionEventType>"
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
