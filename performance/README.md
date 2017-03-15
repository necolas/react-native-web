# Performance

To run these benchmarks:

```
npm run build:performance
open ./performance/index.html
```

## Notes

The components used in the render benchmarks are simple enough to be
implemented by multiple styling libraries. The implementations are not
equivalent but are useful for framing the relative performance of
`react-native-web` against these tests.

The implementations are not equivalent. For example, the `react-native-web`
implementation of `View` does more than just styling. The
`react-native-web/lite` variant implements a minimal `View` that allows for a
more direct comparison with the `css-modules` baseline.

## Benchmark results

Typical render timings*: mean / two standard deviations

| Implementation               | Deep tree (ms)    | Wide tree (ms)    |
| :--- | ---: | ---: |
| css-modules                  |  `75.40` `±15.93` | `162.15` `±22.20` |
| react-native-web/lite@0.0.77 |  `83.93` `±13.80` | `177.57` `±20.045` |
| react-native-web@0.0.77      | `106.72` `±15.48` | `217.63` `±25.70` |
| styled-components@2.0.0-7    | `255.19` `±35.09` | `569.74` `±59.94` |
| glamor@3.0.0-1               | `268.94` `±38.96` | `458.69` `±32.30` |

*MacBook Pro (13-inch, Early 2011); 2.7 GHz Intel Core i7; 16 GB 1600 MHz DDR3. Google Chrome 56.
