/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import React, { useRef, useCallback, useEffect } from 'react';

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

import View from '../View';
import createElement from '../createElement';
import StyleSheet from '../StyleSheet';

/**
 * This Component is used to "wrap" the modal we're opening
 * so that changing focus via tab will never leave the document.
 *
 * This allows us to properly trap the focus within a modal
 * even if the modal is at the start or end of a document.
 */

const FocusBracket = () => {
  return createElement(
    'div',
    {
      style: styles.focusBracket,
      accessible: true,

      // Sets `aria-hidden` to true
      importantForAccessibility: 'no-hide-descendants',
      accessibilityRole: 'none',

      // `importantForAccessibility` being set to `no-hide-descendants`  will prevent
      // these two attributes from being set as needed.
      ['data-focusable']: true,
      tabIndex: 0
    }
  );
};

function attemptFocus(element: any) {
  try {
    element.focus();
  } catch (e) {
    // Do nothing
  }

  return document.activeElement === element;
}

function focusFirstDescendant(element: any) {
  for (let i = 0; i < element.childNodes.length; i++) {
    const child = element.childNodes[i];
    if (attemptFocus(child) || focusFirstDescendant(child)) {
      return true;
    }
  }
  return false;
}

function focusLastDescendant(element: any) {
  for (let i = element.childNodes.length - 1; i >= 0; i--) {
    const child = element.childNodes[i];
    if (attemptFocus(child) || focusLastDescendant(child)) {
      return true;
    }
  }
  return false;
}

export type ModalFocusTrapProps = {|
  children?: any,

  active?: boolean | () => boolean,
|};

const ModalFocusTrap = ({ active, children }: ModalFocusTrapProps) => {
  const trapElementRef = useRef();

  // Ref used to track trapping of focus and to prevent focus from leaving a modal
  // for accessibility reasons per W3CAG.
  const focusRef = useRef<{ trapFocusInProgress: boolean, lastFocusedElement: ?HTMLElement }>({
    trapFocusInProgress: false,
    lastFocusedElement: null
  });

  const trapFocus = useCallback(() => {
    // We should not trap focus if:
    // - The modal hasn't fully initialized with an HTMLElement ref
    // - Focus is already in the process of being trapped (eg, we're refocusing)
    // - isTrapActive prop being false-ish tells us to do nothing
    if (!trapElementRef.current || focusRef.current.trapFocusInProgress || !active) {
      return;
    }

    try {
      focusRef.current.trapFocusInProgress = true;

      // Only muck with the focus if the event target isn't within this modal
      if (document.activeElement instanceof Node && !trapElementRef.current.contains(document.activeElement)) {
        // To handle keyboard focusing we can make an assumption here.
        // If you're tabbing through the focusable elements, the previously
        // active element will either be the first or the last.
        //
        // If the previously selected element is the "first" descendant
        // and we're leaving it - this means that we should
        // be looping around to the other side of the modal.
        let hasFocused = focusFirstDescendant(trapElementRef.current);
        if (focusRef.current.lastFocusedElement === document.activeElement) {
          hasFocused = focusLastDescendant(trapElementRef.current);
        }

        // If we couldn't focus a new element then we need to blur the active element
        if (!hasFocused && document.activeElement) {
          document.activeElement.blur();
        }
      }
    } finally {
      focusRef.current.trapFocusInProgress = false;
    }

    focusRef.current.lastFocusedElement = document.activeElement;
  }, [active]);

  // Bind to the document itself for this component
  useEffect(() => {
    if (canUseDOM) {
      document.addEventListener('focus', trapFocus, true);
    }

    // Call the trapFocus callback at least once when this modal has been
    // re-rendered / trapFocus has changed!
    trapFocus();

    return () => {
      if (canUseDOM) {
        document.removeEventListener('focus', trapFocus, true);
      }
    };
  }, [trapFocus]);

  return (
    <>
      <FocusBracket />
      <View ref={trapElementRef}>
        {children}
      </View>
      <FocusBracket />
    </>
  );
};

export default ModalFocusTrap;

const styles = StyleSheet.create({
  focusBracket: {
    outlineStyle: 'none'
  }
});
