/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import useStable from '..';

function createRoot(rootNode) {
  return {
    render(element) {
      ReactDOM.render(element, rootNode);
    }
  };
}

describe('useStable', () => {
  let root;
  let rootNode;
  let spy = {};

  const TestComponent = ({ initialValueCallback }): React.Node => {
    const value = useStable(initialValueCallback);
    spy.value = value;
    return null;
  };

  beforeEach(() => {
    spy = {};
    rootNode = document.createElement('div');
    document.body.appendChild(rootNode);
    root = createRoot(rootNode);
  });

  afterEach(() => {
    root.render(null);
    document.body.removeChild(rootNode);
    rootNode = null;
    root = null;
  });

  test('correctly sets the initial value', () => {
    const initialValueCallback = () => 5;
    act(() => {
      root.render(<TestComponent initialValueCallback={initialValueCallback} />);
    });
    expect(spy.value).toBe(5);
  });

  test('does not change the value', () => {
    let counter = 0;
    const initialValueCallback = () => counter++;
    act(() => {
      root.render(<TestComponent initialValueCallback={initialValueCallback} />);
    });
    expect(spy.value).toBe(0);
    act(() => {
      root.render(<TestComponent initialValueCallback={initialValueCallback} />);
    });
    expect(spy.value).toBe(0);
  });

  test('only calls the callback once', () => {
    let counter = 0;
    const initialValueCallback = () => counter++;
    act(() => {
      root.render(<TestComponent initialValueCallback={initialValueCallback} />);
    });
    expect(counter).toBe(1);
    act(() => {
      root.render(<TestComponent initialValueCallback={initialValueCallback} />);
    });
    expect(counter).toBe(1);
  });

  test('does not change the value if the callback initially returns null', () => {
    let counter = 0;
    const initialValueCallback = () => {
      if (counter === 0) {
        counter++;
        return null;
      }
      return counter++;
    };
    act(() => {
      root.render(<TestComponent initialValueCallback={initialValueCallback} />);
    });
    expect(spy.value).toBe(null);
    act(() => {
      root.render(<TestComponent initialValueCallback={initialValueCallback} />);
    });
    expect(spy.value).toBe(null);
  });
});
