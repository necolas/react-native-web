/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule StyleSheet
 * @noflow
 */

import StyleSheet from 'rnw-stylesheet';
import I18nManager from '../I18nManager';
import ImageStylePropTypes from '../../components/Image/ImageStylePropTypes';
import TextInputStylePropTypes from '../../components/TextInput/TextInputStylePropTypes';
import TextStylePropTypes from '../../components/Text/TextStylePropTypes';
import ViewStylePropTypes from '../../components/View/ViewStylePropTypes';

StyleSheet.setIsRTL(I18nManager.isRTL);

StyleSheet.addValidStylePropTypes(ImageStylePropTypes);
StyleSheet.addValidStylePropTypes(TextInputStylePropTypes);
StyleSheet.addValidStylePropTypes(TextStylePropTypes);
StyleSheet.addValidStylePropTypes(ViewStylePropTypes);

export default StyleSheet;
