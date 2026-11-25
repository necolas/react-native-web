/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import * as React from 'react';

import AccessibilityUtil from '../../modules/AccessibilityUtil';
import createDOMProps from '../../modules/createDOMProps';
import type { Nullable } from '../../types';

const createElement = (
  component: React.ElementType,
  props?: Nullable<Record<string, unknown>>,
  ...children: ReadonlyArray<React.ReactNode>
): React.ReactNode => {
  // Use equivalent platform elements where possible.
  let accessibilityComponent;
  if (props != null && component?.constructor === String) {
    accessibilityComponent =
      AccessibilityUtil.propsToAccessibilityComponent(props);
  }
  const Component = accessibilityComponent || component;
  const domProps = createDOMProps(Component, props);
  return React.createElement(Component, domProps, ...children);
};

export default createElement;
