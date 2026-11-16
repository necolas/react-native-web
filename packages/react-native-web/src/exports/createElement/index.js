/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

'use client';

import type { StyleSheetOptions } from '../StyleSheet';

import AccessibilityUtil from '../../modules/AccessibilityUtil';
import createDOMProps from '../../modules/createDOMProps';
import * as React from 'react';
import { LocaleProvider } from '../../modules/useLocale';

const createElement = (
  component: React.ElementType,
  props?: ?Record<string, unknown>,
  options?: ?StyleSheetOptions,
  ...children: ReadonlyArray<React.Node>
): React.Node => {
  // Use equivalent platform elements where possible.
  let accessibilityComponent;
  if (props != null && component?.constructor === String) {
    accessibilityComponent =
      AccessibilityUtil.propsToAccessibilityComponent(props);
  }
  const Component: React.ElementType = accessibilityComponent || component;
  const domProps = createDOMProps(Component, props, options);

  // $FlowFixMe[not-a-function] Flow types React.createElement as an opaque type
  const element = React.createElement(Component, domProps, ...children);

  // Update locale context if element's writing direction prop changes
  const elementWithLocaleProvider = domProps.dir ? (
    <LocaleProvider
      children={element}
      // $FlowFixMe[incompatible-type] dir is not checked to be a writing direction at runtime
      direction={domProps.dir}
      // $FlowFixMe[incompatible-type] lang is not checked to be a string at runtime
      locale={domProps.lang}
    />
  ) : (
    element
  );

  return elementWithLocaleProvider;
};

export default createElement;
