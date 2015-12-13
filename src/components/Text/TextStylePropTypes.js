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
    'marginHorizontal',
    'marginVertical',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'marginTop',
    'padding',
    'paddingHorizontal',
    'paddingVertical',
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
