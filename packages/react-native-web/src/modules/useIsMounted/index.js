/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import * as React from 'react';

export default function useIsMounted(): () => boolean {
  const ref = React.useRef(false);

  React.useEffect(() => {
    ref.current = true;

    return () => {
      ref.current = false;
    };
  }, []);

  return React.useCallback(() => ref.current, [ref]);
}
