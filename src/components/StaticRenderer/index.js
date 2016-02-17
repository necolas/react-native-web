/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import { Component, PropTypes } from 'react'

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
    render: PropTypes.func.isRequired,
    shouldUpdate: PropTypes.bool.isRequired
  };

  shouldComponentUpdate(nextProps: { shouldUpdate: boolean }): boolean {
    return nextProps.shouldUpdate
  }

  render() {
    return this.props.render()
  }
}
