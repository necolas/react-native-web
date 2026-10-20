---
title: TypeScript support
date: Last Modified
permalink: /docs/typescript-support/index.html
eleventyNavigation:
  key: TypeScript support
  parent: Start
  order: 6
---

:::lead
How to add TypeScript support to your project.
:::

`react-native-web` includes types that augment the `react-native` types (0.88 or later) with web-only props and styles.

---

## Setup

Add `react-native-web/types` to the `types` compiler option in the `tsconfig.json` file.

```json
{
  "compilerOptions": {
    "types": ["react-native-web/types"]
  }
}
```

You can also add a reference to `react-native-web/types` in a `.d.ts` file of your project (e.g., `env.d.ts`).

```ts
/// <reference types="react-native-web/types" />
```

---

## Usage

Now you can use `react-native` components in your project with TS support to `react-native-web` props and styles :tada:

```jsx
import { View, type ViewStyle } from 'react-native';

const style: ViewStyle = {
  position: 'fixed', // RN style properties are augmented with web-only options e.g. 'fixed'
  transitionDuration: '200ms' // Web-only style properties are also available
};

<View
  href="https://necolas.github.io/react-native-web/" // RNW prop
  style={style}
/>;
```
