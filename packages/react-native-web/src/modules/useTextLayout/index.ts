/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useLayoutEffect, useRef } from 'react';

import type { Nullable, TextLayoutEvent, TextLayoutLine } from '../../types';

type FontMetrics = {
  ascender: number;
  capHeight: number;
  descender: number;
  xHeight: number;
};

const emptyFontMetrics: FontMetrics = {
  ascender: 0,
  capHeight: 0,
  descender: 0,
  xHeight: 0
};

const fontMetricsCache = new Map<string, FontMetrics>();
let canvasContext: Nullable<CanvasRenderingContext2D>;

function getFontMetrics(element: Element): FontMetrics {
  const { fontFamily, fontSize, fontStyle, fontWeight } =
    getComputedStyle(element);

  const font = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`;
  let metrics = fontMetricsCache.get(font);

  if (metrics != null) {
    return metrics;
  }

  canvasContext ??= document.createElement('canvas').getContext('2d');

  if (canvasContext == null) {
    return emptyFontMetrics;
  }

  canvasContext.font = font;

  const { fontBoundingBoxAscent, fontBoundingBoxDescent } =
    canvasContext.measureText('');

  metrics = {
    ascender: fontBoundingBoxAscent,
    capHeight: canvasContext.measureText('T').actualBoundingBoxAscent,
    descender: fontBoundingBoxDescent,
    xHeight: canvasContext.measureText('x').actualBoundingBoxAscent
  };

  fontMetricsCache.set(font, metrics);
  return metrics;
}

type LineBox = {
  metrics: FontMetrics;
  text: string;
  top: number;
  left: number;
  right: number;
  // Horizontal extent before the trailing whitespace
  inkLeft: number;
  inkRight: number;
};

const whitespaceRegex = /\s/;

export function measureTextLines(
  node: HTMLElement,
  numberOfLines: Nullable<number>
): Array<TextLayoutLine> {
  const style = getComputedStyle(node);
  const box = node.getBoundingClientRect();

  const contentHeight =
    box.height -
    Number.parseFloat(style.borderTopWidth) -
    Number.parseFloat(style.borderBottomWidth) -
    Number.parseFloat(style.paddingTop) -
    Number.parseFloat(style.paddingBottom);

  const originX =
    box.left + node.clientLeft + Number.parseFloat(style.paddingLeft);

  // Characters outside the padding box are hidden, as with `numberOfLines={1}`
  const clipX = style.overflowX !== 'visible';
  const clipLeft = box.left + node.clientLeft;
  const clipRight = clipLeft + node.clientWidth;

  const lineBoxes: Array<LineBox> = [];
  const range = document.createRange();
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);

  let lineBox: Nullable<LineBox> = null;
  let previousRect: Nullable<DOMRect> = null;

  for (
    let textNode = walker.nextNode();
    textNode != null;
    textNode = walker.nextNode()
  ) {
    let offset = 0;

    for (const char of textNode.nodeValue ?? '') {
      range.setStart(textNode, offset);
      offset += char.length;
      range.setEnd(textNode, offset);

      const rect = range.getClientRects()[0];

      if (rect == null) {
        if (lineBox != null) {
          lineBox.text += char;
        }
        continue;
      }

      if (clipX && (rect.right <= clipLeft || rect.left >= clipRight)) {
        continue;
      }

      const left = clipX ? Math.max(rect.left, clipLeft) : rect.left;
      const right = clipX ? Math.min(rect.right, clipRight) : rect.right;

      if (
        lineBox == null ||
        previousRect == null ||
        (rect.top > previousRect.top + 1 &&
          rect.bottom > previousRect.bottom + 1)
      ) {
        lineBox = {
          metrics: getFontMetrics(textNode.parentElement ?? node),
          text: '',
          top: rect.top,
          left,
          right: left,
          inkLeft: left,
          inkRight: left
        };

        lineBoxes.push(lineBox);
      }

      previousRect = rect;

      lineBox.text += char;
      lineBox.top = Math.min(lineBox.top, rect.top);
      lineBox.left = Math.min(lineBox.left, left);
      lineBox.right = Math.max(lineBox.right, right);

      if (!whitespaceRegex.test(char)) {
        lineBox.inkLeft = lineBox.left;
        lineBox.inkRight = lineBox.right;
      }
    }
  }

  const firstLineTop = lineBoxes[0]?.top ?? 0;

  const visibleLineBoxes =
    numberOfLines != null && numberOfLines > 0
      ? lineBoxes.slice(0, numberOfLines)
      : lineBoxes;

  return visibleLineBoxes.map(
    ({ metrics, text, top, inkLeft, inkRight }, index) => ({
      ...metrics,
      height: (lineBoxes[index + 1]?.top ?? firstLineTop + contentHeight) - top,
      text,
      width: inkRight - inkLeft,
      x: inkLeft - originX,
      y: top - firstLineTop
    })
  );
}

export default function useTextLayout(
  ref: { readonly current: Nullable<HTMLElement> },
  onTextLayout: Nullable<(e: TextLayoutEvent) => void>,
  numberOfLines: Nullable<number>
) {
  const onTextLayoutRef = useRef(onTextLayout);
  const hasOnTextLayout = onTextLayout != null;

  useLayoutEffect(() => {
    onTextLayoutRef.current = onTextLayout;
  });

  useLayoutEffect(() => {
    const node = ref.current;

    if (
      !hasOnTextLayout ||
      node == null ||
      typeof ResizeObserver === 'undefined'
    ) {
      return;
    }

    let previousLines = '';

    const measure = () => {
      if (node.getClientRects().length === 0) {
        return;
      }

      const lines = measureTextLines(node, numberOfLines);
      const serializedLines = JSON.stringify(lines);

      if (serializedLines !== previousLines) {
        previousLines = serializedLines;

        onTextLayoutRef.current?.({
          nativeEvent: { lines, target: node },
          timeStamp: Date.now()
        });
      }
    };

    // Fonts that finish loading change the glyph widths and font metrics
    const handleFontsLoadingDone = () => {
      fontMetricsCache.clear();
      measure();
    };

    const resizeObserver = new ResizeObserver(measure);
    const mutationObserver = new MutationObserver(measure);

    resizeObserver.observe(node);
    mutationObserver.observe(node, {
      attributeFilter: ['class', 'dir', 'lang', 'style'],
      childList: true,
      characterData: true,
      subtree: true
    });

    const fonts: FontFaceSet | undefined = document.fonts;
    fonts?.addEventListener('loadingdone', handleFontsLoadingDone);

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      fonts?.removeEventListener('loadingdone', handleFontsLoadingDone);
    };
  }, [ref, hasOnTextLayout, numberOfLines]);
}
