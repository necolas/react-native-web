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
| `css-modules`                         |  `84.19` `±14.69` | `183.37` `±22.98` | |
| `react-native-web/stylesheet@0.0.113` |  `88.83` `±14.31` | `185.54` `±24.62` | |
| `react-native-web@0.0.113`            | `110.45` `±19.63` | `251.53` `±32.52` | `15.52` `±7.93ms` |

Other libraries

| Implementation                       | Deep tree (ms)    | Wide tree (ms)    |
| :--- | ---: | ---: |
| `aphrodite@1.2.3`                    |  `84.68` `±18.80` | `180.62` `±41.98` |
| `styletron@2.5.1`                    |  `83.93` `±13.10` | `185.96` `±45.65` |
| `react-jss@7.0.1`                    | `174.75` `±30.87` | `411.77` `±83.83` |
| `glamor@3.0.0-3`                     | `255.21` `±45.68` | `545.74` `±107.79` |
| `reactxp@0.34.3`                     | `237.46` `±36.72` | `514.48` `±84.87` |
| `styled-components@2.1.1`            | `266.91` `±50.04` | `598.29` `±95.13` |
| `styled-components/primitives@2.1.1` | `266.62` `±50.39` | `567.13` `±68.12` |
| `radium@0.19.1`                      | `518.48` `±69.74` | `1058.85` `±120.85` |

These results indicate that styled render performance is not a significant
differentiating factor between `aphrodite`, `css-modules`, `react-native-web`,
and `styletron`.

*MacBook Pro (13-inch, Early 2015); 3.1 GHz Intel Core i7; 16 GB 1867 MHz DDR3. Google Chrome 58 (2x CPU slowdown).
