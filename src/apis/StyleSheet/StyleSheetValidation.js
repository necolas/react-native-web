/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule StyleSheetValidation
 * @flow
 */

import ImageStylePropTypes from '../../components/Image/ImageStylePropTypes';
import TextInputStylePropTypes from '../../components/TextInput/TextInputStylePropTypes';
import TextStylePropTypes from '../../components/Text/TextStylePropTypes';
import ViewStylePropTypes from '../../components/View/ViewStylePropTypes';
import warning from 'fbjs/lib/warning';
import { number, oneOf, string } from 'prop-types';

// Hardcoded because this is a legit case but we don't want to load it from
// a private API. We might likely want to unify style sheet creation with how it
// is done in the DOM so this might move into React. I know what I'm doing so
// plz don't fire me.
const ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

export default class StyleSheetValidation {
  static validateStyleProp(prop, style, caller) {
    if (process.env.NODE_ENV !== 'production') {
      const isCustomProperty = prop.indexOf('--') === 0;
      if (isCustomProperty) return;

      if (allStylePropTypes[prop] === undefined) {
        const message1 = '"' + prop + '" is not a valid style property.';
        const message2 =
          '\nValid style props: ' +
          JSON.stringify(Object.keys(allStylePropTypes).sort(), null, '  ');
        styleError(message1, style, caller, message2);
      } else {
        const error = allStylePropTypes[prop](
          style,
          prop,
          caller,
          'prop',
          null,
          ReactPropTypesSecret
        );
        if (error) {
          styleError(error.message, style, caller);
        }
      }
    }
  }

  static validateStyle(name, styles) {
    if (process.env.NODE_ENV !== 'production') {
      for (const prop in styles[name]) {
        StyleSheetValidation.validateStyleProp(prop, styles[name], 'StyleSheet ' + name);
      }
    }
  }

  static addValidStylePropTypes(stylePropTypes) {
    for (const key in stylePropTypes) {
      allStylePropTypes[key] = stylePropTypes[key];
    }
  }
}

const styleError = function(message1, style, caller?, message2?) {
  warning(
    false,
    message1 +
      '\n' +
      (caller || '<<unknown>>') +
      ': ' +
      JSON.stringify(style, null, '  ') +
      (message2 || '')
  );
};

const allStylePropTypes = {};

StyleSheetValidation.addValidStylePropTypes(ImageStylePropTypes);
StyleSheetValidation.addValidStylePropTypes(TextStylePropTypes);
StyleSheetValidation.addValidStylePropTypes(TextInputStylePropTypes);
StyleSheetValidation.addValidStylePropTypes(ViewStylePropTypes);

StyleSheetValidation.addValidStylePropTypes({
  appearance: string,
  borderCollapse: string,
  borderSpacing: oneOf([number, string]),
  clear: string,
  cursor: string,
  fill: string,
  float: oneOf(['left', 'none', 'right']),
  font: string /* @private */,
  listStyle: string,
  pointerEvents: string,
  tableLayout: string
});
