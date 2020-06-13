/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { PortalProps } from './types';

class ModalPortal extends React.Component<PortalProps> {
  constructor(props) {
    super(props);
    this.state = {
      element: null,
      target: null
    };
  }

  componentDidMount() {
    this.setState(
      {
        element: document.createElement('div'),
        target: document.body
      },
      () => {
        const { target, element } = this.state;

        target.appendChild(element);
      }
    );
  }

  componentWillUnmount() {
    const { element, target } = this.state;

    if (target) {
      target.removeChild(element);
    }
  }

  render() {
    const { children } = this.props;
    const { element } = this.state;

    if (!element) {
      return null;
    }

    return ReactDOM.createPortal(children, element);
  }
}

export default ModalPortal;
