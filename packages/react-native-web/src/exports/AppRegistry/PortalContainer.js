/**
 * Copyright (c) Ondrej Zaruba.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import StyleResolver from '../StyleSheet/StyleResolver';
import RootContext from './RootContext';

type Props = {
  rootTag: HTMLElement,
  children?: React.Children
};

// maybe use https://styled-components.com/docs/api#stylesheetmanager

export function PortalContainer(props: Props): React.Node {
  const styleResolver = React.useRef(props.styleResolver ?? new StyleResolver(props.rootTag), [
    props.rootTag,
    props
  ]);
  const rootContext = { rootTag: props.rootTag, styleResolver: styleResolver.current };
  React.useEffect(() => {
    return () => {
      styleResolver.current.clear();
    };
  }, [styleResolver]);

  return ReactDOM.createPortal(
    <RootContext.Provider value={rootContext}>{props.children}</RootContext.Provider>,
    props.rootTag
  );
}
