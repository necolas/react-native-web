import './modules/injectResponderEventPlugin'

import findNodeHandle from './modules/findNodeHandle'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import I18nManager from './apis/I18nManager'
import StyleSheet from './apis/StyleSheet'
import Image from './components/Image'
import Text from './components/Text'
import TextInput from './components/TextInput'
import View from './components/View'

const ReactNativeCore = {
  findNodeHandle,
  render: ReactDOM.render,
  renderToStaticMarkup: ReactDOMServer.renderToStaticMarkup,
  renderToString: ReactDOMServer.renderToString,
  unmountComponentAtNode: ReactDOM.unmountComponentAtNode,
  I18nManager,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View
}

module.exports = ReactNativeCore
