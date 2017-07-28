/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule StaticRenderer
 * @flow
 */

import { Component } from 'react';
import { bool, func } from 'prop-types';

/**
 * Renders static content efficiently by allowing React to short-circuit the
 * reconciliation process. This component should be used when you know that a
 * subtree of components will never need to be updated.
 *
 *   const someValue = ...; // We know for certain this value will never change.
 *   return (
 *     <StaticRenderer render={() => <MyComponent value={someValue} />} />
 *   );
 *
 * Typically, you will not need to use this component and should opt for normal
 * React reconciliation.
 */

export default class StaticRenderer extends Component {
  static propTypes = {
    render: func.isRequired,
    shouldUpdate: bool.isRequired
  };

  shouldComponentUpdate(nextProps: { shouldUpdate: boolean }): boolean {
    return nextProps.shouldUpdate;
  }

  render() {
    return this.props.render();
  }
}
