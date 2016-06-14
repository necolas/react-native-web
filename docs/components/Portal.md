# Portal

`Portal` is used to render modal content on top of everything else in the
application. It passes modal views all the way up to the root element created
by `AppRegistry.runApplication`.

There can only be one `Portal` instance rendered in an application, and this
instance is controlled by React Native for Web.

## Methods

static **allocateTag**()

Creates a new unique tag for the modal that your component is rendering. A
good place to allocate a tag is in `componentWillMount`. Returns a string. See
`showModal` and `closeModal`.

static **closeModal**(tag: string)

Remove a modal from the collection of modals to be rendered. The `tag` must
exactly match the tag previous passed to `showModal` to identify the React
component.

static **getOpenModals**()

Get an array of all the open modals, as identified by their tag string.

static **showModal**(tag: string, component: any)

Render a new modal. The `tag` must be unique as it is used to identify the
React component to render.  This same tag can later be used in `closeModal`.

## Examples

```js
import React, { Component } from 'react'
import { Portal, Text, Touchable } from 'react-native'

export default class PortalExample extends Component {
  componentWillMount() {
    this._portalTag = Portal.allocateTag()
  }

  render() {
    return (
      <Touchable onPress={this._handlePortalOpen.bind(this)}>
        <Text>Open portal</Text>
      </Touchable>
    )
  }

  _handlePortalClose(e) {
    Portal.closeModal(this._portalTag)
  }

  _handlePortalOpen(e) {
    Portal.showModal(this._portalTag, this._renderPortalContent())
  }

  _renderPortalContent() {
    return (
      <Touchable onPress={this._handlePortalClose.bind(this)}>
        <Text>Close portal</Text>
      </Touchable>
    )
  }
}
```
