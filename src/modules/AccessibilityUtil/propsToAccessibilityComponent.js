/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import propsToAriaRole from './propsToAriaRole';

const roleComponents = {
  article: 'article',
  banner: 'header',
  button: 'button',
  complementary: 'aside',
  contentinfo: 'footer',
  form: 'form',
  link: 'a',
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  region: 'section'
};

const emptyObject = {};

const propsToAccessibilityComponent = (props = emptyObject) => {
  const role = propsToAriaRole(props);
  if (role === 'heading') {
    const level = props['aria-level'] || 1;
    return `h${level}`;
  }
  return roleComponents[role];
};

export default propsToAccessibilityComponent;
