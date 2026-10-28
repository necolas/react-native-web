/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { getSystemColor } from '../../modules/systemColors';
import normalizeColor from '../StyleSheet/compiler/normalizeColor';

type Arg = string | { fallback: string };

/**
 * Returns the first name that is a CSS system color.
 * Newer system colors resolve to CSS custom properties, so the browser skips
 * the ones it does not support.
 */
export default function PlatformColor(...args: Array<Arg>): void | string {
  const lastArg = args[args.length - 1];
  const options = typeof lastArg === 'object' ? lastArg : null;

  const fallback =
    options != null && typeof options.fallback === 'string'
      ? normalizeColor(options.fallback)
      : undefined;

  if (process.env.NODE_ENV !== 'production') {
    const leadingArgs = args.slice(0, -1);
    if (leadingArgs.some((arg) => arg != null && typeof arg === 'object')) {
      console.error(
        'PlatformColor: an options object is only honored as the final argument; one in any other position is ignored.'
      );
    }
    if (options != null && typeof options.fallback !== 'string') {
      console.error(
        'PlatformColor: the trailing options object must be of the form {fallback: string}; it is ignored.'
      );
    } else if (options != null && fallback == null) {
      console.error(
        `PlatformColor: the fallback "${options.fallback}" is not a valid color; it is ignored.`
      );
    }
  }

  return args.reduceRight(
    (color: void | string, arg) =>
      (typeof arg === 'string' ? getSystemColor(arg, color) : null) ?? color,
    fallback
  );
}
