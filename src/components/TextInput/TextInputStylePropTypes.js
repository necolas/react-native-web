import { pickProps } from '../../modules/filterObjectProps'
import View from '../View'
import CoreComponent from '../CoreComponent'

export default {
  ...(View.stylePropTypes),
  ...pickProps(CoreComponent.stylePropTypes, [
    'color',
    'direction',
    'fontFamily',
    'fontSize',
    'fontStyle',
    'fontWeight',
    'letterSpacing',
    'lineHeight',
    'textAlign',
    'textDecoration',
    'textTransform'
  ])
}
