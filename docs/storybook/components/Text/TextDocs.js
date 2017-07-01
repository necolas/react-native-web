/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import PropChildren from './examples/PropChildren';
import PropNumberOfLines from './examples/PropNumberOfLines';
import PropOnPress from './examples/PropOnPress';
import React from 'react';
import { storiesOf } from '@kadira/storybook';
import UIExplorer, { AppText, Code, DocItem, StyleList } from '../../ui-explorer';

const stylePropTypes = [
  {
    name: '...View#style'
  },
  {
    name: 'color',
    typeInfo: 'color'
  },
  {
    name: 'fontFamily',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'fontFeatureSettings',
    typeInfo: 'string'
  },
  {
    name: 'fontSize',
    typeInfo: 'number | string'
  },
  {
    name: 'fontStyle',
    typeInfo: 'string'
  },
  {
    name: 'fontWeight',
    typeInfo: 'string'
  },
  {
    name: 'letterSpacing',
    typeInfo: 'string'
  },
  {
    name: 'lineHeight',
    typeInfo: 'string'
  },
  {
    name: 'textAlign',
    typeInfo: 'string'
  },
  {
    name: 'textAlignVertical',
    typeInfo: 'string'
  },
  {
    name: 'textDecorationLine',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'textIndent',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'textOverflow',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'textRendering',
    typeInfo: 'string'
  },
  {
    name: 'textShadowColor',
    typeInfo: 'color'
  },
  {
    name: 'textShadowOffset',
    typeInfo: '{ height: number, width: number }'
  },
  {
    name: 'textShadowRadius',
    typeInfo: 'number | string'
  },
  {
    label: 'web',
    name: 'textTransform',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'unicodeBidi',
    typeInfo: 'string'
  },
  {
    name: 'whiteSpace',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'wordWrap',
    typeInfo: 'string'
  },
  {
    name: 'writingDirection',
    typeInfo: 'string'
  }
];

const sections = [
  {
    title: 'Props',
    entries: [
      <DocItem
        name="accessibilityLabel"
        typeInfo="?string"
        description="Overrides the text that is read by a screen reader when the user interacts with the element. (This is implemented using 'aria-label'.)"
      />,

      <DocItem
        name="accessibilityLiveRegion"
        typeInfo="?enum('assertive', 'none', 'polite')"
        description={
          <AppText>
            Indicates to assistive technologies whether to notify the user when the view changes.
            The values of
            this attribute are expressed in degrees of importance. When regions are specified as{
              ' '
            }
            <Code>polite</Code> (recommended),
            updates take low priority. When regions are specified as <Code>assertive</Code>,
            assistive technologies will
            interrupt and immediately notify the user. (This is implemented using 'aria-live'.)
          </AppText>
        }
      />,

      <DocItem
        label="web"
        name="accessibilityRole"
        typeInfo="?enum(roles)"
        description={
          <AppText>
            Allows assistive technologies to present and support interaction with the view in a
            manner that is
            consistent with user expectations for similar views of that type. For example, marking a
            touchable
            view with an <Code>accessibilityRole</Code> of <Code>button</Code>. For compatibility
            with React
            Native <Code>accessibilityTraits</Code> and <Code>accessibilityComponentType</Code> are
            mapped
            to <Code>accessibilityRole</Code>. (This is implemented using ARIA roles.)
          </AppText>
        }
      />,

      <DocItem
        name="accessible"
        typeInfo="?boolean"
        description={
          <AppText>
            When <Code>true</Code>, indicates that the view is an accessibility element (i.e.,
            focusable) and
            groups its child content. By default, all the touchable elements and elements
            with <Code>accessibilityRole</Code> of <Code>button</Code> and <Code>link</Code> are
            accessible.
            (This is implemented using 'tabindex'.)
          </AppText>
        }
      />,

      <DocItem
        name="children"
        typeInfo="?any"
        description={`Child content. Nested text components will inherit the styles of their parents
(only backgroundColor is inherited from non-Text parents). <Text>
only supports other <Text> and raw text (strings) as children.`}
        example={{
          code: '',
          render: () => <PropChildren />
        }}
      />,

      <DocItem
        name="importantForAccessibility"
        typeInfo="?enum('auto', 'no', 'no-hide-descendants', 'yes')"
        description={
          'A value of `no` will remove the element from the tab flow.\n\nA value of `no-hide-descendants` will hide the element and its children from assistive technologies. (This is implemented using `aria-hidden`.)'
        }
      />,

      <DocItem
        name="numberOfLines"
        typeInfo="?number"
        description="Truncates the text with an ellipsis after this many lines. Currently only supports `1`."
        example={{
          code: '',
          render: () => <PropNumberOfLines />
        }}
      />,

      <DocItem
        name="onLayout"
        typeInfo="?function"
        description="Invoked on mount and layout changes with `{ nativeEvent: { layout: { x, y, width, height } } }`, where `x` and `y` are the offsets from the parent node."
      />,

      <DocItem
        name="onPress"
        typeInfo="?function"
        description="Called when the Text is pressed"
        example={{
          code: '',
          render: () => <PropOnPress />
        }}
      />,

      <DocItem
        name="selectable"
        typeInfo="?boolean"
        description="When `false`, the text is not selectable."
      />,

      <DocItem
        name="style"
        typeInfo="?style"
        description={<StyleList stylePropTypes={stylePropTypes} />}
      />,

      <DocItem
        name="testID"
        typeInfo="?string"
        description="Used to locate this view in end-to-end tests. The test ID is rendered to a `data-testid` DOM attribute"
      />
    ]
  }
];

storiesOf('Components', module).add('Text', () =>
  <UIExplorer
    description={[
      <AppText>
        Text is component for displaying text. It supports style, basic touch handling, and inherits
        typographic
        styles from ancestor elements.
      </AppText>,
      <AppText>
        Text is unique relative to layout: child elements use text layout ("inline") rather than
        flexbox layout.
        This means that elements inside of a Text are not rectangles, as they wrap when reaching the
        edge of
        their container.
      </AppText>,
      <AppText>NOTE: Text will transfer all other props to the rendered HTML element.</AppText>
    ]}
    sections={sections}
    title="Text"
    url="components/Text"
  />
);
