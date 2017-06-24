# Performance

To run these benchmarks:

```
npm run build:performance
open ./performance/index.html
```

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
| `css-modules`                         |  `94.96` `±31.01` | `200.43` `±38.90` | |
| `react-native-web/stylesheet@0.0.107` |  `98.58` `±10.83` | `218.59` `±36.52` | |
| `react-native-web@0.0.107`            | `117.45` `±18.76` | `288.27` `±33.50` | `15.10` `±5.45ms` |

Other libraries

| Implementation                       | Deep tree (ms)    | Wide tree (ms)    |
| :--- | ---: | ---: |
| `styletron@2.5.1`                    |  `90.38` `±15.15` | `197.40` `±29.02` |
| `aphrodite@1.2.0`                    |  `88.65` `±19.62` | `187.35` `±24.60` |
| `glamor@3.0.0-1`                     | `145.64` `±21.93` | `283.60` `±23.26` |
| `react-jss@5.4.1`                    | `143.17` `±19.14` | `361.80` `±33.39` |
| `reactxp@0.34.3`                     | `227.18` `±28.75` | `496.08` `±59.96` |
| `styled-components@2.1.0`            | `262.85` `±46.12` | `578.43` `±35.86` |
| `styled-components/primitives@2.1.0` | `261.43` `±44.14` | `569.65` `±22.19` |

These results indicate that render performance is not a significant
differentiating factor between `aphrodite`, `styletron`, and
`react-native-web/stylesheet`.

*MacBook Pro (13-inch, Early 2015); 3.1 GHz Intel Core i7; 16 GB 1867 MHz DDR3. Google Chrome 58 (2x CPU slowdown).
