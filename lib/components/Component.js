import autoprefix from '../autoprefix';
import {getOtherProps} from '../filterObjectProps';
import React, {PropTypes} from 'react';

// styles
import styleMap from '../styleMap';

class Component extends React.Component {
  static _getPropTypes() {
    return {
      className: PropTypes.string,
      element: PropTypes.oneOfType([
        PropTypes.string, PropTypes.func
      ]),
      style: PropTypes.object
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
    const other = getOtherProps(this);
    const { classNames, inlineStyles } = this._separateClassNamesAndStyles();

    return (
      <this.props.element
        {...other}
        className={classNames.join(' ')}
        style={autoprefix(inlineStyles)}
      />
    );
  }

  _getSinglePurposeClassName(prop, style) {
    const uniqueClassName = `${prop}-${style[prop]}`;
    if (
      style.hasOwnProperty(prop) &&
      styleMap[uniqueClassName]
    ) {
      return styleMap[uniqueClassName];
    }
  }

  _separateClassNamesAndStyles() {
    const classNameProp = this.props.className;
    const styleProp = this.props.style;

    let classNames = [ classNameProp ];
    let inlineStyles = {};

    for (let prop in styleProp) {
      let singlePurposeClassName =
          this._getSinglePurposeClassName(prop, styleProp);
      if (singlePurposeClassName) {
        classNames.push(singlePurposeClassName);
      } else {
        inlineStyles[prop] = styleProp[prop];
      }
    }

    return { classNames, inlineStyles };
  }
}

Component.propTypes = Component._getPropTypes();
Component.defaultProps = Component._getDefaultProps();

export default Component;
