/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import debounce from 'debounce';

const emptyObject = {};
const registry = {};

let id = 1;
const guid = () => `r-${id++}`;

if (canUseDOM) {
  const triggerAll = () => {
    Object.keys(registry).forEach(key => {
      const instance = registry[key];
      instance._handleLayout();
    });
  };

  window.addEventListener('resize', debounce(triggerAll, 16), false);
}

const safeOverride = (original, next) => {
  if (original) {
    return function prototypeOverride() {
      original.call(this);
      next.call(this);
    };
  }
  return next;
};

const applyLayout = (Component: ReactClass<any>) => {
  const componentDidMount = Component.prototype.componentDidMount;
  const componentDidUpdate = Component.prototype.componentDidUpdate;
  const componentWillUnmount = Component.prototype.componentWillUnmount;

  Component.prototype.componentDidMount = safeOverride(
    componentDidMount,
    function componentDidMount() {
      this._layoutState = emptyObject;
      this._isMounted = true;
      this._onLayoutId = guid();
      registry[this._onLayoutId] = this;
      this._handleLayout();
    }
  );

  Component.prototype.componentDidUpdate = safeOverride(
    componentDidUpdate,
    function componentDidUpdate() {
      this._handleLayout();
    }
  );

  Component.prototype.componentWillUnmount = safeOverride(
    componentWillUnmount,
    function componentWillUnmount() {
      this._isMounted = false;
      delete registry[this._onLayoutId];
    }
  );

  Component.prototype._handleLayout = function() {
    const layout = this._layoutState;
    const { onLayout } = this.props;

    if (onLayout) {
      this.measure((x, y, width, height) => {
        if (!this._isMounted) return;

        if (
          layout.x !== x ||
          layout.y !== y ||
          layout.width !== width ||
          layout.height !== height
        ) {
          this._layoutState = { x, y, width, height };
          const nativeEvent = { layout: this._layoutState };
          onLayout({ nativeEvent, timeStamp: Date.now() });
        }
      });
    }
  };
  return Component;
};

export default applyLayout;
