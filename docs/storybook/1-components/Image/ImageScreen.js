/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import React from 'react';
import PropChildren from './examples/PropChildren';
import PropDefaultSource from './examples/PropDefaultSource';
import PropDraggable from './examples/PropDraggable';
import PropOnError from './examples/PropOnError';
import PropOnLoad from './examples/PropOnLoad';
import PropOnLoadEnd from './examples/PropOnLoadEnd';
import PropOnLoadStart from './examples/PropOnLoadStart';
import PropResizeMode from './examples/PropResizeMode';
import PropSource from './examples/PropSource';
import StaticGetSizeExample from './examples/StaticGetSize';
import StaticPrefetchExample from './examples/StaticPrefetch';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf
} from '../../ui-explorer';

const ImageScreen = () => (
  <UIExplorer title="Image" url="1-components/Image">
    <Description>
      An accessibile image component with support for image resizing, default image, and child
      content.
    </Description>

    <Section title="Props">
      <DocItem name="...View props" />

      <DocItem
        name="children"
        typeInfo="?any"
        description="Content to display over the image."
        example={{
          render: () => <PropChildren />
        }}
      />

      <DocItem
        name="defaultSource"
        typeInfo="?object"
        description={
          <AppText>
            An image to display as a placeholder while downloading the final image off the network.{' '}
            <Code>{'{ uri: string, width, height }'}</Code>
          </AppText>
        }
        example={{
          render: () => <PropDefaultSource />
        }}
      />

      <DocItem
        label="web"
        name="draggable"
        typeInfo="?boolean = true"
        description="When false, the image will not be draggable"
        example={{
          render: () => <PropDraggable />
        }}
      />

      <DocItem
        name="onError"
        typeInfo="?function"
        description={
          <AppText>
            Invoked on load error with <Code>{'{nativeEvent: {error}}'}</Code>.
          </AppText>
        }
        example={{
          render: () => <PropOnError />
        }}
      />

      <DocItem
        name="onLoad"
        typeInfo="?function"
        description="Invoked when load completes successfully."
        example={{
          render: () => <PropOnLoad />
        }}
      />

      <DocItem
        name="onLoadEnd"
        typeInfo="?function"
        description="Invoked when load either succeeds or fails."
        example={{
          render: () => <PropOnLoadEnd />
        }}
      />

      <DocItem
        name="onLoadStart"
        typeInfo="?function"
        description="Invoked on load start."
        example={{
          render: () => <PropOnLoadStart />
        }}
      />

      <DocItem
        name="resizeMode"
        typeInfo="?enum('center', 'contain', 'cover', 'none', 'repeat', 'stretch') = 'cover';"
        description="Determines how to resize the image when the frame doesn't match the raw image dimensions."
        example={{
          render: () => <PropResizeMode />
        }}
      />

      <DocItem
        name="source"
        typeInfo="?object"
        description={
          <AppText>
            <Code>uri</Code> is a string representing the resource identifier for the image, which
            could be an http address or a base64 encoded image.{' '}
            <Code>{'{ uri: string, width, height }'}</Code>
          </AppText>
        }
        example={{
          render: () => <PropSource />
        }}
      />

      <DocItem name="style" typeInfo="?style" />
    </Section>

    <Section title="Properties">
      <DocItem
        name="static resizeMode"
        typeInfo="object"
        example={{
          code: '<Image resizeMode={Image.resizeMode.contain} />'
        }}
      />
    </Section>

    <Section title="Methods">
      <DocItem
        name="static getSize"
        typeInfo="(uri: string, success: (width, height) => {}, failure: function) => void"
        description={[
          <AppText key={1}>
            Retrieve the width and height (in pixels) of an image prior to displaying it. This
            method can fail if the image cannot be found, or fails to download.
          </AppText>,
          <AppText key={2}>
            (In order to retrieve the image dimensions, the image may first need to be loaded or
            downloaded, after which it will be cached. This means that in principle you could use
            this method to preload images, however it is not optimized for that purpose, and may in
            future be implemented in a way that does not fully load/download the image data.)
          </AppText>
        ]}
        example={{
          render: () => <StaticGetSizeExample />
        }}
      />

      <DocItem
        name="static prefetch"
        typeInfo="(url: string) => Promise"
        description="Prefetches a remote image for later use by downloading it."
        example={{
          render: () => <StaticPrefetchExample />
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('Image', ImageScreen);
