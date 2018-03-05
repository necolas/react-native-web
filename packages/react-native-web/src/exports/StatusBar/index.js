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


const {head} = canUseDOM && document

let _barStyle = 'default'
let _hidden = false
let _translucent = false


function setMetaTag(attrName, content) {
  if(!canUseDOM) return

  let tag = head.querySelector(`meta[name=${attrName}]`)

  if(!tag) {
    tag = document.createElement('meta')
    tag.name = attrName

    head.appendChild(tag)
  }

  tag.content = content
}

function setAppleMobileWebAppCapable() {
  setMetaTag('apple-mobile-web-app-capable',
    (_hidden || _translucent || _barStyle !== 'default') ? 'yes' : 'no')
}

function setAppleMobileWebAppStatusBarStyle() {
  setAppleMobileWebAppCapable()

  setMetaTag('apple-mobile-web-app-status-bar-style',
    _translucent ? 'black-translucent' : _barStyle)
}


export default class StatusBar extends Component<*> {
  static get currentHeight() {
    if(!canUseDOM) return

    const {availHeight, height} = window.screen

    return height - availHeight
  }


  static setBackgroundColor(color, animated) {
    setMetaTag('theme-color', color)
  }

  static setBarStyle(style, animated) {
    if(style === 'light-content') style = 'black'

    if(style === 'black' || style === 'black-translucent' || style === 'default') {
      _barStyle = style

      setAppleMobileWebAppStatusBarStyle()
    }
  }

  static setHidden(hidden, animation) {
    _hidden = hidden

    setAppleMobileWebAppCapable()
  }

  static setNetworkActivityIndicatorVisible() {}

  static setTranslucent(translucent) {
    _translucent = translucent

    setAppleMobileWebAppStatusBarStyle()
  }


  render() {
    const {animated, backgroundColor, barStyle, hidden,
      networkActivityIndicatorVisible, showHideTransition,
      translucent} = this.props

    if(barStyle) StatusBar.setBarStyle(barStyle, animated)
    if(backgroundColor) StatusBar.setBackgroundColor(backgroundColor, animated)
    if(hidden) StatusBar.setHidden(hidden, animated)
    if(networkActivityIndicatorVisible) StatusBar.setNetworkActivityIndicatorVisible(networkActivityIndicatorVisible)
    if(translucent) StatusBar.setTranslucent(translucent)

    return null;
  }
}
