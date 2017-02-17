import { PropTypes } from 'react';

const { number, oneOf, oneOfType, string } = PropTypes;
const numberOrString = oneOfType([ number, string ]);

const LayoutPropTypes = {
  // box model
  borderWidth: numberOrString,
  borderBottomWidth: numberOrString,
  borderLeftWidth: numberOrString,
  borderRightWidth: numberOrString,
  borderTopWidth: numberOrString,
  boxSizing: string,
  height: numberOrString,
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
  padding: numberOrString,
  paddingBottom: numberOrString,
  paddingHorizontal: numberOrString,
  paddingLeft: numberOrString,
  paddingRight: numberOrString,
  paddingTop: numberOrString,
  paddingVertical: numberOrString,
  width: numberOrString,
  // flexbox
  alignContent: oneOf([ 'center', 'flex-end', 'flex-start', 'space-around', 'space-between', 'stretch' ]),
  alignItems: oneOf([ 'baseline', 'center', 'flex-end', 'flex-start', 'stretch' ]),
  alignSelf: oneOf([ 'auto', 'baseline', 'center', 'flex-end', 'flex-start', 'stretch' ]),
  flex: number,
  flexBasis: numberOrString,
  flexDirection: oneOf([ 'column', 'column-reverse', 'row', 'row-reverse' ]),
  flexGrow: number,
  flexShrink: number,
  flexWrap: oneOf([ 'nowrap', 'wrap', 'wrap-reverse' ]),
  justifyContent: oneOf([ 'center', 'flex-end', 'flex-start', 'space-around', 'space-between' ]),
  order: number,
  // position
  bottom: numberOrString,
  left: numberOrString,
  position: oneOf([ 'absolute', 'fixed', 'relative', 'static' ]),
  right: numberOrString,
  top: numberOrString
};

module.exports = LayoutPropTypes;
