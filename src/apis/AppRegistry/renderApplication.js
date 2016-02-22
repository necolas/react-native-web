/**
 * Copyright (c) 2015-present, Nicolas Gallagher.
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * @flow
 */

import invariant from 'fbjs/lib/invariant'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import ReactNativeApp from './ReactNativeApp'
import StyleSheet from '../../apis/StyleSheet'

const renderStyleSheetToString = () => `<style id="${StyleSheet.elementId}">${StyleSheet._renderToString()}</style>`

export default function renderApplication(RootComponent: Component, initialProps: Object, rootTag: any) {
  invariant(rootTag, 'Expect to have a valid rootTag, instead got ', rootTag)

  // insert style sheet if needed
  const styleElement = document.getElementById(StyleSheet.elementId)
  if (!styleElement) { rootTag.insertAdjacentHTML('beforebegin', renderStyleSheetToString()) }

  const component = (
    <ReactNativeApp
      initialProps={initialProps}
      rootComponent={RootComponent}
      rootTag={rootTag}
    />
  )
  ReactDOM.render(component, rootTag)
}

export function prerenderApplication(RootComponent: Component, initialProps: Object): string {
  const component = (
    <ReactNativeApp
      initialProps={initialProps}
      rootComponent={RootComponent}
    />
  )
  const html = ReactDOMServer.renderToString(component)
  const style = renderStyleSheetToString()
  return { html, style }
}
