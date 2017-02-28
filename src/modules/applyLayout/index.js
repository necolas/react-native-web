/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * @flow
 */

import emptyFunction from 'fbjs/lib/emptyFunction';

const emptyObject = {};

const applyLayout = Component => {
  const componentDidMount = Component.prototype.componentDidMount || emptyFunction;
  const componentDidUpdate = Component.prototype.componentDidUpdate || emptyFunction;

  Component.prototype.componentDidMount = function() {
    componentDidMount.call(this);
    this._layoutState = emptyObject;
    this._handleLayout();
  };

  Component.prototype.componentDidUpdate = function() {
    componentDidUpdate.call(this);
    this._handleLayout();
  };

  Component.prototype._handleLayout = function() {
    const layout = this._layoutState;
    const { onLayout } = this.props;

    if (onLayout) {
      this.measure((x, y, width, height) => {
        if (
          layout.x !== x || layout.y !== y || layout.width !== width || layout.height !== height
        ) {
          const nextLayout = { x, y, width, height };
          const nativeEvent = { layout: nextLayout };
          onLayout({ nativeEvent, timeStamp: Date.now() });
          this._layoutState = nextLayout;
        }
      });
    }
  };
  return Component;
};

module.exports = applyLayout;
