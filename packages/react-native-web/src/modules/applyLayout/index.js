/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import debounce from 'debounce';
import findNodeHandle from '../../exports/findNodeHandle';

const emptyObject = {};
const registry = {};

let id = 1;
const guid = () => `r-${id++}`;

let resizeObserver;
if (canUseDOM) {
  if (typeof window.ResizeObserver !== 'undefined') {
    resizeObserver = new window.ResizeObserver(entries => {
      entries.forEach(({ target, contentRect }) => {
        typeof target._handleLayout === 'function' &&
          target._handleLayout({
            x: contentRect.x,
            y: contentRect.y,
            width: contentRect.width,
            height: contentRect.height
          });
      });
    });
  } else {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'onLayout relies on ResizeObserver which is not supported by your browser. ' +
          'Please include a polyfill. https://github.com/WICG/ResizeObserver/issues/3. ' +
          'Falling back to window.onresize.'
      );
    }

    const triggerAll = () => {
      Object.keys(registry).forEach(key => {
        const instance = registry[key];
        instance._isMounted &&
          instance.measure((x, y, width, height) => {
            instance._handleLayout({ x, y, width, height });
          });
      });
    };

    window.addEventListener('resize', debounce(triggerAll, 16), false);
  }
}

const observe = instance => {
  const cb = instance._handleLayout.bind(instance);

  if (resizeObserver) {
    const node = findNodeHandle(instance);
    node._handleLayout = debounce(cb);
    resizeObserver.observe(node);
  } else {
    const id = guid();
    registry[id] = instance;
    instance._onLayoutId = id;
    instance.measure((x, y, width, height) => {
      cb({ x, y, width, height });
    });
  }
};

const unobserve = instance => {
  if (resizeObserver) {
    const node = findNodeHandle(instance);
    node._handleLayout = null;
    resizeObserver.unobserve(node);
  } else {
    delete registry[instance._onLayoutId];
  }
};

const safeOverride = (original, next) => {
  if (original) {
    return function prototypeOverride() {
      original.call(this);
      next.call(this);
    };
  }
  return next;
};

const applyLayout = Component => {
  const componentDidMount = Component.prototype.componentDidMount;
  const componentDidUpdate = Component.prototype.componentDidUpdate;
  const componentWillUnmount = Component.prototype.componentWillUnmount;

  Component.prototype.componentDidMount = safeOverride(
    componentDidMount,
    function componentDidMount() {
      this._layoutState = emptyObject;
      this._isMounted = true;
      if (this.props.onLayout) {
        observe(this);
      }
    }
  );

  Component.prototype.componentDidUpdate = safeOverride(
    componentDidUpdate,
    function componentDidUpdate(prevProps) {
      if (this.props.onLayout && !prevProps.onLayout) {
        observe(this);
      } else if (!this.props.onLayout && prevProps.onLayout) {
        unobserve(this);
      }
    }
  );

  Component.prototype.componentWillUnmount = safeOverride(
    componentWillUnmount,
    function componentWillUnmount() {
      this._isMounted = false;
      unobserve(this);
    }
  );

  Component.prototype._handleLayout = function(layout) {
    const { onLayout } = this.props;

    if (typeof onLayout !== 'function' || !this._isMounted || !layout) {
      return;
    }

    const prevLayout = this._layoutState;

    if (
      prevLayout.x !== layout.x ||
      prevLayout.y !== layout.y ||
      prevLayout.width !== layout.width ||
      prevLayout.height !== layout.height
    ) {
      const nativeEvent = { layout };
      this._layoutState = layout;
      onLayout({ nativeEvent, timeStamp: Date.now() });
    }
  };
  return Component;
};

export default applyLayout;
