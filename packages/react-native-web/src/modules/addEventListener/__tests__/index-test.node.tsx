/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createRef, useEffect } from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { assert } from 'vitest';

import { addEventListener } from '..';

describe('addEventListener', () => {
  test('can render correctly using ReactDOMServer', () => {
    const listener = vi.fn();
    const targetRef = createRef<HTMLDivElement>();

    function Component() {
      useEffect(() => {
        assert(targetRef.current != null);
        return addEventListener(targetRef.current, 'click', listener);
      });
      return <div ref={targetRef} />;
    }

    const output = ReactDOMServer.renderToString(<Component />);
    expect(output).toBe('<div></div>');
  });
});
