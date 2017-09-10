/* eslint-disable react/jsx-no-bind, react/jsx-sort-props */

/**
 * @flow
 */

import { HorizontalExample } from './examples/Horizontal';
import ScrollToExample from './examples/ScrollTo';
import ScrollToEndExample from './examples/ScrollToEnd';
import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
  TextList
} from '../../ui-explorer';

const ScrollViewScreen = () => (
  <UIExplorer title="ScrollView" url="1-components/ScrollView">
    <Description>
      <AppText>
        A scrollable <Code>View</Code> that provides itegration with the touch-locking responder
        system. <Code>ScrollView</Code>'s must have a bounded height: either set the height of the
        view directly (discouraged) or make sure all parent views have bounded height (e.g.,
        transfer <Code>{'{ flex: 1}'}</Code> down the view stack).
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem name="...View props" />

      <DocItem
        name="contentContainerStyle"
        typeInfo="?style"
        description="These styles will be applied to the scroll view content container which wraps all of the child views."
      />

      <DocItem
        name="horizontal"
        typeInfo="?boolean = false"
        description="When true, the scroll view's children are arranged horizontally in a row instead of vertically in a column."
        example={{
          render: () => <HorizontalExample />
        }}
      />

      <DocItem
        name="keyboardDismissMode"
        typeInfo="?enum('none', 'on-drag') = 'none'"
        description={[
          <AppText>
            Determines whether the keyboard gets dismissed in response to a scroll drag.
          </AppText>,
          <TextList
            items={[
              <AppText>
                <Code>none</Code> (the default): drags do not dismiss the keyboard.
              </AppText>,
              <AppText>
                <Code>on-drag</Code>: the keyboard is dismissed when a drag begins.
              </AppText>,
              <AppText>
                <Code>interactive</Code> (not supported on web; same as <Code>none</Code>)
              </AppText>
            ]}
          />
        ]}
      />

      <DocItem
        name="onContentSizeChange"
        typeInfo="?function"
        description={
          <AppText>
            Called when scrollable content view of the <Code>ScrollView</Code> changes. It's
            implemented using the <Code>onLayout</Code> handler attached to the content container
            which this <Code>ScrollView</Code> renders.
          </AppText>
        }
      />

      <DocItem
        name="onScroll"
        typeInfo="?function"
        description={[
          <AppText>
            Fires at most once per frame during scrolling. The frequency of the events can be
            contolled using the <Code>scrollEventThrottle</Code> prop.
          </AppText>,
          <AppText>Invoked on scroll with the following event:</AppText>,
          <Code>{`{
  nativeEvent: {
    contentOffset: { x, y },
    contentSize: { height, width },
    layoutMeasurement: { height, width }
  }
}`}</Code>
        ]}
      />

      <DocItem
        name="scrollEnabled"
        typeInfo="?boolean = true"
        description="When false, the content does not scroll."
      />

      <DocItem
        name="scrollEventThrottle"
        typeInfo="?number = 0"
        description={
          <AppText>
            This controls how often the scroll event will be fired while scrolling (as a time
            interval in ms). A lower number yields better accuracy for code that is tracking the
            scroll position, but can lead to scroll performance problems. The default value is{' '}
            <Code>0</Code>, which means the scroll event will be sent only once each time the view
            is scrolled.
          </AppText>
        }
      />
    </Section>

    <Section title="Instance methods">
      <DocItem
        name="getInnerViewNode"
        typeInfo="() => node"
        description="Returns a reference to the underlying content container DOM node within the ScrollView."
      />

      <DocItem
        name="getScrollableNode"
        typeInfo="() => node"
        description="Returns a reference to the underlying scrollable DOM node."
      />

      <DocItem
        name="getScrollResponder"
        typeInfo="() => ScrollResponder"
        description={
          <AppText>
            Returns a reference to the underlying scroll responder, which supports operations like{' '}
            <Code>scrollTo</Code>. All <Code>ScrollView</Code>-like components should implement this
            method so that they can be composed while providing access to the underlying scroll
            responder's methods.
          </AppText>
        }
      />

      <DocItem
        name="scrollTo"
        typeInfo="(options: { x: number = 0; y: number = 0; animated: boolean = true }) => void"
        description="Scrolls to a given `x`, `y` offset (animation is not currently supported)."
        example={{
          render: () => <ScrollToExample />
        }}
      />

      <DocItem
        name="scrollToEnd"
        typeInfo="(options: { animated: boolean = true }) => void"
        description="Scrolls to the end of the scroll view."
        example={{
          render: () => <ScrollToEndExample />
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('ScrollView', ScrollViewScreen);
