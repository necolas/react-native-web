/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule Game2048
 * @flow
 */

import { any, func, object } from 'prop-types';
import GameBoard from './GameBoard';
import React from 'react';
import { Animated, AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BOARD_PADDING = 3;
const CELL_MARGIN = 4;
const CELL_SIZE = 60;

class Cell extends React.Component {
  render() {
    return <View style={styles.cell} />;
  }
}

class Board extends React.Component {
  static propTypes = {
    children: any
  };

  render() {
    return (
      <View style={styles.board}>
        <View style={styles.row}>
          <Cell />
          <Cell />
          <Cell />
          <Cell />
        </View>
        <View style={styles.row}>
          <Cell />
          <Cell />
          <Cell />
          <Cell />
        </View>
        <View style={styles.row}>
          <Cell />
          <Cell />
          <Cell />
          <Cell />
        </View>
        <View style={styles.row}>
          <Cell />
          <Cell />
          <Cell />
          <Cell />
        </View>
        {this.props.children}
      </View>
    );
  }
}

class Tile extends React.Component {
  state: any;

  static propTypes = {
    tile: object
  };

  static _getPosition(index): number {
    return BOARD_PADDING + (index * (CELL_SIZE + CELL_MARGIN * 2) + CELL_MARGIN);
  }

  constructor(props: {}) {
    super(props);

    const tile = this.props.tile;

    this.state = {
      opacity: new Animated.Value(0),
      top: new Animated.Value(Tile._getPosition(tile.toRow())),
      left: new Animated.Value(Tile._getPosition(tile.toColumn()))
    };
  }

  calculateOffset(): { top: number, left: number, opacity: number } {
    const tile = this.props.tile;

    const offset = {
      top: this.state.top,
      left: this.state.left,
      opacity: this.state.opacity
    };

    if (tile.isNew()) {
      Animated.timing(this.state.opacity, {
        duration: 100,
        toValue: 1
      }).start();
    } else {
      Animated.parallel([
        Animated.timing(offset.top, {
          duration: 100,
          toValue: Tile._getPosition(tile.toRow())
        }),
        Animated.timing(offset.left, {
          duration: 100,
          toValue: Tile._getPosition(tile.toColumn())
        })
      ]).start();
    }
    return offset;
  }

  render() {
    const tile = this.props.tile;

    const tileStyles = [styles.tile, styles['tile' + tile.value], this.calculateOffset()];

    const textStyles = [
      styles.value,
      tile.value > 4 && styles.whiteText,
      tile.value > 100 && styles.threeDigits,
      tile.value > 1000 && styles.fourDigits
    ];

    return (
      <Animated.View style={tileStyles}>
        <Text style={textStyles}>{tile.value}</Text>
      </Animated.View>
    );
  }
}

class GameEndOverlay extends React.Component {
  static propTypes = {
    board: object,
    onRestart: func
  };

  render() {
    const board = this.props.board;

    if (!board.hasWon() && !board.hasLost()) {
      return <View />;
    }

    const message = board.hasWon() ? 'Good Job!' : 'Game Over';

    return (
      <View style={styles.overlay}>
        <Text style={styles.overlayMessage}>{message}</Text>
        <TouchableOpacity onPress={this.props.onRestart} style={styles.tryAgain}>
          <Text style={styles.tryAgainText}>Try Again?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class Game2048 extends React.Component {
  startX: number;
  startY: number;
  state: any;

  constructor(props: {}) {
    super(props);
    this.state = {
      board: new GameBoard()
    };
    this.startX = 0;
    this.startY = 0;
  }

  _handleRestart = () => {
    this.setState({ board: new GameBoard() });
  };

  _handleTouchStart = (event: Object) => {
    if (this.state.board.hasWon()) {
      return;
    }

    this.startX = event.nativeEvent.pageX;
    this.startY = event.nativeEvent.pageY;
  };

  _handleTouchEnd = (event: Object) => {
    if (this.state.board.hasWon()) {
      return;
    }

    const deltaX = event.nativeEvent.pageX - this.startX;
    const deltaY = event.nativeEvent.pageY - this.startY;

    let direction = -1;
    if (Math.abs(deltaX) > 3 * Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      direction = deltaX > 0 ? 2 : 0;
    } else if (Math.abs(deltaY) > 3 * Math.abs(deltaX) && Math.abs(deltaY) > 30) {
      direction = deltaY > 0 ? 3 : 1;
    }

    if (direction !== -1) {
      this.setState({ board: this.state.board.move(direction) });
    }
  };

  render() {
    const tiles = this.state.board.tiles
      .filter(tile => tile.value)
      .map(tile => <Tile key={tile.id} ref={tile.id} tile={tile} />);

    return (
      <View
        onTouchEnd={this._handleTouchEnd}
        onTouchStart={this._handleTouchStart}
        style={styles.container}
      >
        <Board>{tiles}</Board>
        <GameEndOverlay board={this.state.board} onRestart={this._handleRestart} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  board: {
    padding: BOARD_PADDING,
    backgroundColor: '#bbaaaa',
    borderRadius: 5
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(221, 221, 221, 0.5)',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlayMessage: {
    fontSize: 40,
    marginBottom: 20
  },
  tryAgain: {
    backgroundColor: '#887761',
    padding: 20,
    borderRadius: 5
  },
  tryAgainText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '500'
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 5,
    backgroundColor: '#ddccbb',
    margin: CELL_MARGIN
  },
  row: {
    flexDirection: 'row'
  },
  tile: {
    position: 'absolute',
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: '#ddccbb',
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  value: {
    fontSize: 24,
    color: '#776666',
    fontFamily: 'Verdana',
    fontWeight: '500'
  },
  tile2: {
    backgroundColor: '#eeeeee'
  },
  tile4: {
    backgroundColor: '#eeeecc'
  },
  tile8: {
    backgroundColor: '#ffbb87'
  },
  tile16: {
    backgroundColor: '#ff9966'
  },
  tile32: {
    backgroundColor: '#ff7755'
  },
  tile64: {
    backgroundColor: '#ff5533'
  },
  tile128: {
    backgroundColor: '#eecc77'
  },
  tile256: {
    backgroundColor: '#eecc66'
  },
  tile512: {
    backgroundColor: '#eecc55'
  },
  tile1024: {
    backgroundColor: '#eecc33'
  },
  tile2048: {
    backgroundColor: '#eecc22'
  },
  whiteText: {
    color: '#ffffff'
  },
  threeDigits: {
    fontSize: 20
  },
  fourDigits: {
    fontSize: 18
  }
});

AppRegistry.registerComponent('Game2048', () => Game2048);

export default Game2048;
