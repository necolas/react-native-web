/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import RTLToggle from './examples/RTLToggle';
import React from 'react';
import UIExplorer, { Description, DocItem, Section, storiesOf } from '../../ui-explorer';

const I18nManagerScreen = () => (
  <UIExplorer title="I18nManager" url="2-apis/I18nManager">
    <Description>Control and set the layout and writing direction of the application.</Description>
    <Section title="Properties">
      <DocItem
        name="isRTL"
        typeInfo="boolean = false"
        description="Whether the application is currently in RTL mode."
      />
    </Section>

    <Section title="Methods">
      <DocItem
        name="static allowRTL"
        typeInfo="(allowRTL: boolean) => void"
        description="Allow the application to display in RTL mode."
      />

      <DocItem
        name="static forceRTL"
        typeInfo="(forceRTL: boolean) => void"
        description="Force the application to display in RTL mode."
      />

      <DocItem
        label="web"
        name="static setPreferredLanguageRTL"
        typeInfo="(isRTL: boolean) => void"
        description="Set the application's preferred writing direction to RTL. You will need to determine the user's preferred locale server-side (from HTTP headers) and decide whether it's an RTL language."
      />
    </Section>

    <Section title="Examples">
      <DocItem
        description="Toggling LTR/RTL layout at runtime"
        example={{
          render: () => <RTLToggle />
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('APIs', module).add('I18nManager', I18nManagerScreen);
