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
import createEventHandle from '..';

describe('create-event-handle', () => {
  test('can render correctly using ReactDOMServer', () => {
    const listener = jest.fn();
    const targetRef = React.createRef();
    const addClickListener = createEventHandle('click');

    function Component() {
      React.useEffect(() => {
        return addClickListener(targetRef.current, listener);
      });
      return <div ref={targetRef} />;
    }

    const output = ReactDOMServer.renderToString(<Component />);
    expect(output).toBe('<div></div>');
  });
});
