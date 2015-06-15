import autoprefix from './lib/autoprefix';
import React, {PropTypes} from 'react';
import styleMap from './lib/styleMap';

class WebStyleComponent extends React.Component {
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
    const { element: Element, ...other } = this.props;
    const { classNames, inlineStyles } = this._separateClassNamesAndStyles();

    return (
      <Element
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
    const styleProp = this.props.style;
    let classNames = [ this.props.className ];
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

WebStyleComponent.propTypes = WebStyleComponent._getPropTypes();
WebStyleComponent.defaultProps = WebStyleComponent._getDefaultProps();

export default WebStyleComponent;
