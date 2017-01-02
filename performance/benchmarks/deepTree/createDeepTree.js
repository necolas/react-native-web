import React, { Component, PropTypes } from 'react';

const createDeepTree = ({ StyleSheet, View }) => {
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
            <View
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

  const styles = StyleSheet.create({
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
  });

  return DeepTree;
};

module.exports = createDeepTree;
