/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const accessibilityComponentTypeToRole = {
  button: 'button',
  none: 'presentation'
};

const accessibilityTraitsToRole = {
  adjustable: 'slider',
  button: 'button',
  header: 'heading',
  image: 'img',
  link: 'link',
  none: 'presentation',
  search: 'search',
  summary: 'region'
};

// 'false' value indicates role doesn't map to ARIA role
const accessibilityRoleToWeb = {
  adjustable: 'slider',
  button: 'button',
  header: 'heading',
  image: 'img',
  imagebutton: false,
  keyboardkey: false,
  label: false,
  link: 'link',
  none: 'presentation',
  search: 'search',
  summary: 'region',
  text: false
};

/**
 * Provides compatibility with React Native's "accessibilityTraits" (iOS) and
 * "accessibilityComponentType" (Android), converting them to equivalent ARIA
 * roles.
 */
const propsToAriaRole = ({
  accessibilityComponentType,
  accessibilityRole,
  accessibilityTraits
}: Object) => {
  if (accessibilityRole) {
    const inferredRole = accessibilityRoleToWeb[accessibilityRole];
    if (inferredRole !== false) {
      // ignore roles that don't map to web
      return inferredRole || accessibilityRole;
    }
  }
  if (accessibilityTraits) {
    const trait = Array.isArray(accessibilityTraits) ? accessibilityTraits[0] : accessibilityTraits;
    return accessibilityTraitsToRole[trait];
  }
  if (accessibilityComponentType) {
    return accessibilityComponentTypeToRole[accessibilityComponentType];
  }
};

export default propsToAriaRole;
