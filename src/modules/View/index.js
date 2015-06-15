import { pickProps } from '../filterObjectProps';
import StylePropTypes from '../StylePropTypes';
import React, { PropTypes } from 'react';
import WebStyleComponent from '../WebStyleComponent';

// https://github.com/facebook/css-layout#default-values
const ViewStyleDefaultProps = {
  alignItems: 'stretch',
  borderWidth: 0,
  borderStyle: 'solid',
  boxSizing: 'border-box',
  display: 'flex',
  flexBasis: 'auto',
  flexDirection: 'column',
  flexShrink: 0,
  listStyle: 'none',
  margin: 0,
  padding: 0,
  position: 'relative'
};

const ViewStylePropTypes = {
  ...StylePropTypes.BackgroundPropTypes,
  ...StylePropTypes.BorderThemePropTypes,
  ...StylePropTypes.LayoutPropTypes,
  boxShadow: PropTypes.string,
  opacity: PropTypes.number,
  transform: PropTypes.string
};

class View extends React.Component {
  static _getPropTypes() {
    return {
      className: PropTypes.string,
      element: PropTypes.oneOfType([
        PropTypes.string, PropTypes.func
      ]),
      pointerEvents: PropTypes.oneOf([
        'auto',
        'box-none',
        'box-only',
        'none'
      ]),
      style: PropTypes.shape(ViewStylePropTypes)
    };
  }

  static _getDefaultProps() {
    return {
      className: '',
      element: 'div',
      style: {}
    };
  }

  render() {
    const { className, element, pointerEvents, style, ...other } = this.props;
    const filteredStyle = pickProps(style, Object.keys(ViewStylePropTypes));
    const pointerEventsStyle = pointerEvents && { pointerEvents };
    const mergedStyle = {
      ...ViewStyleDefaultProps,
      ...filteredStyle,
      ...pointerEventsStyle
    };

    return (
      <WebStyleComponent
        {...other}
        className={`View ${className}`}
        element={element}
        style={mergedStyle}
      />
    );
  }
}

View.propTypes = View._getPropTypes();
View.defaultProps = View._getDefaultProps();

export default View;
export { ViewStylePropTypes };
