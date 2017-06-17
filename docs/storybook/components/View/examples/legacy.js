/**
 * @flow
 */

/*
const styles = StyleSheet.create({
  box: {
    backgroundColor: '#527FE4',
    borderColor: '#000033',
    borderWidth: 1
  },
  shadowBox: {
    width: 100,
    height: 100,
    borderWidth: 2
  },
  shadow: {
    shadowOpacity: 0.5,
    shadowColor: 'red',
    shadowRadius: 3,
    shadowOffset: { width: 3, height: 3 }
  },
});

class ViewBorderStyleExample extends React.Component {
  state = {
    showBorder: true
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this._handlePress}>
        <View>
          <View
            style={{
              borderWidth: 1,
              borderStyle: this.state.showBorder ? 'dashed' : null,
              padding: 5
            }}
          >
            <Text style={{ fontSize: 11 }}>
              Dashed border style
            </Text>
          </View>
          <View
            style={{
              marginTop: 5,
              borderWidth: 1,
              borderRadius: 5,
              borderStyle: this.state.showBorder ? 'dotted' : null,
              padding: 5
            }}
          >
            <Text style={{ fontSize: 11 }}>
              Dotted border style
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _handlePress() {
    this.setState({ showBorder: !this.state.showBorder });
  }
}


const examples = [
  {
    title: 'Background Color',
    render() {
      return (
        <View style={{ backgroundColor: '#527FE4', padding: 5 }}>
          <Text style={{ fontSize: 11 }}>
            Blue background
          </Text>
        </View>
      );
    }
  },
  {
    title: 'Border',
    render() {
      return (
        <View style={{ borderColor: '#527FE4', borderWidth: 5, padding: 10 }}>
          <Text style={{ fontSize: 11 }}>5px blue border</Text>
        </View>
      );
    }
  },
  {
    title: 'Padding/Margin',
    render() {
      return (
        <View style={{ borderColor: '#bb0000', borderWidth: 0.5 }}>
          <View style={[styles.box, { padding: 5 }]}>
            <Text style={{ fontSize: 11 }}>5px padding</Text>
          </View>
          <View style={[styles.box, { margin: 5 }]}>
            <Text style={{ fontSize: 11 }}>5px margin</Text>
          </View>
          <View style={[styles.box, { margin: 5, padding: 5, alignSelf: 'flex-start' }]}>
            <Text style={{ fontSize: 11 }}>
              5px margin and padding,
            </Text>
            <Text style={{ fontSize: 11 }}>
              widthAutonomous=true
            </Text>
          </View>
        </View>
      );
    }
  },
  {
    title: 'Border Radius',
    render() {
      return (
        <View style={{ borderWidth: 0.5, borderRadius: 5, padding: 5 }}>
          <Text style={{ fontSize: 11 }}>
            Too much use of `borderRadius` (especially large radii) on
            anything which is scrolling may result in dropped frames.
            Use sparingly.
          </Text>
        </View>
      );
    }
  },
  {
    title: 'Border Style',
    render() {
      return <ViewBorderStyleExample />;
    }
  },
  {
    title: 'Circle with Border Radius',
    render() {
      return <View style={{ borderRadius: 10, borderWidth: 1, width: 20, height: 20 }} />;
    }
  },
  {
    title: 'Overflow',
    render() {
      return (
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              width: 95,
              height: 10,
              marginRight: 10,
              marginBottom: 5,
              overflow: 'hidden',
              borderWidth: 0.5
            }}
          >
            <View style={{ width: 200, height: 20 }}>
              <Text>Overflow hidden</Text>
            </View>
          </View>
          <View style={{ width: 95, height: 10, marginBottom: 5, borderWidth: 0.5 }}>
            <View style={{ width: 200, height: 20 }}>
              <Text>Overflow visible</Text>
            </View>
          </View>
        </View>
      );
    }
  },
  {
    title: 'Opacity',
    render() {
      return (
        <View>
          <View style={{ opacity: 0 }}><Text>Opacity 0</Text></View>
          <View style={{ opacity: 0.1 }}><Text>Opacity 0.1</Text></View>
          <View style={{ opacity: 0.3 }}><Text>Opacity 0.3</Text></View>
          <View style={{ opacity: 0.5 }}><Text>Opacity 0.5</Text></View>
          <View style={{ opacity: 0.7 }}><Text>Opacity 0.7</Text></View>
          <View style={{ opacity: 0.9 }}><Text>Opacity 0.9</Text></View>
          <View style={{ opacity: 1 }}><Text>Opacity 1</Text></View>
        </View>
      );
    }
  },
  {
    title: 'Basic shadow',
    render() {
      return <View style={[styles.shadowBox, styles.shadow]} />;
    }
  },
  {
    title: 'Shaped shadow',
    description: 'borderRadius: 50',
    render() {
      return <View style={[styles.shadowBox, styles.shadow, { borderRadius: 50 }]} />;
    }
  }
]
*/
