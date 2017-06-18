/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule StaticContainer
 * @flow
 */

import { any, bool } from 'prop-types';
import { Children, Component } from 'react';

/**
 * Renders static content efficiently by allowing React to short-circuit the
 * reconciliation process. This component should be used when you know that a
 * subtree of components will never need to be updated.
 *
 *   const someValue = ...; // We know for certain this value will never change.
 *   return (
 *     <StaticContainer>
 *       <MyComponent value={someValue} />
 *     </StaticContainer>
 *   );
 *
 * Typically, you will not need to use this component and should opt for normal
 * React reconciliation.
 */
export default class StaticContainer extends Component {
  static propTypes = {
    children: any.isRequired,
    shouldUpdate: bool.isRequired
  };

  shouldComponentUpdate(nextProps: { shouldUpdate: boolean }): boolean {
    return nextProps.shouldUpdate;
  }

  render() {
    const child = this.props.children;
    return child === null || child === false ? null : Children.only(child);
  }
}
