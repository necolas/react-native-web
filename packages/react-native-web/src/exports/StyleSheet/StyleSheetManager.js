/**
 * Copyright (c) Ondrej Zaruba.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as React from 'react';
import StyleContext from './StyleSheetContext';
import StyleResolver from './StyleResolver';
import ResponderSystem from '../../modules/useResponderEvents/ResponderSystem';

type Props = {
  rootTag?: HTMLElement,
  children?: React.Children,
  _styleResolver?: StyleResolver,
  _responderSystem?: ResponderSystem
};

export default function StyleSheetManager(props: Props): React.Node {
  const styleResolver = React.useRef<StyleResolver>();
  if (!styleResolver.current) {
    styleResolver.current = props._styleResolver ?? new StyleResolver(props.rootTag);
  }

  React.useEffect(() => {
    return () => {
      styleResolver.current.clear();
      responderSystem.current.terminateResponder();
    };
  }, []);

  const responderSystem = React.useRef<ResponderSystem>();
  if (!responderSystem.current) {
    responderSystem.current =
      props._responderSystem ?? new ResponderSystem(props.rootTag?.ownerDocument?.defaultView);
  }

  const styleContext = {
    rootTag: props.rootTag,
    styleResolver: styleResolver.current,
    responderSystem: responderSystem.current
  };

  return <StyleContext.Provider value={styleContext}>{props.children}</StyleContext.Provider>;
}
