/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { localizeStyle } from 'styleq/transform-localize-style';
import { styleq } from 'styleq';

type StyleProps = [string, { [key: string]: mixed } | null];
type Options = { writingDirection: 'ltr' | 'rtl' };

function customStyleq(styles, isRTL) {
  return styleq.factory({
    transform(style) {
      return localizeStyle(style, isRTL);
    }
  })(styles);
}

export default function StyleSheet(
  styles: $ReadOnlyArray<any>,
  options?: Options
): StyleProps {
  const isRTL = options != null && options.writingDirection === 'rtl';
  const styleProps: StyleProps = customStyleq(styles, isRTL);
  // inline styles are not processed in any way
  return styleProps;
}
