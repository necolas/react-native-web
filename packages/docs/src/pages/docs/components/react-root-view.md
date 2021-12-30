---
title: ReactRootView
date: Last Modified
permalink: /docs/react-root-view/index.html
eleventyNavigation:
  key: ReactRootView
  parent: Components
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Root view component react-native-web app. This components manages HTML content of the window (css styles, root componet, event handling). By default this component is create in the AppRegistry, but you can use it if you want to render the react content into different native window.
:::

```jsx
import { ImageBackground } from 'react-native';

<ReactRootView {...props}>{children}</ReactRootView>;
```

---

## API

### Props

{% call macro.prop('children', '?any') %}
The children of a View element can be other elements and must not include strings (or components that render down to strings).
{% endcall %}

{% call macro.prop('rootTag', '?HTMLElement') %}
The native element where the ReactRootView will be shown. 
{% endcall %}

