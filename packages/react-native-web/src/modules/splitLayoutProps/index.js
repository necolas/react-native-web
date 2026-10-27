/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

// The React Native list, plus the logical props that the web also supports.
const layoutProps = {
  alignSelf: true,
  bottom: true,
  columnGap: true,
  end: true,
  flex: true,
  flexBasis: true,
  flexGrow: true,
  flexShrink: true,
  gap: true,
  height: true,
  inset: true,
  insetBlock: true,
  insetBlockEnd: true,
  insetBlockStart: true,
  insetInline: true,
  insetInlineEnd: true,
  insetInlineStart: true,
  left: true,
  margin: true,
  marginBlock: true,
  marginBlockEnd: true,
  marginBlockStart: true,
  marginBottom: true,
  marginEnd: true,
  marginHorizontal: true,
  marginInline: true,
  marginInlineEnd: true,
  marginInlineStart: true,
  marginLeft: true,
  marginRight: true,
  marginStart: true,
  marginTop: true,
  marginVertical: true,
  maxHeight: true,
  maxWidth: true,
  minHeight: true,
  minWidth: true,
  position: true,
  right: true,
  rowGap: true,
  start: true,
  top: true,
  transform: true,
  transformOrigin: true,
  width: true
};

/**
 * Splits a flat style in two: the props that place an element in its parent
 * (outer), and all other props (inner).
 */
export default function splitLayoutProps(style: ?Object): {
  inner: Object,
  outer: Object
} {
  const inner: { [string]: unknown } = {};
  const outer: { [string]: unknown } = {};
  if (style != null) {
    for (const prop of Object.keys(style)) {
      if (layoutProps[prop] === true) {
        outer[prop] = style[prop];
      } else {
        inner[prop] = style[prop];
      }
    }
  }
  return { inner, outer };
}
