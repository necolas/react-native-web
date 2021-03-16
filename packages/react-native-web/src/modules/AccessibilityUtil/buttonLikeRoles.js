/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const buttonLikeRoles: { [string]: boolean } = {
  // ARIA button behaves like native 'button' element
  button: true,
  // ARIA menuitem responds to Enter/Space like a button. Spec requires AT to
  // ignore ARIA roles of any children.
  // https://www.w3.org/WAI/GL/wiki/Using_ARIA_menus
  menuitem: true,
  menuitemcheckbox: true,
  menuitemradio: true
};

export default buttonLikeRoles;

export function isButtonLikeRole(role: string) {
  return !!buttonLikeRoles[role];
}
