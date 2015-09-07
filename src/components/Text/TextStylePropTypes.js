import { pickProps } from '../../modules/filterObjectProps'
import CoreComponent from '../CoreComponent'

export default {
  ...pickProps(CoreComponent.stylePropTypes, [
    'backgroundColor',
    'color',
    'direction',
    'font',
    'fontFamily',
    'fontSize',
    'fontWeight',
    'letterSpacing',
    'lineHeight',
    'margin',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'marginTop',
    'padding',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'textAlign',
    'textDecoration',
    'textTransform',
    'whiteSpace',
    'wordWrap'
  ])
}
