import autoprefix from './autoprefix'
import styles from './styles.css'

/**
 * Get the HTML class that corresponds to a style declaration
 * @param prop {string} prop name
 * @param style {Object} style
 * @return {string} class name
 */
function getSinglePurposeClassName(prop, style) {
  const className = `${prop}-${style[prop]}`
  if (style.hasOwnProperty(prop) && styles[className]) {
    return styles[className]
  }
}

/**
 * Replace inline styles with single purpose classes where possible
 * @param props {Object} React Element properties
 * @return {Object}
 */
export default function stylingStrategy(props) {
  let className
  let style = {}

  const classList = [ props.className ]
  for (const prop in props.style) {
    const styleClass = getSinglePurposeClassName(prop, props.style)
    if (styleClass) {
      classList.push(styleClass)
    } else {
      style[prop] = props.style[prop]
    }
  }

  className = classList.join(' ')
  style = autoprefix(style)

  return { className: className, style }
}
