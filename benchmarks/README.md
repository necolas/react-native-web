# Performance

To run these benchmarks:

```
npm run build:performance
open ./performance/index.html
```

Append `?fastest` to the URL to include the fastest "other libraries", and
`?all` to include all the "other libraries".

## Notes

The components used in the render benchmarks are simple enough to be
implemented by multiple UI or style libraries. The implementations are not
equivalent in functionality. For example, React Native for Web's stylesheet is
unique in that it also converts React Native styles to DOM styles, has
deterministic resolution, and supports RTL layout.

`react-native-web/stylesheet` is a comparative baseline that implements a
simple `View` without much of React Native's functionality.

## Benchmark results

Typical render timings*: mean ± two standard deviations.

| Implementation                        | Deep tree (ms)    | Wide tree (ms)    | Tweets (ms)       |
| :--- | ---: | ---: | ---: |
| `css-modules`                         |  `88.83` `±18.63` | `198.79` `±22.98` | |
| `react-native-web/stylesheet@0.0.121` |  `91.17` `±19.29` | `209.67` `±32.38` | |
| `react-native-web@0.0.121`            | `124.21` `±16.84` | `264.55` `±38.75` | `16.90` `±7.30ms` |

Other libraries

| Implementation                       | Deep tree (ms)    | Wide tree (ms)    |
| :--- | ---: | ---: |
| `aphrodite@1.2.3`                    |  `91.73` `±41.63` | `197.72` `±44.90` |
| `styletron@2.5.1`                    |  `94.73` `±37.58` | `201.81` `±57.93` |
| `glamor@2.20.40`                     | `146.60` `±26.73` | `277.46` `±29.17` |
| `emotion@7.2.2`                      | `150.79` `±38.29` | `282.18` `±41.79` |
| `react-jss@7.1.0`                    | `201.83` `±34.65` | `428.61` `±47.8` |
| `reactxp@0.42.1`                     | `262.69` `±24.14` | `595.20` `±66.17` |
| `styled-components@2.1.2`            | `280.59` `±31.77` | `599.00` `±62.99` |
| `styled-components/primitives@2.1.2` | `291.74` `±48.96` | `606.57` `±78.18` |
| `radium@0.19.4`                      | `563.94` `±69.91` | `1139.18` `±152.59` |

These results indicate that style render performance is not a significant
differentiating factor between `aphrodite`, `css-modules`, `react-native-web`,
and `styletron`.

*MacBook Pro (13-inch, Early 2015); 3.1 GHz Intel Core i7; 16 GB 1867 MHz DDR3. Google Chrome 58 (2x CPU slowdown).
