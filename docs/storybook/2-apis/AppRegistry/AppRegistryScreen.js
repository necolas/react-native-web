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
  storiesOf
} from '../../ui-explorer';

const AppRegistryScreen = () => (
  <UIExplorer title="AppRegistry" url="2-apis/AppRegistry">
    <Description>
      <AppText>
        AppRegistry is the control point for registering, running, prerendering, and unmounting all
        apps. App root components should register themselves with{' '}
        <Code>AppRegistry.registerComponent</Code>. Apps can be run by invoking{' '}
        <Code>AppRegistry.runApplication</Code>
      </AppText>
    </Description>

    <Section title="Methods">
      <DocItem
        description="Returns the given application's element and stylesheets. Use this for server-side rendering."
        label="web"
        name="static getApplication"
        typeInfo="(appKey: string, appParameters: ?object) => { element: ReactElement; stylesheets: Array<ReactElement> }"
      />

      <DocItem
        description={[
          <AppText>
            Register multiple applications. <Code>AppConfig</Code> type is:
          </AppText>,
          <Code>{`{
  appKey: string;
  component: ComponentProvider;
  run?: function
}`}</Code>
        ]}
        name="static registerConfig"
        typeInfo="(config: Array<AppConfig>) => avoid"
      />

      <DocItem
        description={
          <AppText>
            Register a component provider under the given <Code>appKey</Code>.
          </AppText>
        }
        example={{
          code: 'AppRegistry.registerComponent("MyApp", () => AppComponent)'
        }}
        name="static registerComponent"
        typeInfo="(appKey: string, getComponentFunc: ComponentProvider) => void"
      />

      <DocItem
        description={
          <AppText>
            Register a custom render function for an application. The function will receive the{' '}
            <Code>appParameters</Code> passed to <Code>runApplication</Code>.
          </AppText>
        }
        name="static registerRunnable"
        typeInfo="(appKey: string, run: Function) => void"
      />

      <DocItem
        description="Returns all registered app keys"
        name="static getAppKeys"
        typeInfo="() => Array<string>"
      />

      <DocItem
        description={
          <AppText>
            Runs the application that was registered under <Code>appKey</Code>. The{' '}
            <Code>appParameters</Code> must include the <Code>rootTag</Code> into which the
            application is rendered, and optionally any <Code>initialProps</Code>.
          </AppText>
        }
        example={{
          code: `AppRegistry.runApplication('MyApp', {
  initialProps: {},
  rootTag: document.getElementById('react-root')
})`
        }}
        name="static runApplication"
        typeInfo="(appKey: string, appParameters?: object) => void"
      />

      <DocItem
        description={
          <AppText>
            To "stop" an application when a view should be destroyed, call{' '}
            <Code>AppRegistry.unmountApplicationComponentAtRootTag</Code> with the tag that was
            passed into <Code>runApplication</Code>.
          </AppText>
        }
        name="static unmountApplicationComponentAtRootTag"
        typeInfo="(rootTag: HTMLElement) => void"
      />
    </Section>
  </UIExplorer>
);

storiesOf('APIs', module).add('AppRegistry', AppRegistryScreen);
