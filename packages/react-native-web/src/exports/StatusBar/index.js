/**
 * Copyright (c) 2016-present, Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule StatusBar
 * @flow
 */
import { Component } from 'react';


const {head} = document

let _barStyle = 'default'
let _hidden = false
let _translucent = false


function getMetaTag(attrName) {
  const htmlCollection = head.getElementsByTagName('meta')

  let tag = Array.from(htmlCollection).filter(({name}) => name === attrName)[0]

  if(!tag) {
    tag = document.createElement('meta')
    tag.name = attrName

    head.appendChild(tag)
  }

  return tag
}

function setAppleMobileWebAppCapable() {
  getMetaTag('apple-mobile-web-app-capable').content =
    (_hidden || _translucent || _barStyle !== 'default') ? 'yes' : 'no'
}

function setAppleMobileWebAppStatusBarStyle() {
  setAppleMobileWebAppCapable()

  getMetaTag('apple-mobile-web-app-status-bar-style').content =
    _translucent ? 'black-translucent' : _barStyle
}


export default class StatusBar extends Component<*> {
  static currentHeight = 0


  static setBackgroundColor(color, animated) {
    getMetaTag('theme-color').content = color
  }

  static setBarStyle(style, animated) {
    if(style === 'light-content') style = 'black'

    if(!['black', 'black-translucent', 'default'].includes(style)) return

    _barStyle = style

    setAppleMobileWebAppStatusBarStyle()
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
    return null;
  }
}
