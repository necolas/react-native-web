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
performance of repeated style updates to a large mounted tree. Some libraries
must inject new styles for each "dynamic style", whereas others may not.
Libraries without support for dynamic styles (i.e., they rely on user-authored
inline styles) do not include the `SierpinskiTriangle` benchmark.

The components used in the render benchmarks are simple enough to be
implemented by multiple UI or style libraries. The benchmark implementations
and the features of the style libraries are _only approximately equivalent in
functionality_.

## Results

Typical render timings*: mean ± two standard deviations.

| Implementation                        | Deep tree (ms)    | Wide tree (ms)    | Triangle (ms)    |
| :--- | ---: | ---: | ---: |
| `react-native-web@0.2.2`              |  `89.67` `±28.51` | `167.46` `±27.03` | `65.40` `±19.50` |
| `css-modules`                         |  `77.42` `±45.50` | `141.44` `±33.96` | - |
| `inline-styles`                       | `236.25` `±95.57` | `477.01` `±88.30` | `40.95` `±23.53` |

Other libraries

| Implementation                        | Deep tree (ms)    | Wide tree (ms)    | Triangle (ms)     |
| :--- | ---: | ---: | ---: |
| `styletron@3.0.0-rc.5`                |  `83.53` `±33.55` | `153.12` `±39.13` |  `56.47` `±24.22` |
| `aphrodite@1.2.5`                     |  `88.23` `±31.22` | `164.03` `±34.70` | - |
| `glamor@2.20.40`                      | `110.09` `±34.20` | `182.06` `±50.39` | ‡ |
| `emotion@8.0.12`                      | `103.44` `±32.12` | `204.45` `±41.00` | `110.28` `±26.94` |
| `react-jss@8.2.0`                     | `136.17` `±59.23` | `270.51` `±69.20` | - |
| `styled-components@2.3.2`             | `217.57` `±51.90` | `437.57` `±65.74` |  `76.99` `±41.79` |
| `reactxp@0.46.6`                      | `240.88` `±79.82` | `467.32` `±74.42` |  `70.95` `±32.90`|
| `radium@0.19.6`                       | `400.19` `±94.58` | `816.59` `±91.10` |  `71.13` `±27.22` |

These results indicate that render times when using `react-native-web`,
`css-modules`, `aphrodite`, and `styletron` are roughly equivalent and
significantly faster than alternatives.

*MacBook Pro (13-inch, Early 2011); 2.3 GHz Intel Core i5; 8 GB 1333 MHz DDR3. Google Chrome 62.
‡Glamor essentially crashes
