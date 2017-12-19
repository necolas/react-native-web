# Performance

To run these benchmarks from the root of the project:

```
yarn benchmark
open ./benchmarks/index.html
```

Append `?fastest` to the URL to include the fastest "other libraries", and
`?all` to include all the "other libraries".

## Notes

The components used in the render benchmarks are simple enough to be
implemented by multiple UI or style libraries. The implementations are not
equivalent in functionality. For example, the "React Native for Web" benchmark includes a
complete `View` implementation and the `StyleSheet` also converts React Native
styles to DOM styles, has deterministic resolution, and supports RTL layout.

## Benchmark results

Typical render timings*: mean ± two standard deviations.

| Implementation                        | Deep tree (ms)    | Wide tree (ms)    | Tweets (ms)       |
| :--- | ---: | ---: | ---: |
| `css-modules`                         |  `80.47` `±25.13` | `144.87` `±32.70` | |
| `react-native-web@0.1.16`             |  `88.68` `±28.78` | `178.17` `±39.90` | `13.78` `±2.90ms` |

Other libraries

| Implementation                        | Deep tree (ms)    | Wide tree (ms)    |
| :--- | ---: | ---: |
| `styletron@3.0.0-rc.5`                |  `79.41` `±27.49` | `152.95` `±29.46` |
| `aphrodite@1.2.5`                     |  `85.13` `±25.39` | `162.87` `±25.91` |
| `glamor@2.20.40`                      | `109.92` `±29.88` | `193.01` `±32.03` |
| `react-jss@8.2.0`                     | `134.28` `±49.00` | `278.78` `±50.39` |
| `emotion@8.0.12`                      | `139.08` `±46.18` | `253.45` `±52.69` |
| `styled-components@2.3.2`             | `194.43` `416.28` | `404.86` `±56.59` |
| `reactxp@0.46.6`                      | `219.46` `±57.24` | `424.18` `±76.10` |
| `radium@0.19.6`                       | `359.32` `±90.27` | `795.91` `±88.93` |

These results indicate that render times when using `react-native-web`,
`css-modules`, `aphrodite`, and `styletron` are roughly equivalent and
significantly faster than alternatives.

*MacBook Pro (13-inch, Early 2011); 2.3 GHz Intel Core i5; 8 GB 1333 MHz DDR3. Google Chrome 62.
