/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import React from 'react';
import StateChangesExample from './examples/StateChanges';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf
} from '../../ui-explorer';

const AppStateScreen = () => (
  <UIExplorer title="AppState" url="2-apis/AppState">
    <Description>
      <AppText>
        AppState can tell you if the app is in the foreground or background, and notify you when the
        state changes. States: <Code>active</Code> (the app is running in the foreground),{' '}
        <Code>background</Code> (the app is running in the background, i.e., the user has not
        focused the app's tab).
      </AppText>
    </Description>

    <Section title="Properties">
      <DocItem
        name="static isAvailable"
        description="Determines whether the browser environment supports AppState."
      />

      <DocItem
        name="static currentState"
        description="Returns the current state of the app: &quot;active&quot; or &quot;background&quot;."
      />
    </Section>

    <Section title="Methods">
      <DocItem
        name="static addEventListener"
        typeInfo="(type: string, handler: Function) => void"
        description={
          <AppText>
            Add a handler to <Code>AppState</Code> changes by listening to the
            <Code>change</Code> event type and providing the <Code>handler</Code>. The handler is
            called with the app state value.
          </AppText>
        }
      />

      <DocItem
        name="static removeEventListener"
        typeInfo="(type: string, handler: Function) => void"
        description={
          <AppText>
            Remove a handler by passing the change event <Code>type</Code> and the{' '}
            <Code>handler</Code>.
          </AppText>
        }
      />
    </Section>

    <Section title="Example">
      <DocItem
        example={{
          render: () => <StateChangesExample />
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('APIs', module).add('AppState', AppStateScreen);
