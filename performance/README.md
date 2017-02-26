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

Version: 0.0.73

| Implementation        | Deep tree (ms)    | Wide tree (ms)    |
| :--- | ---: | ---: |
| css-modules           |  `80.47` `±18.04` | `166.91` `±19.90` |
| react-native-web/lite |  `87.91` `±13.37` | `181.45` `±20.06` |
| react-native-web      | `113.45` `±09.27` | `237.33` `±38.77` |
| styled-components     | `170.86` `±15.67` | `378.83` `±36.11` |
| glamor                | `275.41` `±19.56` | `474.76` `±29.02` |

*MacBook Pro (13-inch, Early 2011); 2.7 GHz Intel Core i7; 16 GB 1600 MHz DDR3. Google Chrome 56.
