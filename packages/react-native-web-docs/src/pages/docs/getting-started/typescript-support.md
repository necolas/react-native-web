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

The type definitions for `react-native-web` are available on [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-native-web).

---

## Installation

Simply install the following dependency in your project.

```shell
npm install --save-dev @types/react-native-web
```

The package comes with the `react-native-web` declaration types, so you can use it normally in your project.

```ts
import { AppRegistry } from 'react-native-web';
```

---

## Using it in React Native projects

To extend the `react-native` types, you have to supply `react-native-web` as a member of the `types` compiler option in the `tsconfig.json` file.

```json
{
  ...
  "compilerOptions": {
    "types": ["react-native-web"]
  }
}
```

Now you can use `react-native` components in your project with TS support to `react-native-web` props and styles :tada:

```jsx
import { View, ViewStyle } from 'react-native';

const style: ViewStyle = {
  position: "fixed", // RN style properties are augmented with Web-only options e.g. 'fixed'
  marginBlock: "auto", // All Web CSS style properties are also available to use
};

<View
  href="https://necolas.github.io/react-native-web/" // RNW prop
  style={style}
/>
```
