import React, { Image, Text, TextInput, View } from '../dist/react-native-web';

class Example extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.grid}>
          {[1,2,3,4,5,6].map((item, i) => {
            return (
              <View key={i} style={{ ...styles.box, ...(item === 6 && styles.boxFull) }}>
                <Text style={{ fontSize: '2rem' }}>{item}</Text>
              </View>
            );
          })}
        </View>

        <View style={{
          alignItems: 'center',
          borderWidth: '1px',
          justifyContent: 'center',
          marginTop: '10px',
          height: '200px'
        }}>
          <Text>This should be centered</Text>
        </View>

        <TextInput type="text" autoFocus />
        <TextInput multiline defaultValue="default value" />
      </View>
    );
  }
}

const styles = {
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  box: {
    alignItems: 'center',
    backgroundColor: 'lightblue',
    flexGrow: 1,
    justifyContent: 'center',
    borderColor: 'blue',
    borderWidth: '5px'
  },
  boxFull: {
    width: '100%'
  }
}

React.render(<Example />, document.getElementById('react-root'));
