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
      entries.forEach(({ target }) => {
        const instance = registry[target._layoutId];
        instance && instance._handleLayout();
      });
    });
  } else {
    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
      console.warn(
        'onLayout relies on ResizeObserver which is not supported by your browser. ' +
          'Please include a polyfill, e.g., https://github.com/que-etc/resize-observer-polyfill. ' +
          'Falling back to window.onresize.'
      );
    }

    const triggerAll = () => {
      Object.keys(registry).forEach(key => {
        const instance = registry[key];
        instance._handleLayout();
      });
    };

    window.addEventListener('resize', debounce(triggerAll, 16), false);
  }
}

const observe = instance => {
  const id = guid();
  registry[id] = instance;

  if (resizeObserver) {
    const node = findNodeHandle(instance);
    if (node) {
      node._layoutId = id;
      resizeObserver.observe(node);
    }
  } else {
    instance._layoutId = id;
    instance._handleLayout();
  }
};

const unobserve = instance => {
  delete registry[instance._layoutId];
  if (resizeObserver) {
    const node = findNodeHandle(instance);
    if (node) {
      delete node._layoutId;
      resizeObserver.unobserve(node);
    }
  } else {
    delete instance._layoutId;
  }
};

const safeOverride = (original, next) => {
  if (original) {
    return function prototypeOverride() {
      /* eslint-disable prefer-rest-params */
      original.call(this, arguments);
      next.call(this, arguments);
      /* eslint-enable prefer-rest-params */
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
      observe(this);
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

  Component.prototype._handleLayout = function() {
    const layout = this._layoutState;
    const { onLayout } = this.props;

    if (onLayout) {
      this.measure((x, y, width, height) => {
        if (this._isMounted) {
          if (
            layout.x !== x ||
            layout.y !== y ||
            layout.width !== width ||
            layout.height !== height
          ) {
            this._layoutState = { x, y, width, height };
            const nativeEvent = {
              layout: this._layoutState
            };
            Object.defineProperty(nativeEvent, 'target', {
              enumerable: true,
              get: () => findNodeHandle(this)
            });
            onLayout({ nativeEvent, timeStamp: Date.now() });
          }
        }
      });
    }
  };
  return Component;
};

export default applyLayout;
