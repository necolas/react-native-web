import { pickProps } from '../filterObjectProps';
import React, { PropTypes } from 'react';
import ViewStylePropTypes, { ViewDefaultStyle } from './ViewStylePropTypes';
import WebStyleComponent from '../WebStyleComponent';

class View extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    element: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string
    ]),
    pointerEvents: PropTypes.oneOf([
      'auto',
      'box-none',
      'box-only',
      'none'
    ]),
    style: PropTypes.shape(ViewStylePropTypes)
  }

  static defaultProps = {
    className: '',
    element: 'div'
  }

  render() {
    const { className, element, pointerEvents, style, ...other } = this.props;
    const filteredStyle = pickProps(style, Object.keys(ViewStylePropTypes));
    const pointerEventsStyle = pointerEvents && { pointerEvents };
    const mergedStyle = {
      ...ViewDefaultStyle,
      ...filteredStyle,
      ...pointerEventsStyle
    };

    return (
      <WebStyleComponent
        {...other}
        className={`sdk-View ${className}`}
        element={element}
        style={mergedStyle}
      />
    );
  }
}

export default View;
