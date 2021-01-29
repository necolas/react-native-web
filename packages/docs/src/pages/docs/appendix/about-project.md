---
title: About the project
date: Last Modified
permalink: /docs/about-project/index.html
description: 
eleventyNavigation:
  key: About the project
  parent: Appendix
  order: 2
---

:::lead
{{ site.name }}'s origins, evolution, and development.
:::

{{ site.name }} was started in 2015 by [Nicolas Gallagher](http://nicolasgallagher.com) during the development of [Twitter's Progressive Web App](https://blog.twitter.com/engineering/en_us/topics/open-source/2017/how-we-built-twitter-lite.html). It has evolved from a framework inspired by React Native into a mature and pragmatic compatibility layer between React DOM and React Native.

{{ site.name }} is currently used in production Web apps by companies including [Twitter](https://twitter.com), [Flipkart](https://twitter.com/naqvitalha/status/969577892991549440), [Uber](https://www.youtube.com/watch?v=RV9rxrNIxnY), and [Major League Soccer](https://matchcenter.mlssoccer.com). Software engineers from Facebook, Twitter, and Expo continue to contribute design and patches to the project.

Developing a Web compatibility layer for React Native involves balancing the needs of high-quality Web apps with the value of React Native API compatibility. There are instances where parts of the React Native API are co-opted to infer information that is necessary or beneficial to products running in Web browsers. Other times there are use cases that are not accomodated by the APIs provided; even when that information cannot be pragmatically incorporated into the existing React Native API design constraints, it still helps to inform which API changes are needed over the long term.

The evolution of React Native now involves developers who work on React Native for Android, iOS, Web, Windows, and macOS. We aim to help designers and developers with shared, platform-agnostic React APIs that reduce time to market for high-quality, multi-platform products.

Please browse the [source code]({{ site.githubUrl }}) and consider contributing your experience to the project.
