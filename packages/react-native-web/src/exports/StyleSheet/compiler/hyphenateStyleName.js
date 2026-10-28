/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

const uppercasePattern = /[A-Z]/g;
const cache: { [string]: string } = {};

function toHyphenLower(match: string) {
  return '-' + match.toLowerCase();
}

function hyphenateStyleName(name: string): string {
  if (name in cache) {
    return cache[name];
  }

  return (cache[name] = name.replace(uppercasePattern, toHyphenLower));
}

export default hyphenateStyleName;
