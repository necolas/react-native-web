import React, { Component, PropTypes } from 'react';

/* eslint-disable */
const base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';
/* eslint-enable */

const createDeepTree = (implementation, options = {}) => {
  const { Image, StyleSheet, View } = implementation;
  const TerminalComponent = options.leafComponent ? implementation[options.leafComponent] : View;

  class DeepTree extends Component {
    static propTypes = {
      breadth: PropTypes.number.isRequired,
      depth: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      wrap: PropTypes.number.isRequired
    };

    render() {
      const { breadth, depth, id, wrap } = this.props;

      let result = (
        <View
          style={[
            styles.outer,
            depth % 2 === 0 ? styles.even : styles.odd,
            styles[`custom${id % 3}`]
          ]}
        >
          {depth === 0 && (
            <TerminalComponent
              source={TerminalComponent === Image && { uri: base64Icon }}
              style={[
                styles.terminal,
                styles[`terminal${id % 3}`]
              ]}
            />
          )}
          {depth !== 0 && Array.from({ length: breadth }).map((el, i) => (
            <DeepTree
              breadth={breadth}
              depth={depth - 1}
              id={i}
              key={i}
              wrap={wrap}
            />
          ))}
        </View>
      );
      for (let i = 0; i < wrap; i++) {
        result = <View>{result}</View>;
      }
      return result;
    }
  }

  const stylesObject = {
    outer: {
      padding: 4
    },
    odd: {
      flexDirection: 'row'
    },
    even: {
      flexDirection: 'column'
    },
    custom0: {
      backgroundColor: '#222'
    },
    custom1: {
      backgroundColor: '#666'
    },
    custom2: {
      backgroundColor: '#999'
    },
    terminal: {
      width: 20,
      height: 20
    },
    terminal0: {
      backgroundColor: 'blue'
    },
    terminal1: {
      backgroundColor: 'orange'
    },
    terminal2: {
      backgroundColor: 'red'
    }
  };

  const styles = options.registerStyles ? StyleSheet.create(stylesObject) : stylesObject;

  return DeepTree;
};

module.exports = createDeepTree;
