/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import React from 'react';
import PropChildren from './examples/PropChildren';
import UIExplorer, { Description, DocItem, Section, storiesOf } from '../../ui-explorer';

const ImageBackgroundScreen = () => (
  <UIExplorer title="ImageBackground" url="1-components/ImageBackground">
    <Description>A image component with support for child content.</Description>

    <Section title="Props">
      <DocItem name="...Image props" />

      <DocItem
        name="children"
        typeInfo="?any"
        description="Content to display over the image."
        example={{
          render: () => <PropChildren />
        }}
      />

      <DocItem name="imageStyle" typeInfo="?style" description="Styles for the inner image." />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('ImageBackground', ImageBackgroundScreen);
