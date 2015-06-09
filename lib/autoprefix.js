export default function prefixStyles(style) {
  if (style.hasOwnProperty('flexBasis')) {
    style = {
      WebkitFlexBasis: style.flexBasis,
      msFlexBasis: style.flexBasis,
      ...style
    };
  }

  if (style.hasOwnProperty('flexGrow')) {
    style = {
      WebkitBoxFlex: style.flexGrow,
      WebkitFlexGrow: style.flexGrow,
      msFlexPositive: style.flexGrow,
      ...style
    };
  }

  if (style.hasOwnProperty('flexShrink')) {
    style = {
      WebkitFlexShrink: style.flexShrink,
      msFlexNegative: style.flexShrink,
      ...style
    };
  }

  // NOTE: adding `;` to the string value prevents React from automatically
  // adding a `px` suffix to the unitless value
  if (style.hasOwnProperty('order')) {
    style = {
      WebkitBoxOrdinalGroup: `${parseInt(style.order, 10) + 1};`,
      WebkitOrder: `${style.order}`,
      msFlexOrder: `${style.order};`,
      ...style
    };
  }

  if (style.hasOwnProperty('transform')) {
    style = {
      WebkitTransform: style.transform,
      msTransform: style.transform,
      ...style
    };
  }

  return style;
}
