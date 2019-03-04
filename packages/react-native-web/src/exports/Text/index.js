/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import applyLayout from '../../modules/applyLayout';
import applyNativeMethods from '../../modules/applyNativeMethods';
import { bool } from 'prop-types';
import { Component } from 'react';
import nullthrows from 'nullthrows';
import createElement from '../createElement';
import StyleSheet from '../StyleSheet';
import TextPropTypes from './TextPropTypes';
import Touchable from '../Touchable';

type ResponseHandlers = {|
  onStartShouldSetResponder: () => boolean,
  onResponderGrant: (event: *, dispatchID: string) => void,
  onResponderMove: (event: *) => void,
  onResponderRelease: (event: *) => void,
  onResponderTerminate: (event: *) => void,
  onResponderTerminationRequest: () => boolean
|};

const isTouchable = (props: *): boolean =>
  props.onPress != null || props.onLongPress != null || props.onStartShouldSetResponder != null;

const PRESS_RECT_OFFSET = { top: 20, left: 20, right: 20, bottom: 30 };

class Text extends Component<*, *> {
  static displayName = 'Text';

  static propTypes = TextPropTypes;

  static childContextTypes = {
    isInAParentText: bool
  };

  static contextTypes = {
    isInAParentText: bool
  };

  static getDerivedStateFromProps(nextProps: *, prevState: *): * | null {
    return prevState.responseHandlers == null && isTouchable(nextProps)
      ? {
          responseHandlers: prevState.createResponderHandlers()
        }
      : null;
  }

  constructor(props) {
    super(props);
    if (isTouchable(props)) this._attachTouchHandlers();
  }

  state = {
    ...Touchable.Mixin.touchableGetInitialState(),
    isHighlighted: false,
    createResponderHandlers: this._createResponseHandlers.bind(this),
    responseHandlers: null
  };

  // Flow definitions for touchable events
  touchableGetPressRectOffset: ?() => *;
  touchableHandleActivePressIn: ?() => void;
  touchableHandleActivePressOut: ?() => void;
  touchableHandleKeyEvent: ?(event: *) => void;
  touchableHandleLongPress: ?(event: *) => void;
  touchableHandlePress: ?(event: *) => void;
  touchableHandleResponderGrant: ?(event: *, dispatchID: string) => void;
  touchableHandleResponderMove: ?(event: *) => void;
  touchableHandleResponderRelease: ?(event: *) => void;
  touchableHandleResponderTerminate: ?(event: *) => void;
  touchableHandleResponderTerminationRequest: ?() => boolean;
  touchableHandleStartShouldSetResponder: ?() => boolean;

  getChildContext() {
    return { isInAParentText: true };
  }

  render() {
    const {
      dir,
      numberOfLines,
      selectable,
      style,
      /* eslint-disable */
      adjustsFontSizeToFit,
      allowFontScaling,
      ellipsizeMode,
      lineBreakMode,
      minimumFontScale,
      onLayout,
      onLongPress,
      onPress,
      pressRetentionOffset,
      selectionColor,
      suppressHighlighting,
      textBreakStrategy,
      tvParallaxProperties,
      /* eslint-enable */
      ...otherProps
    } = this.props;

    const { isInAParentText } = this.context;

    if (isTouchable(this.props)) {
      otherProps.accessible = true;
      otherProps.onKeyDown = this.touchableHandleKeyEvent;
      otherProps.onKeyUp = this.touchableHandleKeyEvent;
      otherProps.onResponderGrant = this.touchableHandleResponderGrant;
      otherProps.onResponderMove = this.touchableHandleResponderMove;
      otherProps.onResponderRelease = this.touchableHandleResponderRelease;
      otherProps.onResponderTerminate = this.touchableHandleResponderTerminate;
      otherProps.onResponderTerminationRequest = this.touchableHandleResponderTerminationRequest;
      otherProps.onStartShouldSetResponder = this.touchableHandleStartShouldSetResponder;
    }

    // allow browsers to automatically infer the language writing direction
    otherProps.dir = dir !== undefined ? dir : 'auto';
    otherProps.style = [
      styles.initial,
      this.context.isInAParentText === true && styles.isInAParentText,
      style,
      selectable === false && styles.notSelectable,
      numberOfLines === 1 && styles.singleLineStyle,
      isTouchable(this.props) && styles.pressable
    ];

    const component = isInAParentText ? 'span' : 'div';
    return createElement(component, otherProps);
  }

