import autoprefix from './autoprefix';
import styleMap from './styleMap';

/**
 * Find declarations that correspond to single purpose classes
 */
function getSinglePurposeClassName(prop, style) {
  const uniqueClassName = `${prop}-${style[prop]}`;
  if (
    style.hasOwnProperty(prop) &&
    styleMap[uniqueClassName]
  ) {
    return styleMap[uniqueClassName];
  }
}

/**
 * Replace inline styles with single purpose classes where possible
 */
export default function stylingStrategy(props) {
  const { className: origClassName, style: origStyle } = props;
  const classNames = [ origClassName ];
  const style = {};

  for (const prop in origStyle) {
    const singlePurposeClassName = getSinglePurposeClassName(prop, origStyle);
    if (singlePurposeClassName) {
      classNames.push(singlePurposeClassName);
    } else {
      style[prop] = origStyle[prop];
    }
  }

  const className = classNames.join(' ');
  const prefixedStyle = autoprefix(style);

  return { className, style: prefixedStyle };
}
