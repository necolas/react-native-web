/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import React, { Component, PropTypes } from 'react';

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
class StaticContainer extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    shouldUpdate: PropTypes.bool.isRequired
  };

  shouldComponentUpdate(nextProps: { shouldUpdate: boolean }): boolean {
    return nextProps.shouldUpdate;
  }

  render() {
    const child = this.props.children;
    return (child === null || child === false) ? null : React.Children.only(child);
  }
}

module.exports = StaticContainer;
