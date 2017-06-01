# AppRegistry

`AppRegistry` is the control point for registering, running, prerendering, and
unmounting all apps. App root components should register themselves with
`AppRegistry.registerComponent`. Apps can be run by invoking
`AppRegistry.runApplication` (see the [getting started guide](../guides/getting-started.md) for more details).

To "stop" an application when a view should be destroyed, call
`AppRegistry.unmountApplicationComponentAtRootTag` with the tag that was passed
into `runApplication`. These should always be used as a pair.

## Methods

(web) static **getApplication**(appKey:string, appParameters: object)

Returns the given application element. Use this for server-side rendering.
Return object is of type `{ element: ReactElement; stylesheet: ReactElement }`.
It's recommended that you use `sheetsheet` to render the style sheet in an app

static **registerConfig**(config: Array<AppConfig>)

Registry multiple applications. `AppConfig` is of type `{ appKey: string;
component: ComponentProvider; run?: Function }`.

static **registerComponent**(appKey: string, getComponentFunc: ComponentProvider)

Register a component provider under the given `appKey`.

static **registerRunnable**(appKey: string, run: Function)

Register a custom render function for an application. The function will receive
the `appParameters` passed to `runApplication`.

static **getAppKeys**()

Returns all registered app keys.

static **runApplication**(appKey: string, appParameters?: object)

Runs the application that was registered under `appKey`. The `appParameters`
must include the `rootTag` into which the application is rendered, and
optionally any `initialProps`.

static **unmountApplicationComponentAtRootTag**(rootTag: HTMLElement)

To "stop" an application when a view should be destroyed, call
`AppRegistry.unmountApplicationComponentAtRootTag` with the tag that was passed
into `runApplication`

## Example

```js
AppRegistry.registerComponent('MyApp', () => AppComponent)
AppRegistry.runApplication('MyApp', {
  initialProps: {},
  rootTag: document.getElementById('react-root')
})
```
