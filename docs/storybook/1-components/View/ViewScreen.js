/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import PropPointerEvents from './examples/PropPointerEvents';
import transformExamples from './examples/transforms';
import ZIndexExample from './examples/ZIndex';
import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  ExternalLink,
  Section,
  storiesOf,
  StyleList
} from '../../ui-explorer';

const ViewScreen = () => (
  <UIExplorer title="View" url="1-components/View">
    <Description>
      <AppText>
        View is the fundamental UI building block. It is a component that supports style, layout
        with flexbox, and accessibility controls. It can be nested inside another View and has
        0-to-many children of any type.
      </AppText>
      <AppText>
        Also, refer to React Native's documentation about the Gesture Responder System. NOTE: View
        will transfer all other props to the rendered HTML element.
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="accessibilityLabel"
        typeInfo="?string"
        description="Overrides the text that's read by a screen reader when the user interacts with the element. (This is implemented using 'aria-label'.)"
      />

      <DocItem
        name="accessibilityLiveRegion"
        typeInfo="?enum('assertive', 'none', 'polite')"
        description={
          <AppText>
            Indicates to assistive technologies whether to notify the user when the view changes.
            The values of this attribute are expressed in degrees of importance. When regions are
            specified as <Code>polite</Code> (recommended), updates take low priority. When regions
            are specified as <Code>assertive</Code>, assistive technologies will interrupt and
            immediately notify the user. (This is implemented using 'aria-live'.)
          </AppText>
        }
      />

      <DocItem
        label="web"
        name="accessibilityRole"
        typeInfo="?enum(roles)"
        description={
          <AppText>
            Allows assistive technologies to present and support interaction with the view in a
            manner that is consistent with user expectations for similar views of that type. For
            example, marking a touchable view with an <Code>accessibilityRole</Code> of{' '}
            <Code>button</Code>. For compatibility with React Native{' '}
            <Code>accessibilityTraits</Code> and <Code>accessibilityComponentType</Code> are mapped
            to <Code>accessibilityRole</Code>. (This is implemented using ARIA roles.)
          </AppText>
        }
      />

      <DocItem
        name="accessible"
        typeInfo="?boolean"
        description={
          <AppText>
            When <Code>true</Code>, indicates that the view is an accessibility element (i.e.,
            focusable) and groups its child content. By default, all the touchable elements and
            elements with <Code>accessibilityRole</Code> of <Code>button</Code> and{' '}
            <Code>link</Code> are accessible. (This is implemented using 'tabindex'.)
          </AppText>
        }
      />

      <DocItem name="children" typeInfo="?element" description="Child content" />

      <DocItem
        name="hitSlop"
        typeInfo="?object"
        description={[
          <AppText>
            This defines how far a touch event can start away from the view (in pixels). Typical
            interface guidelines recommend touch targets that are at least 30 - 40
            points/density-independent pixels.
          </AppText>,
          <AppText>
            For example, if a touchable view has a height of <Code>20</Code> the touchable height
            can be extended to <Code>40</Code> with hitSlop.
          </AppText>
        ]}
        example={{
          code: '<View hitSlop={{top: 10, bottom: 10, left: 0, right: 0}} />'
        }}
      />

      <DocItem
        name="importantForAccessibility"
        typeInfo="?enum('auto', 'no', 'no-hide-descendants', 'yes')"
        description={[
          <AppText>
            A value of <Code>no</Code> will remove the element from the tab flow.
          </AppText>,
          <AppText>
            A value of <Code>no-hide-descendants</Code> will hide the element and its children from
            assistive technologies. (This is implemented using 'aria-hidden'.)
          </AppText>
        ]}
      />

      <DocItem
        name="onLayout"
        typeInfo="?function"
        description={
          <AppText>
            Invoked on mount and layout changes with{' '}
            <Code>{'{ nativeEvent: { layout: { x, y, width, height } } }'}</Code>, where{' '}
            <Code>x</Code> and <Code>y</Code> are the offsets from the parent node.
          </AppText>
        }
      />

      <DocItem
        name="onMoveShouldSetResponder"
        typeInfo="?function => boolean"
        description={
          <AppText>
            Does this view want to "claim" touch responsiveness? This is called for every touch move
            on the <Code>View</Code> when it is not the responder.
          </AppText>
        }
      />

      <DocItem
        name="onMoveShouldSetResponderCapture"
        typeInfo="?function => boolean"
        description={
          <AppText>
            If a parent <Code>View</Code> wants to prevent a child <Code>View</Code> from becoming
            responder on a move, it should have this handler return <Code>true</Code>.
          </AppText>
        }
      />

      <DocItem
        name="onResponderGrant"
        typeInfo="?function"
        description={
          <AppText>
            The <Code>View</Code> is now responding to touch events. This is the time to highlight
            and show the user what is happening. For most touch interactions, you'll simply want to
            wrap your component in <Code>TouchableHighlight</Code> or <Code>TouchableOpacity</Code>.
          </AppText>
        }
      />

      <DocItem
        name="onResponderMove"
        typeInfo="?function"
        description="The user is moving their finger."
      />

      <DocItem
        name="onResponderReject"
        typeInfo="?function"
        description={
          <AppText>
            Another responder is already active and will not release it to the <Code>View</Code>{' '}
            asking to be the responder.
          </AppText>
        }
      />

      <DocItem
        name="onResponderRelease"
        typeInfo="?function"
        description="Fired at the end of the touch."
      />

      <DocItem
        name="onResponderTerminate"
        typeInfo="?function"
        description={
          <AppText>
            The responder has been taken from the <Code>View</Code>.
          </AppText>
        }
      />

      <DocItem
        name="onResponderTerminationRequest"
        typeInfo="?function"
        description={
          <AppText>
            Some other <Code>View</Code> wants to become responder and is asking this{' '}
            <Code>View</Code> to release its responder. Returning <Code>true</Code> allows its
            release.
          </AppText>
        }
      />

      <DocItem
        name="onStartShouldSetResponder"
        typeInfo="?function => boolean"
        description="Does this view want to become responder on the start of a touch?"
      />

      <DocItem
        name="onStartShouldSetResponderCapture"
        typeInfo="?function => boolean"
        description={
          <AppText>
            If a parent <Code>View</Code> wants to prevent a child <Code>View</Code> from becoming
            the responder on a touch start, it should have this handler return <Code>true</Code>.
          </AppText>
        }
      />

      <DocItem
        name="pointerEvents"
        typeInfo="?enum('auto', 'box-only', 'box-none', 'none') = 'auto'"
        description={
          <AppText>
            Controls whether the View can be the target of touch events. The enhanced{' '}
            <Code>pointerEvents</Code> modes provided are not part of the CSS spec, therefore,{' '}
            <Code>pointerEvents</Code> is excluded from <Code>style</Code>. <Code>box-none</Code>{' '}
            preserves pointer events on the element's children; <Code>box-only</Code> disables
            pointer events on the element's children.
          </AppText>
        }
        example={{
          render: () => <PropPointerEvents />
        }}
      />

      <DocItem
        name="style"
        typeInfo="?style"
        description={<StyleList stylePropTypes={stylePropTypes} />}
      />

      <DocItem
        name="testID"
        typeInfo="?string"
        description="Used to locate this view in end-to-end tests. The test ID is rendered to a 'data-testid' DOM attribute"
      />

      <DocItem
        label="compat"
        name="accessibilityComponentType"
        typeInfo="?enum(roles)"
        description={
          <AppText>
            (For compatibility with React Native. Equivalent to <Code>accessibilityRole</Code>.)
          </AppText>
        }
      />

      <DocItem
        label="compat"
        name="accessibilityTraits"
        typeInfo="?enum(roles) | Array<role>"
        description={
          <AppText>
            (For compatibility with React Native. Equivalent to <Code>accessibilityRole</Code>.)
          </AppText>
        }
      />
    </Section>

    <Section title="More examples">
      <DocItem
        description="z-index"
        example={{
          render: () => <ZIndexExample />
        }}
      />
      {transformExamples.map(({ title, render }, i) => (
        <DocItem description={title} key={i} example={{ render }} />
      ))}
    </Section>
  </UIExplorer>
);

