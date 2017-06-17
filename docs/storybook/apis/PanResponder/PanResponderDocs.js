/**
 * @flow
 */

import DraggableCircleExample from './examples/DraggableCircle';
import { storiesOf } from '@kadira/storybook';
import React from 'react';
import UIExplorer, { AppText, DocItem } from '../../ui-explorer';

const sections = [
  {
    title: 'Examples',
    entries: [
      <DocItem
        example={{
          render: () => <DraggableCircleExample />
        }}
      />
    ]
  }
];

storiesOf('APIs', module).add('PanResponder', () =>
  <UIExplorer
    description={
      <AppText>
        PanResponder reconciles several touches into a single gesture. It makes single-touch
        gestures resilient to extra touches, and can be used to recognize simple multi-touch
        gestures. For more information, please refer to the React Native{' '}
        <AppText
          accessibilityTraits="link"
          href="https://facebook.github.io/react-native/docs/panresponder.html"
          style={{ color: '#1B95E0' }}
          target="_blank"
        >
          PanResponder documentation
        </AppText>
      </AppText>
    }
    sections={sections}
    title="PanResponder"
    url="apis/PanResponder"
  />
);
