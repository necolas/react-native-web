/**
 * @flow
 */

import React from 'react';
import UIExplorer, { AppText, Description, DocItem, Section, storiesOf } from '../../ui-explorer';

import ShowHideExample from './examples/ShowHide';

const ModalScreen = () => (
  <UIExplorer title="Modal" url="1-components/Modal">
    <Description>
      <AppText>Description coming soon...</AppText>
    </Description>

    <Section title="Props">
      <DocItem
        example={{
          render: () => <ShowHideExample />
        }}
        name="visible"
        typeInfo="?bool"
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('Modal', ModalScreen);
