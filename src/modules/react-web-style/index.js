import React, { PropTypes } from 'react';
import StylePropTypes from './StylePropTypes';
import stylingStrategy from './strategy';

class WebStyleComponent extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string
    ]),
    style: PropTypes.object
  }

  static defaultProps = {
    className: '',
    element: 'div'
  }

  render() {
    const { component: Component, ...other } = this.props;

    return (
      <Component
        {...other}
        {...stylingStrategy(this.props)}
      />
    );
  }
}

export { StylePropTypes, stylingStrategy, WebStyleComponent };
