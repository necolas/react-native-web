/* eslint-disable */
/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.

 * @flow
 */

import { PropTypes } from 'react'
import ImageStylePropTypes from '../../components/Image/ImageStylePropTypes'
import ReactPropTypeLocations from 'react/lib/ReactPropTypeLocations'
import ReactPropTypesSecret from 'react/lib/ReactPropTypesSecret'
import TextStylePropTypes from '../../components/Text/TextStylePropTypes'
import ViewStylePropTypes from '../../components/View/ViewStylePropTypes'
import warning from 'fbjs/lib/warning'

class StyleSheetValidation {
  static validateStyleProp(prop, style, caller) {
    if (process.env.NODE_ENV !== 'production') {
      if (allStylePropTypes[prop] === undefined) {
        var message1 = '"' + prop + '" is not a valid style property.';
        var message2 = '\nValid style props: ' +
          JSON.stringify(Object.keys(allStylePropTypes).sort(), null, '  ');
        styleError(message1, style, caller, message2);
      }
      var error = allStylePropTypes[prop](
        style,
        prop,
        caller,
        ReactPropTypeLocations.prop,
        null,
        ReactPropTypesSecret
      );
      if (error) {
        styleError(error.message, style, caller);
      }
    }
  }

  static validateStyle(name, styles) {
    if (process.env.NODE_ENV !== 'production') {
      for (var prop in styles[name]) {
        StyleSheetValidation.validateStyleProp(prop, styles[name], 'StyleSheet ' + name);
      }
    }
  }

  static addValidStylePropTypes(stylePropTypes) {
    for (var key in stylePropTypes) {
      allStylePropTypes[key] = stylePropTypes[key];
    }
  }
}

var styleError = function(message1, style, caller?, message2?) {
  warning(
    false,
    message1 + '\n' + (caller || '<<unknown>>') + ': ' +
    JSON.stringify(style, null, '  ') + (message2 || '')
  );
};

var allStylePropTypes = {};

StyleSheetValidation.addValidStylePropTypes(ImageStylePropTypes)
StyleSheetValidation.addValidStylePropTypes(TextStylePropTypes)
StyleSheetValidation.addValidStylePropTypes(ViewStylePropTypes)
StyleSheetValidation.addValidStylePropTypes({
  appearance: PropTypes.string,
  clear: PropTypes.string,
  cursor: PropTypes.string,
  display: PropTypes.string,
  float: PropTypes.oneOf([ 'left', 'none', 'right' ]),
  font: PropTypes.string, /* @private */
  listStyle: PropTypes.string
})

module.exports = StyleSheetValidation
