/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ElementRef } from 'react';

import * as React from 'react';
import canUseDOM from '../canUseDom';
import useLayoutEffect from '../useLayoutEffect';

type TextLayoutLine = {|
  ascender: number,
  capHeight: number,
  descender: number,
  height: number,
  width: number,
  x: number,
  xHeight: number,
  y: number
|};

type TextLayoutEvent = {
  nativeEvent: {
    lines: Array<TextLayoutLine>,
    target?: any
  },
  timeStamp: number
};

type TextLayoutHandler = (e: TextLayoutEvent) => mixed;

type LineRect = {|
  bottom: number,
  left: number,
  right: number,
  top: number
|};

const emptyArray = [];
const minimumLineOverlapRatio = 0.5;

function round(value) {
  return Math.round(value * 1000) / 1000;
}

function getRectList(node): Array<ClientRect | DOMRect> {
  if (!canUseDOM || typeof document.createRange !== 'function') {
    return emptyArray;
  }

  const range = document.createRange();
  range.selectNodeContents(node);
  const rects = Array.prototype.slice.call(range.getClientRects());

  if (typeof range.detach === 'function') {
    range.detach();
  }

  return rects;
}

function groupLineRects(rects: Array<ClientRect | DOMRect>): Array<LineRect> {
  const lines: Array<LineRect> = [];

  rects.forEach((rect) => {
    if (rect.width === 0 && rect.height === 0) {
      return;
    }

    let overlappingIndex = -1;
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const overlap =
        Math.min(line.bottom, rect.bottom) - Math.max(line.top, rect.top);
      const minHeight = Math.min(
        line.bottom - line.top,
        rect.bottom - rect.top
      );
      if (overlap >= minHeight * minimumLineOverlapRatio) {
        overlappingIndex = i;
        break;
      }
    }

    if (overlappingIndex > -1) {
      const line = lines[overlappingIndex];
      lines[overlappingIndex] = {
        bottom: Math.max(line.bottom, rect.bottom),
        left: Math.min(line.left, rect.left),
        right: Math.max(line.right, rect.right),
        top: Math.min(line.top, rect.top)
      };
    } else {
      lines.push({
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        top: rect.top
      });
    }
  });

  return lines.sort((a, b) => a.top - b.top || a.left - b.left);
}

function createTextLayoutLines(node): Array<TextLayoutLine> {
  const nodeRect = node.getBoundingClientRect();
  const lineRects = groupLineRects(getRectList(node));

  return lineRects.map((rect) => {
    const height = round(rect.bottom - rect.top);
    return {
      ascender: height,
      capHeight: height,
      descender: 0,
      height,
      width: round(rect.right - rect.left),
      x: round(rect.left - nodeRect.left),
      xHeight: height,
      y: round(rect.top - nodeRect.top)
    };
  });
}

function areLinesEqual(
  first: ?Array<TextLayoutLine>,
  second: Array<TextLayoutLine>
): boolean {
  if (first == null || first.length !== second.length) {
    return false;
  }

  for (let i = 0; i < first.length; i += 1) {
    const a = first[i];
    const b = second[i];
    if (
      a.ascender !== b.ascender ||
      a.capHeight !== b.capHeight ||
      a.descender !== b.descender ||
      a.height !== b.height ||
      a.width !== b.width ||
      a.x !== b.x ||
      a.xHeight !== b.xHeight ||
      a.y !== b.y
    ) {
      return false;
    }
  }

  return true;
}

export default function useTextLayout(
  ref: ElementRef<any>,
  onTextLayout?: ?TextLayoutHandler
) {
  const callbackRef = React.useRef(onTextLayout);
  const lastLinesRef = React.useRef(null);
  const isEnabledRef = React.useRef(false);
  const isEnabled = typeof onTextLayout === 'function';

  callbackRef.current = onTextLayout;

  const measure = React.useCallback(() => {
    const node = ref.current;
    const callback = callbackRef.current;

    if (node == null || typeof callback !== 'function') {
      return;
    }

    const lines = createTextLayoutLines(node);
    if (areLinesEqual(lastLinesRef.current, lines)) {
      return;
    }

    lastLinesRef.current = lines;

    const event: TextLayoutEvent = {
      nativeEvent: {
        lines
      },
      timeStamp: Date.now()
    };
    Object.defineProperty(event.nativeEvent, 'target', {
      enumerable: true,
      get: () => node
    });
    callback(event);
  }, [ref]);

  useLayoutEffect(() => {
    if (!isEnabled) {
      isEnabledRef.current = false;
      lastLinesRef.current = null;
      return;
    }
    if (!isEnabledRef.current) {
      lastLinesRef.current = null;
      isEnabledRef.current = true;
      measure();
    }
  }, [isEnabled, measure]);

  useLayoutEffect(() => {
    const node = ref.current;
    if (
      node == null ||
      !isEnabled ||
      !canUseDOM ||
      typeof window.ResizeObserver === 'undefined'
    ) {
      return;
    }

    const observer = new window.ResizeObserver(measure);
    observer.observe(node);
    if (node.parentElement != null) {
      observer.observe(node.parentElement);
    }
    return () => {
      observer.disconnect();
    };
  }, [isEnabled, measure, ref]);
}
