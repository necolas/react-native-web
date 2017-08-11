/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import { number, oneOf, oneOfType, string } from 'prop-types';
const OverflowPropType = oneOf(['auto', 'hidden', 'scroll', 'visible']);
const hiddenOrVisible = oneOf(['hidden', 'visible']);
const numberOrString = oneOfType([number, string]);

const LayoutPropTypes = {
  alignContent: oneOf([
    'center',
    'flex-end',
    'flex-start',
    'space-around',
    'space-between',
    'stretch'
  ]),
  alignItems: oneOf(['baseline', 'center', 'flex-end', 'flex-start', 'stretch']),
  alignSelf: oneOf(['auto', 'baseline', 'center', 'flex-end', 'flex-start', 'stretch']),
  backfaceVisibility: hiddenOrVisible,
  borderWidth: numberOrString,
  borderBottomWidth: numberOrString,
  borderLeftWidth: numberOrString,
  borderRightWidth: numberOrString,
  borderTopWidth: numberOrString,
  bottom: numberOrString,
  boxSizing: string,
  direction: oneOf(['inherit', 'ltr', 'rtl']),
  display: string,
  flex: number,
  flexBasis: numberOrString,
  flexDirection: oneOf(['column', 'column-reverse', 'row', 'row-reverse']),
  flexGrow: number,
  flexShrink: number,
  flexWrap: oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  height: numberOrString,
  justifyContent: oneOf(['center', 'flex-end', 'flex-start', 'space-around', 'space-between']),
  left: numberOrString,
  margin: numberOrString,
  marginBottom: numberOrString,
  marginHorizontal: numberOrString,
  marginLeft: numberOrString,
  marginRight: numberOrString,
  marginTop: numberOrString,
  marginVertical: numberOrString,
  maxHeight: numberOrString,
  maxWidth: numberOrString,
  minHeight: numberOrString,
  minWidth: numberOrString,
  order: number,
  overflow: OverflowPropType,
  overflowX: OverflowPropType,
  overflowY: OverflowPropType,
  padding: numberOrString,
  paddingBottom: numberOrString,
  paddingHorizontal: numberOrString,
  paddingLeft: numberOrString,
  paddingRight: numberOrString,
  paddingTop: numberOrString,
  paddingVertical: numberOrString,
  position: oneOf(['absolute', 'fixed', 'relative', 'static', 'sticky']),
  right: numberOrString,
  top: numberOrString,
  visibility: hiddenOrVisible,
  width: numberOrString,
  zIndex: number,
  /**
   * @platform unsupported
   */
  aspectRatio: number,
  /**
   * @platform web
   */
  gridAutoColumns: string,
  gridAutoFlow: string,
  gridAutoRows: string,
  gridColumnEnd: string,
  gridColumnGap: string,
  gridColumnStart: string,
  gridRowEnd: string,
  gridRowGap: string,
  gridRowStart: string,
  gridTemplateColumns: string,
  gridTemplateRows: string,
  gridTemplateAreas: string
};

export default LayoutPropTypes;