const stylePropTypes = [
  {
    label: 'web',
    name: (
      <ExternalLink href="https://drafts.csswg.org/css-variables/">Custom properties</ExternalLink>
    )
  },
  {
    name: 'alignContent',
    typeInfo: 'string'
  },
  {
    name: 'alignItems',
    typeInfo: 'string'
  },
  {
    name: 'alignSelf',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'animationDelay',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'animationDirection',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'animationDuration',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'animationFillMode',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'animationName',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'animationIterationCount',
    typeInfo: 'number | "infinite"'
  },
  {
    label: 'web',
    name: 'animationPlayState',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'animationTimingFunction',
    typeInfo: 'string'
  },
  {
    name: 'backfaceVisibility',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'backgroundAttachment',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'backgroundBlendMode',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'backgroundClip',
    typeInfo: 'string'
  },
  {
    name: 'backgroundColor',
    typeInfo: 'color'
  },
  {
    label: 'web',
    name: 'backgroundImage',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'backgroundOrigin',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'backgroundPosition',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'backgroundRepeat',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'backgroundSize',
    typeInfo: 'string'
  },
  {
    name: 'borderColor',
    typeInfo: 'color'
  },
  {
    name: 'borderTopColor',
    typeInfo: 'color'
  },
  {
    name: 'borderBottomColor',
    typeInfo: 'color'
  },
  {
    name: 'borderRightColor',
    typeInfo: 'color'
  },
  {
    name: 'borderLeftColor',
    typeInfo: 'color'
  },
  {
    name: 'borderRadius',
    typeInfo: 'number | string'
  },
  {
    name: 'borderTopLeftRadius',
    typeInfo: 'number | string'
  },
  {
    name: 'borderTopRightRadius',
    typeInfo: 'number | string'
  },
  {
    name: 'borderBottomLeftRadius',
    typeInfo: 'number | string'
  },
  {
    name: 'borderBottomRightRadius',
    typeInfo: 'number | string'
  },
  {
    name: 'borderStyle',
    typeInfo: 'string'
  },
  {
    name: 'borderTopStyle',
    typeInfo: 'string'
  },
  {
    name: 'borderRightStyle',
    typeInfo: 'string'
  },
  {
    name: 'borderBottomStyle',
    typeInfo: 'string'
  },
  {
    name: 'borderLeftStyle',
    typeInfo: 'string'
  },
  {
    name: 'borderWidth',
    typeInfo: 'number | string'
  },
  {
    name: 'borderBottomWidth',
    typeInfo: 'number | string'
  },
  {
    name: 'borderLeftWidth',
    typeInfo: 'number | string'
  },
  {
    name: 'borderRightWidth',
    typeInfo: 'number | string'
  },
  {
    name: 'borderTopWidth',
    typeInfo: 'number | string'
  },
  {
    name: 'bottom',
    typeInfo: 'number | string'
  },
  {
    label: 'web',
    name: 'boxShadow',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'boxSizing',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'clip',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'cursor',
    typeInfo: 'string'
  },
  {
    name: 'direction',
    typeInfo: 'string'
  },
  {
    name: 'display',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'filter',
    typeInfo: 'string'
  },
  {
    name: 'flex',
    typeInfo: 'number'
  },
  {
    name: 'flexBasis',
    typeInfo: 'string'
  },
  {
    name: 'flexDirection',
    typeInfo: 'string'
  },
  {
    name: 'flexGrow',
    typeInfo: 'number'
  },
  {
    name: 'flexShrink',
    typeInfo: 'number'
  },
  {
    name: 'flexWrap',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'gridAutoColumns',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'gridAutoFlow',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'gridAutoRows',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'gridColumnEnd',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'gridColumnGap',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'gridColumnStart',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'gridRowEnd',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'gridRowGap',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'gridRowStart',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'gridTemplateColumns',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'gridTemplateRows',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'gridTemplateAreas',
    typeInfo: 'string'
  },
  {
    name: 'height',
    typeInfo: 'number | string'
  },
  {
    name: 'justifyContent',
    typeInfo: 'string'
  },
  {
    name: 'left',
    typeInfo: 'number | string'
  },
  {
    name: 'margin',
    typeInfo: 'number | string'
  },
  {
    name: 'marginBottom',
    typeInfo: 'number | string'
  },
  {
    name: 'marginHorizontal',
    typeInfo: 'number | string'
  },
  {
    name: 'marginLeft',
    typeInfo: 'number | string'
  },
  {
    name: 'marginRight',
    typeInfo: 'number | string'
  },
  {
    name: 'marginTop',
    typeInfo: 'number | string'
  },
  {
    name: 'marginVertical',
    typeInfo: 'number | string'
  },
  {
    name: 'maxHeight',
    typeInfo: 'number | string'
  },
  {
    name: 'maxWidth',
    typeInfo: 'number | string'
  },
  {
    name: 'minHeight',
    typeInfo: 'number | string'
  },
  {
    name: 'minWidth',
    typeInfo: 'number | string'
  },
  {
    name: 'opacity',
    typeInfo: 'number'
  },
  {
    name: 'order',
    typeInfo: 'number'
  },
  {
    label: 'web',
    name: 'outline',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'outlineColor',
    typeInfo: 'color'
  },
  {
    name: 'overflow',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'overflowX',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'overflowY',
    typeInfo: 'string'
  },
  {
    name: 'padding',
    typeInfo: 'number | string'
  },
  {
    name: 'paddingBottom',
    typeInfo: 'number | string'
  },
  {
    name: 'paddingHorizontal',
    typeInfo: 'number | string'
  },
  {
    name: 'paddingLeft',
    typeInfo: 'number | string'
  },
  {
    name: 'paddingRight',
    typeInfo: 'number | string'
  },
  {
    name: 'paddingTop',
    typeInfo: 'number | string'
  },
  {
    name: 'paddingVertical',
    typeInfo: 'number | string'
  },
  {
    label: 'web',
    name: 'perspective',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'perspectiveOrigin',
    typeInfo: 'string'
  },
  {
    name: 'position',
    typeInfo: 'string'
  },
  {
    name: 'right',
    typeInfo: 'number | string'
  },
  {
    name: 'shadowColor',
    typeInfo: 'color'
  },
  {
    name: 'shadowOffset',
    typeInfo: '{ height: number | string, width: number | string }'
  },
  {
    name: 'shadowOpacity',
    typeInfo: 'number'
  },
  {
    name: 'shadowRadius',
    typeInfo: 'number | string'
  },
  {
    label: 'web',
    name: 'touchAction',
    typeInfo: 'string'
  },
  {
    name: 'top',
    typeInfo: 'number | string'
  },
  {
    name: 'transform',
    typeInfo: 'array'
  },
  {
    label: 'web',
    name: 'transformOrigin',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'transitionDelay',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'transitionDuration',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'transitionProperty',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'transitionTimingFunction',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'userSelect',
    typeInfo: 'string'
  },
  {
    label: 'web',
    name: 'visibility',
    typeInfo: 'string'
  },
  {
    name: 'width',
    typeInfo: 'number | string'
  },
  {
    label: 'web',
    name: 'willChange',
    typeInfo: 'string'
  },
  {
    name: 'zIndex',
    typeInfo: 'number'
  }
];

storiesOf('Components', module).add('View', ViewScreen);
