/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import propsToAriaRole from './propsToAriaRole';

const roleComponents = {
  article: 'article',
  banner: 'header',
  complementary: 'aside',
  contentinfo: 'footer',
  form: 'form',
  label: 'label',
  link: 'a',
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  region: 'section'
};

const emptyObject = {};

const propsToAccessibilityComponent = (props: Object = emptyObject) => {
  const role = propsToAriaRole(props);
  if (role) {
    if (role === 'heading') {
      const level = props['aria-level'] || 1;
      return `h${level}`;
    }
    return roleComponents[role];
  }
};

export default propsToAccessibilityComponent;
