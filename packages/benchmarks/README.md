# benchmarks

To run these benchmarks:

```
yarn benchmark
```

To run benchmarks for individual implementations append `?<name>,<name>` to the
URL, e.g., `?css-modules,react-native-web`.

## Notes

These benchmarks are crude approximations of extreme cases that libraries may
encounter. The deep and wide tree cases look at the performance of mounting and
rendering large trees of styled elements. The Triangle cases looks at the
performance of repeated updates to a large mounted tree. Libraries without
support for dynamic styles (i.e., they rely on inline styles) do not include
the `SierpinskiTriangle` benchmark.

The components used in the render benchmarks are simple enough to be
implemented by multiple UI or style libraries. The benchmark implementations
and the features of the style libraries are not equivalent in functionality.

## Results

Typical render timings*: mean ± two standard deviations.

| Implementation                        | Deep tree (ms)    | Wide tree (ms)    | Triangle (ms)       |
| :--- | ---: | ---: | ---: |
| `css-modules`                         |  `80.47` `±25.13` | `144.87` `±32.70` | |
| `react-native-web@0.2.2`              |  `88.68` `±28.78` | `178.17` `±39.90` | `` `±` |
| `inline-styles`                       |  `` `±` | `` `±` | |

Other libraries

| Implementation                        | Deep tree (ms)    | Wide tree (ms)    |
| :--- | ---: | ---: |
| `styletron@3.0.0-rc.5`                |  `84.32` `±32.55` | `163.21` `±29.46` |
| `aphrodite@1.2.5`                     |  `85.13` `±25.39` | `162.87` `±25.91` |
| `glamor@2.20.40`                      | `109.92` `±29.88` | `193.01` `±32.03` |
| `react-jss@8.2.0`                     | `134.28` `±49.00` | `278.78` `±50.39` |
| `emotion@8.0.12`                      | `139.08` `±46.18` | `253.45` `±52.69` |
| `styled-components@2.3.2`             | `194.43` `±46.28` | `404.86` `±56.59` |
| `reactxp@0.46.6`                      | `219.46` `±57.24` | `424.18` `±76.10` |
| `radium@0.19.6`                       | `359.32` `±90.27` | `795.91` `±88.93` |

These results indicate that render times when using `react-native-web`,
`css-modules`, `aphrodite`, and `styletron` are roughly equivalent and
significantly faster than alternatives.

*MacBook Pro (13-inch, Early 2011); 2.3 GHz Intel Core i5; 8 GB 1333 MHz DDR3. Google Chrome 62.
