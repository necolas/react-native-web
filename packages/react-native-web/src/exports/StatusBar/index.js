/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule StatusBar
 * @flow
 */
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { Component } from 'react';

import ColorPropType from '../ColorPropType';

type Props = {
  animated?: boolean,
  backgroundColor?: ColorPropType,
  barStyle?: StatusBarStyle,
  hidden?: boolean,
  networkActivityIndicatorVisible?: boolean,
  showHideTransition?: 'fade' | 'slide',
  translucent?: boolean
};
type StatusBarAnimation = 'none' | 'fade' | 'slide';
type StatusBarStyle = 'default' | 'light-content' | 'dark-content';

const { head } = document;

let _barStyle = 'default';
let _hidden = false;
let _translucent = false;

function setMetaTag(attrName, content) {
  if (!(canUseDOM && head)) return;

  let tag = head.querySelector(`meta[name=${attrName}]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.name = attrName;

    head.appendChild(tag);
  }

  if (tag instanceof HTMLMetaElement) tag.content = content;
}

function setAppleMobileWebAppCapable() {
  setMetaTag(
    'apple-mobile-web-app-capable',
    _hidden || _translucent || _barStyle !== 'default' ? 'yes' : 'no'
  );
}

function setAppleMobileWebAppStatusBarStyle() {
  setAppleMobileWebAppCapable();

  setMetaTag(
    'apple-mobile-web-app-status-bar-style',
    _translucent ? 'black-translucent' : _barStyle
  );
}

export default class StatusBar extends Component<Props> {
  static defaultProps = {
    showHideTransition: 'fade'
  };

  static get currentHeight(): ?number {
    if (!canUseDOM) return;

    const { availHeight, height } = window.screen;

    return height - availHeight;
  }

  static setBackgroundColor(color: string, animated?: boolean) {
    setMetaTag('theme-color', color);
  }

  static setBarStyle(style: StatusBarStyle, animated?: boolean) {
    _barStyle = style === 'light-content' ? 'black' : 'default';

    setAppleMobileWebAppStatusBarStyle();
  }

  static setHidden(hidden: boolean, animation?: StatusBarAnimation) {
    _hidden = hidden;

    setAppleMobileWebAppCapable();
  }

  static setNetworkActivityIndicatorVisible(visible: boolean) {}

  static setTranslucent(translucent: boolean) {
    _translucent = translucent;

    setAppleMobileWebAppStatusBarStyle();
  }

  render() {
    const {
      animated,
      backgroundColor,
      barStyle,
      hidden,
      networkActivityIndicatorVisible,
      showHideTransition,
      translucent
    } = this.props;

    if (backgroundColor) StatusBar.setBackgroundColor(backgroundColor, animated);
    if (barStyle) StatusBar.setBarStyle(barStyle, animated);
    if (hidden) StatusBar.setHidden(hidden, showHideTransition);
    if (networkActivityIndicatorVisible)
      StatusBar.setNetworkActivityIndicatorVisible(networkActivityIndicatorVisible);
    if (translucent) StatusBar.setTranslucent(translucent);

    return null;
  }
}
