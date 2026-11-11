/**
 * Copyright (c) Nicolas Gallagher
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ResponderDOMEvent } from './ResponderEventTypes';

import isSelectionValid from '../../modules/isSelectionValid';

const keyName = '__reactResponderId';

export type ResponderNode = HTMLElement & { __reactResponderId?: number, ... };

function getEventPath(domEvent: ResponderDOMEvent): Array<ResponderNode> {
  // The 'selectionchange' event always has the 'document' as the target.
  // Use the anchor node as the initial target to reconstruct a path.
  // (We actually only need the first "responder" node in practice.)
  if (domEvent.type === 'selectionchange') {
    const target = window.getSelection()?.anchorNode;
    return composedPathFallback(target);
  } else {
    // $FlowFixMe[incompatible-type] the path of a responder event contains host nodes
    return domEvent.composedPath();
  }
}

function composedPathFallback(target: ?Node): Array<ResponderNode> {
  const path: Array<ResponderNode> = [];
  while (target != null && target !== document.body) {
    // $FlowFixMe[incompatible-type] the path of a responder event contains host nodes
    path.push(target);
    target = target.parentNode;
  }
  return path;
}

/**
 * Retrieve the responderId from a host node
 */
function getResponderId(node: ?ResponderNode): ?number {
  if (node != null) {
    return node[keyName];
  }
  return null;
}

/**
 * Store the responderId on a host node
 */
export function setResponderId(node: ?ResponderNode, id: number) {
  if (node != null) {
    node[keyName] = id;
  }
}

/**
 * Filter the event path to contain only the nodes attached to the responder system
 */
export function getResponderPaths(domEvent: ResponderDOMEvent): {
  idPath: Array<number>,
  nodePath: Array<ResponderNode>
} {
  const idPath: Array<number> = [];
  const nodePath: Array<ResponderNode> = [];
  const eventPath = getEventPath(domEvent);
  for (let i = 0; i < eventPath.length; i++) {
    const node = eventPath[i];
    const id = getResponderId(node);
    if (id != null) {
      idPath.push(id);
      nodePath.push(node);
    }
  }
  return { idPath, nodePath };
}

/**
 * Walk the paths and find the first common ancestor
 */
export function getLowestCommonAncestor(
  pathA: Array<number>,
  pathB: Array<number>
): ?number {
  let pathALength = pathA.length;
  let pathBLength = pathB.length;
  if (
    // If either path is empty
    pathALength === 0 ||
    pathBLength === 0 ||
    // If the last elements aren't the same there can't be a common ancestor
    // that is connected to the responder system
    pathA[pathALength - 1] !== pathB[pathBLength - 1]
  ) {
    return null;
  }

  let itemA = pathA[0];
  let indexA = 0;
  let itemB = pathB[0];
  let indexB = 0;

  // If A is deeper, skip indices that can't match.
  if (pathALength - pathBLength > 0) {
    indexA = pathALength - pathBLength;
    itemA = pathA[indexA];
    pathALength = pathBLength;
  }

  // If B is deeper, skip indices that can't match
  if (pathBLength - pathALength > 0) {
    indexB = pathBLength - pathALength;
    itemB = pathB[indexB];
    pathBLength = pathALength;
  }

  // Walk in lockstep until a match is found
  let depth = pathALength;
  while (depth--) {
    if (itemA === itemB) {
      return itemA;
    }
    itemA = pathA[++indexA];
    itemB = pathB[++indexB];
  }
  return null;
}

/**
 * Determine whether any of the active touches are within the current responder.
 * This cannot rely on W3C `targetTouches`, as Safari doesn't implement it.
 */
export function hasTargetTouches(
  target: ResponderNode,
  touches: ?TouchList
): boolean {
  if (!touches || touches.length === 0) {
    return false;
  }
  for (let i = 0; i < touches.length; i++) {
    const node = touches[i].target;
    if (node != null) {
      // $FlowFixMe[incompatible-type] touch targets are DOM nodes
      if (target.contains(node)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Ignore 'selectionchange' and 'select' events that don't correspond with a person's intent to
 * select text.
 */
export function hasValidSelection(domEvent: ResponderDOMEvent): boolean {
  if (domEvent.type === 'selectionchange') {
    return isSelectionValid();
  }
  if (domEvent.type !== 'select') {
    return false;
  }

  try {
    // $FlowFixMe[prop-missing] select events target an input or a textarea
    // $FlowFixMe[incompatible-use] select events target an input or a textarea
    const { selectionStart, selectionEnd } = domEvent.target;

    if (
      typeof selectionStart === 'number' &&
      typeof selectionEnd === 'number'
    ) {
      return selectionStart !== selectionEnd;
    }
  } catch {
    // Some engines (historically Chrome/WebKit) throw InvalidStateError
    // when reading selection properties on unsupported types (e.g. type="number")
  }

  return true;
}

/**
 * Events are only valid if the primary button was used without specific modifier keys.
 */
export function isPrimaryPointerDown(domEvent: ResponderDOMEvent): boolean {
  const { altKey, button, buttons, ctrlKey, type } = domEvent;
  const isTouch = type === 'touchstart' || type === 'touchmove';
  const isPrimaryMouseDown =
    type === 'mousedown' && (button === 0 || buttons === 1);
  const isPrimaryMouseMove = type === 'mousemove' && buttons === 1;
  const noModifiers = altKey === false && ctrlKey === false;

  if (
    isTouch ||
    (isPrimaryMouseDown && noModifiers) ||
    (isPrimaryMouseMove && noModifiers)
  ) {
    return true;
  }
  return false;
}
