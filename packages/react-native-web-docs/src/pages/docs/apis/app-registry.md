---
title: AppRegistry
date: Last Modified
permalink: /docs/app-registry/index.html
eleventyNavigation:
  key: AppRegistry
  parent: APIs
---

{% import "fragments/macros.html" as macro with context %}

:::lead
AppRegistry is the control point for registering, running, prerendering, and unmounting all apps.
:::

App root components should register themselves with `AppRegistry.`registerComponent. Apps can be run by invoking `AppRegistry.runApplication`.

```js
import { AppRegistry } from 'react-native';
```

---

## API

### Static methods

{% call macro.prop('getAppKeys', '() => Array<string>') %}
Returns an array of all registered app keys
{% endcall %}

{% call macro.prop('getApplication', '(key: string, params: AppParams) => ({ element, getStyleElement })') %}
A web-only method for server-side rendering to HTML and CSS. It returns an object containing the given application's `element` and `getStyleElement` function to get styles once the element is rendered.
{% endcall %}

{% call macro.prop('registerComponent', '(key: string, getComponent: () => React.Element) => void') %}
Register a component provider under the given `key`.
{% endcall %}

{% call macro.prop('registerConfig', '(configs: Array<AppConfig>) => void') %}
Register multiple applications.
{% endcall %}

{% call macro.prop('unmountApplicationComponentAtRootTag', 'rootTag: HTMLElement') %}
Called this function with the `rootTag` that was passed into `runApplication` in order to unmount it.
{% endcall %}

### AppConfig

{% call macro.prop('appKey', 'string') %}
The `key` under which the component is registered.
{% endcall %}

{% call macro.prop('component', '() => React.Element') %}
A function that returns a React element.
{% endcall %}

### AppParams

{% call macro.prop('callback', '?() => void') %}
Called when React rendering has finished.
{% endcall %}

{% call macro.prop('hydrate', '?boolean') %}
If the client should hydrate server-rendered HTML.
{% endcall %}

{% call macro.prop('initialProps', '?Object') %}
The initial props passed to the root component.
{% endcall %}

{% call macro.prop('mode', '"concurrent" | "legacy"') %}
Default is 'concurrent'. Setting to 'legacy' will make the app will behave as if it’s running React 17.
{% endcall %}

{% call macro.prop('rootTag', 'HTMLElement') %}
The native element into which the application is rendered.
{% endcall %}
