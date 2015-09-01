import React from 'react';

import { omitProps, pickProps } from './modules/filterObjectProps';
import Image from './modules/Image';
import Text from './modules/Text';
import TextInput from './modules/TextInput';
import View from './modules/View';
import { restyle } from './modules/react-native-web-style';

export default React;

export {
  // helpers
  omitProps,
  pickProps,
  restyle,
  // components
  Image,
  Text,
  TextInput,
  View
};
