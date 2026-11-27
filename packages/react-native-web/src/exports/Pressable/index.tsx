/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import {
  type ComponentRef,
  type FocusEvent,
  type FunctionComponent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type Ref,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react';

import useHover, { type HoverEventsConfig } from '../../modules/useHover';
import useMergeRefs from '../../modules/useMergeRefs';
import usePressEvents from '../../modules/usePressEvents';
import type { PressResponderConfig } from '../../modules/usePressEvents/PressResponder';
import type { PlatformMethods } from '../../types';
import StyleSheet from '../StyleSheet';
import View, { type ViewProps } from '../View';

export type StateCallbackType = Readonly<{
  focused: boolean;
  hovered: boolean;
  pressed: boolean;
}>;

type ViewStyleProp = ViewProps['style'];

type Props = Omit<ViewProps, 'children' | 'style' | 'unstable_type'> & {
  children?: ReactNode | ((state: StateCallbackType) => ReactNode);
  // Duration (in milliseconds) from `onPressIn` before `onLongPress` is called.
  delayLongPress?: number;
  // Duration (in milliseconds) from `onPressStart` is called after pointerdown
  delayPressIn?: number;
  // Duration (in milliseconds) from `onPressEnd` is called after pointerup.
  delayPressOut?: number;
  // Whether the press behavior is disabled.
  disabled?: boolean;
  // Called when the view is hovered
  onHoverIn?: HoverEventsConfig['onHoverStart'];
  // Called when the view is no longer hovered
  onHoverOut?: HoverEventsConfig['onHoverEnd'];
  // Called when this view's layout changes
  onLayout?: ViewProps['onLayout'];
  // Called when a long-tap gesture is detected.
  onLongPress?: PressResponderConfig['onLongPress'];
  // Called when a single tap gesture is detected.
  onPress?: PressResponderConfig['onPress'];
  // Called when a touch is engaged, before `onPress`.
  onPressIn?: PressResponderConfig['onPressStart'];
  // Called when a touch is moving, after `onPressIn`.
  onPressMove?: PressResponderConfig['onPressMove'];
  // Called when a touch is released, before `onPress`.
  onPressOut?: PressResponderConfig['onPressEnd'];
  // Ref to the underlying host view.
  ref?: Ref<ComponentRef<typeof View>>;
  // Style, or a function that receives the interaction state and returns a style.
  style?: ViewStyleProp | ((state: StateCallbackType) => ViewStyleProp);
  // The `type` attribute of the rendered element.
  type?: ViewProps['unstable_type'];
  /**
   * Used only for documentation or testing (e.g. snapshot testing).
   */
  testOnly_hovered?: boolean;
  testOnly_pressed?: boolean;
};

/**
 * Component used to build display components that should respond to whether the
 * component is currently pressed or not.
 */
function Pressable(props: Props): ReactNode {
  const {
    children,
    delayLongPress,
    delayPressIn,
    delayPressOut,
    disabled,
    onBlur,
    onContextMenu,
    onFocus,
    onHoverIn,
    onHoverOut,
    onKeyDown,
    onLongPress,
    onPress,
    onPressMove,
    onPressIn,
    onPressOut,
    ref,
    style,
    tabIndex,
    testOnly_hovered,
    testOnly_pressed,
    type,
    ...rest
  } = props;

  const [hovered, setHovered] = useForceableState(testOnly_hovered === true);
  const [focused, setFocused] = useForceableState(false);
  const [pressed, setPressed] = useForceableState(testOnly_pressed === true);

  const hasStateCallback =
    typeof children === 'function' || typeof style === 'function';

  const hostRef = useRef<(HTMLElement & PlatformMethods) | null>(null);
  const setRef = useMergeRefs(ref, hostRef);

  const pressConfig = useMemo(
    () => ({
      delayLongPress,
      delayPressStart: delayPressIn,
      delayPressEnd: delayPressOut,
      disabled,
      onLongPress,
      onPress,
      onPressChange: hasStateCallback ? setPressed : null,
      onPressStart: onPressIn,
      onPressMove,
      onPressEnd: onPressOut
    }),
    [
      delayLongPress,
      delayPressIn,
      delayPressOut,
      disabled,
      onLongPress,
      onPress,
      onPressIn,
      onPressMove,
      onPressOut,
      setPressed,
      hasStateCallback
    ]
  );

  const pressEventHandlers = usePressEvents(pressConfig);

  const { onContextMenu: onContextMenuPress, onKeyDown: onKeyDownPress } =
    pressEventHandlers;

  useHover(hostRef, {
    disabled,
    onHoverChange: hasStateCallback ? setHovered : null,
    onHoverStart: onHoverIn,
    onHoverEnd: onHoverOut
  });

  const interactionState = { hovered, focused, pressed };

  const blurHandler = useCallback(
    (e: FocusEvent<HTMLElement>) => {
      if (e.nativeEvent.target === hostRef.current) {
        if (hasStateCallback) {
          setFocused(false);
        }
        if (onBlur != null) {
          onBlur(e);
        }
      }
    },
    [hostRef, setFocused, hasStateCallback, onBlur]
  );

  const focusHandler = useCallback(
    (e: FocusEvent<HTMLElement>) => {
      if (e.nativeEvent.target === hostRef.current) {
        if (hasStateCallback) {
          setFocused(true);
        }
        if (onFocus != null) {
          onFocus(e);
        }
      }
    },
    [hostRef, setFocused, hasStateCallback, onFocus]
  );

  const contextMenuHandler = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (onContextMenuPress != null) {
        onContextMenuPress(e);
      }
      if (onContextMenu != null) {
        onContextMenu(e);
      }
    },
    [onContextMenu, onContextMenuPress]
  );

  const keyDownHandler = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (onKeyDownPress != null) {
        onKeyDownPress(e);
      }
      if (onKeyDown != null) {
        onKeyDown(e);
      }
    },
    [onKeyDown, onKeyDownPress]
  );

  let _tabIndex: ViewProps['tabIndex'];
  if (tabIndex !== undefined) {
    _tabIndex = tabIndex;
  } else {
    _tabIndex = disabled ? -1 : 0;
  }

  return (
    <View
      {...rest}
      {...pressEventHandlers}
      aria-disabled={disabled ?? rest['aria-disabled']}
      disabled={disabled}
      onBlur={blurHandler}
      onContextMenu={contextMenuHandler}
      onFocus={focusHandler}
      onKeyDown={keyDownHandler}
      ref={setRef}
      style={[
        disabled ? styles.disabled : styles.active,
        typeof style === 'function' ? style(interactionState) : style
      ]}
      tabIndex={_tabIndex}
      unstable_type={type}
    >
      {typeof children === 'function' ? children(interactionState) : children}
    </View>
  );
}

function useForceableState(
  forced: boolean
): [boolean, (value: boolean) => void] {
  const [bool, setBool] = useState(false);
  return [bool || forced, setBool];
}

const styles = StyleSheet.create({
  active: {
    cursor: 'pointer',
    touchAction: 'manipulation'
  },
  disabled: {
    pointerEvents: 'box-none'
  }
});

const MemoedPressable: FunctionComponent<Props> = memo(Pressable);
MemoedPressable.displayName = 'Pressable';

export default MemoedPressable;
