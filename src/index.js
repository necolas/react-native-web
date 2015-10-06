import React from 'react'
import { injectStyles } from './modules/styles'

// components
import Image from './components/Image'
import ListView from './components/ListView'
import ScrollView from './components/ScrollView'
import Swipeable from './components/Swipeable'
import Text from './components/Text'
import TextInput from './components/TextInput'
import Touchable from './components/Touchable'
import View from './components/View'

injectStyles()

export default React

export {
  injectStyles,
  Image,
  ListView,
  ScrollView,
  Swipeable,
  Text,
  TextInput,
  Touchable,
  View
}
