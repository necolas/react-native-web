'use strict';

var unitlessNumbers = {
  boxFlex: true,
  boxFlexGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  fontWeight: true,
  lineClamp: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related
  fillOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
};

var normalizeValue = function normalizeValue(property, value) {
  if (!unitlessNumbers[property] && typeof value === 'number') {
    value = value + 'px';
  }
  return value;
};

module.exports = normalizeValue;