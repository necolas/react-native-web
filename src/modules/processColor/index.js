import normalizeColor from 'normalize-css-color';

const processColor = (color, opacity = 1) => {
  if (
    color === undefined ||
    color === null ||
    (opacity === 1 && typeof color === 'string' && color.charAt(0) !== '#')
  ) {
    return color;
  }

  // convert number and hex
  const int32Color = normalizeColor(color);
  if (int32Color === null) {
    return undefined;
  }

  // convert 0xrrggbbaa into rgba
  const rgba = normalizeColor.rgba(int32Color);
  rgba.a = rgba.a.toFixed(1);
  const { r, g, b, a } = rgba;
  return `rgba(${r},${g},${b},${a * opacity})`;
};

module.exports = processColor;
