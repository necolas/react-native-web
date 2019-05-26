import UIExplorer, { Description, DocItem, Section, storiesOf } from '../../ui-explorer';

import React from 'react';
import AlertExample from './examples/AlertExample';

const AlertScreen = () => (
  <UIExplorer title="Alert" url="2-apis/Alert">
    <Description>This is the description</Description>

    <Section title="Methods">
      <DocItem
        example={{
          render: () => <AlertExample />
        }}
        name="static alert"
        typeInfo="(title: string, message: string, options: [alertOption], type: {cancelable: boolean})"
      />
    </Section>
  </UIExplorer>
);

storiesOf('APIs', module).add('Alert', AlertScreen);
