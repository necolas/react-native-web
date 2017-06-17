/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import React from 'react';
import PropHitSlop from './examples/PropHitSlop';
import { storiesOf } from '@kadira/storybook';
import UIExplorer, { AppText, Code, DocItem } from '../../ui-explorer';

const sections = [
  {
    title: 'Props',
    entries: [
      <DocItem name="...View props" />,

      <DocItem
        name="delayLongPress"
        typeInfo="?number"
        description={
          <AppText>
            Delay in ms, from <Code>onPressIn</Code>, before <Code>onLongPress</Code> is called.
          </AppText>
        }
      />,

      <DocItem
        name="delayPressIn"
        typeInfo="?number"
        description={
          <AppText>
            Delay in ms, from the start of the touch, before <Code>onPressIn</Code> is called.
          </AppText>
        }
      />,

      <DocItem
        name="delayPressOut"
        typeInfo="?number"
        description={
          <AppText>
            Delay in ms, from the release of the touch, before <Code>onPressOut</Code> is called.
          </AppText>
        }
      />,

      <DocItem
        name="disabled"
        typeInfo="?boolean"
        description={
          <AppText>If <Code>true</Code>, disable all interactions for this component.</AppText>
        }
      />,

      <DocItem name="onLongPress" typeInfo="?function" />,

      <DocItem
        name="onPress"
        typeInfo="?function"
        description="Called when the touch is released, but not if cancelled (e.g. by a scroll that steals the responder lock)."
      />,

      <DocItem name="onPressIn" typeInfo="?function" />,

      <DocItem name="onPressOut" typeInfo="?function" />,

      <DocItem
        name="pressRetentionOffset"
        typeInfo="?{top: number, left: number, bottom: number, right: number}"
        description={`When the scroll view is disabled, this defines how far your touch may move off
of the button, before deactivating the button. Once deactivated, try moving it
back and you'll see that the button is once again reactivated! Move it back and
forth several times while the scroll view is disabled. Ensure you pass in a
constant to reduce memory allocations.`}
      />,

      <DocItem name="style" typeInfo="?style" />
    ]
  },

  {
    title: 'More examples',
    entries: [<DocItem description="Hit slop" example={{ render: () => <PropHitSlop /> }} />]
  }
];

storiesOf('Components', module).add('TouchableWithoutFeedback', () =>
  <UIExplorer
    description={[
      <AppText>
        Do not use unless you have a very good reason. All the elements that respond to
        press should have a visual feedback when touched. This is one of the primary
        reason a "web" app doesn't feel "native".
      </AppText>,
      <AppText>
        NOTE: <Code>TouchableWithoutFeedback</Code> supports only one child. If you wish to have
        several child components, wrap them in a <Code>View</Code>.
      </AppText>
    ]}
    sections={sections}
    title="TouchableWithoutFeedback"
    url="components/Touchable"
  />
);
