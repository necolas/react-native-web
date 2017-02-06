import BaseComponentPropTypes from '../../propTypes/BaseComponentPropTypes';
import EdgeInsetsPropType from '../../propTypes/EdgeInsetsPropType';
import StyleSheetPropType from '../../propTypes/StyleSheetPropType';
import ViewStylePropTypes from './ViewStylePropTypes';
import { PropTypes } from 'react';

const ViewPropTypes = {
  ...BaseComponentPropTypes,
  children: PropTypes.any,
  collapsable: PropTypes.bool,
  hitSlop: EdgeInsetsPropType,
  onClick: PropTypes.func,
  onClickCapture: PropTypes.func,
  onLayout: PropTypes.func,
  onMoveShouldSetResponder: PropTypes.func,
  onMoveShouldSetResponderCapture: PropTypes.func,
  onResponderGrant: PropTypes.func,
  onResponderMove: PropTypes.func,
  onResponderReject: PropTypes.func,
  onResponderRelease: PropTypes.func,
  onResponderTerminate: PropTypes.func,
  onResponderTerminationRequest: PropTypes.func,
  onStartShouldSetResponder: PropTypes.func,
  onStartShouldSetResponderCapture: PropTypes.func,
  onTouchCancel: PropTypes.func,
  onTouchCancelCapture: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchEndCapture: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchMoveCapture: PropTypes.func,
  onTouchStart: PropTypes.func,
  onTouchStartCapture: PropTypes.func,
  pointerEvents: PropTypes.oneOf([ 'auto', 'box-none', 'box-only', 'none' ]),
  style: StyleSheetPropType(ViewStylePropTypes)
};

module.exports = ViewPropTypes;
