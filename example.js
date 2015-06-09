import React from 'react';
import { Image, Text, View } from '.';

class Example extends React.Component {
  render() {
    return (
      <View style={style.root}>
        {[1,2,3,4,5,6].map((item) => {
          return (
            <View style={{ ...style.box, ...(item === 6 && style.boxFull) }}>
              <Text style={{fontSize: '2rem'}}>{item}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

const style = {
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100px'
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
