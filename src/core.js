import './modules/injectResponderEventPlugin'

import findNodeHandle from './modules/findNodeHandle'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
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
  StyleSheet,
  Image,
  Text,
  TextInput,
  View
}

module.exports = ReactNativeCore
