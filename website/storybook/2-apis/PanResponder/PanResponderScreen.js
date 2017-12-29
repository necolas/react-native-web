/**
 * @flow
 */

import DraggableCircleExample from './examples/DraggableCircle';
import React from 'react';
import UIExplorer, { AppText, Description, DocItem, Section, storiesOf } from '../../ui-explorer';

const PanResponderScreen = () => (
  <UIExplorer title="PanResponder" url="2-apis/PanResponder">
    <Description>
      PanResponder reconciles several touches into a single gesture. It makes single-touch gestures
      resilient to extra touches, and can be used to recognize simple multi-touch gestures. For more
      information, please refer to the React Native{' '}
      <AppText
        accessibilityTraits="link"
        href="https://facebook.github.io/react-native/docs/panresponder.html"
        style={{ color: '#1B95E0' }}
        target="_blank"
      >
        PanResponder documentation
      </AppText>
    </Description>

    <Section title="Examples">
      <DocItem
        example={{
          render: () => <DraggableCircleExample />
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('APIs', module).add('PanResponder', PanResponderScreen);