  _createResponseHandlers(): ResponseHandlers {
    return {
      onStartShouldSetResponder: (): boolean => {
        return isTouchable(this.props);
      },
      onResponderGrant: (event: *, dispatchID: string): void => {
        nullthrows(this.touchableHandleResponderGrant)(event, dispatchID);
        if (this.props.onResponderGrant != null) {
          this.props.onResponderGrant.call(this, event, dispatchID);
        }
      },
      onResponderMove: (event: *): void => {
        nullthrows(this.touchableHandleResponderMove)(event);
        if (this.props.onResponderMove != null) {
          this.props.onResponderMove.call(this, event);
        }
      },
      onResponderRelease: (event: *): void => {
        nullthrows(this.touchableHandleResponderRelease)(event);
        if (this.props.onResponderRelease != null) {
          this.props.onResponderRelease.call(this, event);
        }
      },
      onResponderTerminate: (event: *): void => {
        nullthrows(this.touchableHandleResponderTerminate)(event);
        if (this.props.onResponderTerminate != null) {
          this.props.onResponderTerminate.call(this, event);
        }
      },
      onResponderTerminationRequest: (): boolean => {
        const { onResponderTerminationRequest } = this.props;
        if (!nullthrows(this.touchableHandleResponderTerminationRequest)()) {
          return false;
        }
        if (onResponderTerminationRequest == null) {
          return true;
        }
        return onResponderTerminationRequest();
      }
    };
  }

  /**
   * Lazily attaches Touchable.Mixin handlers.
   */
  _attachTouchHandlers(): void {
    if (this.touchableGetPressRectOffset != null) {
      return;
    }
    for (const key in Touchable.Mixin) {
      if (typeof Touchable.Mixin[key] === 'function') {
        (this: any)[key] = Touchable.Mixin[key].bind(this);
      }
    }
    this.touchableHandleActivePressIn = (): void => {
      if (!this.props.suppressHighlighting && isTouchable(this.props)) {
        this.setState({ isHighlighted: true });
      }
    };
    this.touchableHandleActivePressOut = (): void => {
      if (!this.props.suppressHighlighting && isTouchable(this.props)) {
        this.setState({ isHighlighted: false });
      }
    };
    this.touchableHandlePress = (event: *): void => {
      if (this.props.onPress != null) {
        this.props.onPress(event);
      }
    };
    this.touchableHandleLongPress = (event: *): void => {
      if (this.props.onLongPress != null) {
        this.props.onLongPress(event);
      }
    };
    this.touchableGetPressRectOffset = (): * =>
      this.props.pressRetentionOffset == null ? PRESS_RECT_OFFSET : this.props.pressRetentionOffset;
  }
}

const styles = StyleSheet.create({
  initial: {
    borderWidth: 0,
    boxSizing: 'border-box',
    color: 'inherit',
    display: 'inline',
    fontFamily: 'System',
    fontSize: 14,
    fontStyle: 'inherit',
    fontVariant: ['inherit'],
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    margin: 0,
    padding: 0,
    textDecorationLine: 'none',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  isInAParentText: {
    // inherit parent font styles
    fontFamily: 'inherit',
    fontSize: 'inherit',
    whiteSpace: 'inherit'
  },
  notSelectable: {
    userSelect: 'none'
  },
  pressable: {
    cursor: 'pointer'
  },
  singleLineStyle: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

export default applyLayout(applyNativeMethods(Text));
