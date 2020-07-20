/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import React from 'react';
import { unstable_createElement as createElement } from '../createElement';
import useElementLayout from '../../hooks/useElementLayout';
import usePlatformMethods from '../../hooks/usePlatformMethods';
import useResponderEvents from '../../hooks/useResponderEvents';
import setAndForwardRef from '../..//modules/setAndForwardRef';
import pick from '../../modules/pick';

const createRNElement = (tagname, forwardPropsList, defaultStyle) => {
  return React.forwardRef((props, ref) => {
    const {
      onLayout,
      onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture,
      onResponderEnd,
      onResponderGrant,
      onResponderMove,
      onResponderReject,
      onResponderRelease,
      onResponderStart,
      onResponderTerminate,
      onResponderTerminationRequest,
      onStartShouldSetResponder,
      onStartShouldSetResponderCapture,
      style
    } = props;
    const hostRef = React.useRef(null);
    const setRef = setAndForwardRef({
      getForwardedRef: () => ref,
      setLocalRef: hostNode => {
        hostRef.current = hostNode;
      }
    });

    const classList = [defaultStyle];
    useElementLayout(hostRef, onLayout);
    usePlatformMethods(hostRef, { classList, style });
    useResponderEvents(hostRef, {
      onMoveShouldSetResponder,
      onMoveShouldSetResponderCapture,
      onResponderEnd,
      onResponderGrant,
      onResponderMove,
      onResponderReject,
      onResponderRelease,
      onResponderStart,
      onResponderTerminate,
      onResponderTerminationRequest,
      onStartShouldSetResponder,
      onStartShouldSetResponderCapture
    });
    const supportedProps = React.useMemo(() => {
      const finalProps = pick(props, forwardPropsList);
      finalProps.classList = classList;
      finalProps.ref = setRef;
      finalProps.style = style;
      return finalProps;
    }, [props, classList, setRef, style]);
    return createElement(tagname, supportedProps);
  });
};

export default createRNElement;
