import { pickProps } from '../../modules/filterObjectProps'
import CoreComponent from '../CoreComponent'
import View from '../View'

export default {
  ...View.stylePropTypes,
  ...pickProps(CoreComponent.stylePropTypes, [
    'color',
    'fontFamily',
    'fontSize',
    'fontStyle',
    'fontWeight',
    'letterSpacing',
    'lineHeight',
    'textAlign',
    'textDecoration',
    'textTransform',
    'whiteSpace',
    'wordWrap',
    'writingDirection'
  ])
}
