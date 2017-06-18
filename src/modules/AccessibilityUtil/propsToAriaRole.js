/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
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

const propsToAriaRole = ({
  accessibilityComponentType,
  accessibilityRole,
  accessibilityTraits
}) => {
  if (accessibilityRole) {
    return accessibilityRole;
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
