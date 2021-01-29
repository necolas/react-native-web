---
title: Introduction to React Native for Web
date: Last Modified
permalink: /docs/index.html
eleventyNavigation:
  key: Introduction
  parent: Start
  order: 0
---

{% import "fragments/macros.html" as macro with context %}

:::lead
React Native for Web is a compatibility layer between React DOM and React Native. It can be used in new and existing apps, web-only and multi-platform apps.
:::

{{ site.name }} uses React DOM to accurately render React Native compatible JavaScript code in a web browser. This brings several powerful abstractions to web developers include a simple [styles in JavaScript API]({{ '/docs/stylesheet' | url }}), built-in [layout localization]({{ '/docs/localization' | url }}), and a [high-level gesture system]({{ '/docs/interactions/#responder-props-api' | url}}).

## Modern React

{{ site.name }} is made with modern React APIs including function components and hooks. It builds upon React DOM, making it straight-forward for React DOM apps to incrementally adopt the framework (as was done by Twitter and Flipkart.) The project aims to provide broad compatibility with React alternatives, but will continue to evolve with React as APIs like Concurrent Mode and Server Components are introduced.

## Modern Web

{{ site.name }} makes direct use of native DOM APIs to implement specific features. As the Web platform improves, so does {{ site.name }}. Although certains APIs in the project have remained unchanged since inception, the implementations have become smaller and faster by migrating to new DOM APIs as they became broadly available in browsers.

## Components

{{ site.name }} provides all the core components you'd expect from React Native. You will mostly work with `View`, `Image`, `Text`, `TextInput`, and `ScrollView`. The core components include props for working with interactions, including the advanced gesture [responder system]({{ '/docs/interactions' | url }}). Each component's documentation contains live and editable examples to try out. 

React Native for Web exports many different modules to support a variety of use cases. Your application can use as many or as few of these modules as needed. The babel plugin will help you to only bundle the modules that you are using.

## Styles

{{ site.name }} components use JavaScript to author styles which are converted to native CSS. The design of this styling system avoids *all* the [problems with CSS at scale](https://speakerdeck.com/vjeux/react-css-in-js) and produces highly optimized CSS without the need to learn a domain-specific styling language and without the need for specialized tooling that parses markup to remove unused styles.

## Reliable and tested

{{ site.name }} is thoroughly unit and production tested. Significant changes are first published as canary releases to limit regressions and gather feedback from partners. Pull requests record changes to the compressed file size of each module in the library.
