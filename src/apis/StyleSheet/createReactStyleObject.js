import expandStyle from './expandStyle'
import flattenStyle from '../StyleSheet/flattenStyle'
import processTransform from '../StyleSheet/processTransform'

const createReactStyleObject = (style) => processTransform(expandStyle(flattenStyle(style)))

module.exports = createReactStyleObject
