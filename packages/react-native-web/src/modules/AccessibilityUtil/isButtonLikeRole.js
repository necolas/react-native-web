/**
 * Copyright (c) 2017-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const buttonLikeRoles: { [string]: boolean } = {
  button: true,
  menuitem: true
};

export default (role: string) => !!buttonLikeRoles[role];
