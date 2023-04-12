/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 */

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { addEventListener } from '..';

describe('addEventListener', () => {
  test('can render correctly using ReactDOMServer', () => {
    const listener = jest.fn();
    const targetRef = React.createRef();

    function Component() {
      React.useEffect(() => {
        return addEventListener(targetRef.current, 'click', listener);
      });
      return <div ref={targetRef} />;
    }

    const output = ReactDOMServer.renderToString(<Component />);
    expect(output).toBe('<div></div>');
  });
});
