/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import {
  type ElementType,
  type ReactNode,
  createElement as reactCreateElement
} from 'react';

import AccessibilityUtil from '../../modules/AccessibilityUtil';
import createDOMProps from '../../modules/createDOMProps';
import { LocaleProvider } from '../../modules/useLocale';
import type { StyleSheetOptions } from '../StyleSheet';

const createElement = (
  component: ElementType,
  props?: Record<string, unknown> | null,
  options?: StyleSheetOptions,
  ...children: ReadonlyArray<ReactNode>
): ReactNode => {
  // Use equivalent platform elements where possible.
  let accessibilityComponent;
  if (props != null && component?.constructor === String) {
    accessibilityComponent =
      AccessibilityUtil.propsToAccessibilityComponent(props);
  }
  const Component = accessibilityComponent || component;
  const domProps = createDOMProps(Component, props, options);
  const element = reactCreateElement(Component, domProps, ...children);

  // Update locale context if element's writing direction prop changes
  const elementWithLocaleProvider = domProps.dir ? (
    <LocaleProvider
      children={element}
      direction={domProps.dir}
      locale={domProps.lang}
    />
  ) : (
    element
  );

  return elementWithLocaleProvider;
};

export default createElement;
