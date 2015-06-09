import {objectWithProps} from '../getOtherProps';
import React, {PropTypes} from 'react';
import StylePropTypes from '../StylePropTypes';
import SDKComponent from './SDKComponent';
import {ViewStylePropTypes} from './View';

const TextStyleDefaultProps = {
  alignItems: 'stretch', /* 1 */
  borderWidth: '0',
  borderStyle: 'solid',
  boxSizing: 'border-box', /* 2 */
  display: 'flex', /* 3 */
  flexBasis: 'auto', /* 1 */
  flexDirection: 'column', /* 1 */
  flexShrink: 0, /* 1 */
  listStyle: 'none',
  margin: '0',
  padding: '0',
  position: 'relative' /* 4 */
};

const TextStylePropTypes = {
  ...ViewStylePropTypes,
  ...StylePropTypes.TypographicPropTypes
};

class Text extends React.Component {
  static _getPropTypes() {
    return {
      className: PropTypes.string,
      element: PropTypes.oneOfType([
        PropTypes.string, PropTypes.func
      ]),
      style: PropTypes.shape(TextStylePropTypes)
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
    const { className, element, style, ...other } = this.props;
    const filteredStyle = objectWithProps(style, Object.keys(TextStylePropTypes));
    const mergedStyle = { ...TextStyleDefaultProps, ...filteredStyle };

    return (
      <SDKComponent
        {...other}
        className={`Text ${className}`}
        element={element}
        style={mergedStyle}
      />
    );
  }
}

Text.propTypes = Text._getPropTypes();
Text.defaultProps = Text._getDefaultProps();

export default Text;
