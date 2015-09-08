import React, { Image, Swipeable, Text, TextInput, Touchable, View } from '../dist/react-native-web'

const { Component, PropTypes } = React

class Heading extends Component {
  static propTypes = {
    children: Text.propTypes.children,
    level: PropTypes.oneOf(['1', '2', '3']),
    size: PropTypes.oneOf(['xlarge', 'large', 'normal'])
  }

  static defaultProps = {
    level: '1',
    size: 'normal'
  }

  render() {
    const { children, level, size } = this.props

    return (
      <Text
        children={children}
        component={`h${level}`}
        style={headingStyles.size[size]}
      />
    )
  }
}

const headingStyles = {
  size: {
    xlarge: {
      fontSize: '2rem',
      marginBottom: '1em'
    },
    large: {
      fontSize: '1.5rem',
      marginBottom: '1em',
      marginTop: '1em'
    },
    normal: {
      fontSize: '1.25rem',
      marginBottom: '0.5em',
      marginTop: '0.5em'
    }
  }
}

class Example extends Component {
  static propTypes = {
    style: View.propTypes.style
  }

  render() {
    return (
      <View accessibilityRole='main' style={styles.root}>
        <Heading level='1' size='xlarge'>React Native for Web: examples</Heading>

        <Heading level='2' size='large'>Image</Heading>
        <Image
          accessibilityLabel='accessible image'
          children={<Text>Inner content</Text>}
          defaultSource={{
            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAIAAAAP3aGbAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wkGESkdPWMDggAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAD5UlEQVR42u3UMQ0AAAgEMcC/x7eCCgaSVsIN10kK4IORADAsAMMCDAvAsAAMCzAsAMMCMCzAsAAMC8CwAMMCMCwAwwIMC8CwAAwLMCwAwwIwLMCwAAwLwLAAwwIwLADDAgwLwLAAwwIwLADDAgwLwLAADAswLADDAjAswLAADAvAsADDAjAsAMMCDAvAsAAMCzAsAMMCMCzAsAAMC8CwAMMCMCwAwwIMC8CwAMMCMCwAwwIMC8CwAAwLMCwAwwIwLMCwAAwLwLAAwwIwLADDAgwLwLAADAswLADDAjAswLAADAvAsADDAjAsAMMCDAvAsADDAjAsAMMCDAvAsAAMCzAsAMMCMCzAsAAMC8CwAMMCMCwAwwIMC8CwAAwLMCwAwwIwLMCwAAwLwLAAwwIwLADDAgwLwLAAwwIwLADDAgwLwLAADAswLADDAjAswLAADAvAsADDAjAsAMMCDAvAsAAMCzAsAMMCMCzAsAAMC8CwAMMCMCwAwwIMC8CwAMMCMCwAwwIMC8CwAAwLMCwAwwIwLMCwAAwLwLAAwwIwLADDAgwLwLAADAswLADDAjAswLAADAvAsADDAjAsAMMCDAvAsADDAjAsAMMCDAvAsAAMCzAsAMMCMCzAsAAMC8CwAMMCMCwAwwIMC8CwAAwLMCwAwwIwLMCwAAwLwLAAwwIwLADDAgwLwLAAwwIwLADDAgwLwLAADAswLADDAjAswLAADAvAsADDAjAsAMMCDAvAsAAMCzAsAMMCMCzAsAAMC8CwAMMCMCwAwwIMC8CwAMMCMCwAwwIMC8CwAAwLMCwAwwIwLMCwAAwLwLAAwwIwLADDAgwLwLAADAswLADDAjAswLAADAvAsADDAjAswLAkAAwLwLAAwwIwLADDAgwLwLAADAswLADDAjAswLAADAvAsADDAjAsAMMCDAvAsAAMCzAsAMMCMCzAsAAMC8CwAMMCMCzAsAAMC8CwAMMCMCwAwwIMC8CwAAwLMCwAwwIwLMCwAAwLwLAAwwIwLADDAgwLwLAADAswLADDAjAswLAADAvAsADDAjAswLAADAvAsADDAjAsAMMCDAvAsAAMCzAsAMMCMCzAsAAMC8CwAMMCMCwAwwIMC8CwAAwLMCwAwwIwLMCwAAwLwLAAwwIwLMCwAAwLwLAAwwIwLADDAgwLwLAADAswLADDAjAswLAADAvAsADDAjAsAMMCDAvAsAAMCzAsAMMCMCzAsAAMC8CwAMMCMCzAsAAMC8CwAMMCMCwAwwIMC8CwAAwLMCwAwwIwLMCwAAwLwLAAwwIwLADDAgwLwLAADAswLADDAjAswLAALi04UQW9HF910gAAAABJRU5ErkJggg=='
          }}
          onError={(e) => { console.log('Image.onError', e) }}
          onLoad={(e) => { console.log('Image.onLoad', e) }}
          onLoadEnd={() => { console.log('Image.onLoadEnd') }}
          onLoadStart={() => { console.log('Image.onLoadStart') }}
          resizeMode={'contain'}
          source={{
            height: 400,
            uri: 'http://facebook.github.io/react/img/logo_og.png',
            width: 400
          }}
          style={{
            borderWidth: '5px'
          }}
          testID='Example.image'
        />

        <Heading level='2' size='large'>Swipeable</Heading>
        <Swipeable
          onSwiped={(e) => { console.log('Swipeable.onSwiped', e) }}
          testID={'Example.swipeable'}
        >
          <View
            style={{
              backgroundColor: 'black',
              alignSelf: 'center',
              width: '200px',
              height: '200px'
            }}
          />
        </Swipeable>

        <Heading level='2' size='large'>Text</Heading>
        <Text
          onPress={(e) => { console.log('Text.onPress', e) }}
          testID={'Example.text'}
        >
          PRESS ME.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel
          lectus urna. Aliquam vitae justo porttitor, aliquam erat nec,
          venenatis diam. Vivamus facilisis augue non urna mattis ultricies.
            Suspendisse et vulputate enim, a maximus nulla. Vivamus imperdiet
          hendrerit consequat. Aliquam lorem quam, elementum eget ex nec,
          ultrices porttitor nibh. Nulla pellentesque urna leo, a aliquet elit
          rhoncus a. Aenean ultricies, nunc a interdum dictum, dui odio
          scelerisque mauris, a fringilla elit ligula vel sem. Sed vel aliquet
          ipsum, sed rhoncus velit. Vivamus commodo pretium libero id placerat.
        </Text>
        <Text numberOfLines={1}>
          TRUNCATED after 1 line.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel
          lectus urna. Aliquam vitae justo porttitor, aliquam erat nec,
          venenatis diam. Vivamus facilisis augue non urna mattis ultricies.
          Suspendisse et vulputate enim, a maximus nulla. Vivamus imperdiet
          hendrerit consequat.
        </Text>

        <Heading level='2' size='large'>TextInput</Heading>
        <TextInput
          keyboardType='default'
          onBlur={(e) => { console.log('TextInput.onBlur', e) }}
          onChange={(e) => { console.log('TextInput.onChange', e) }}
          onChangeText={(e) => { console.log('TextInput.onChangeText', e) }}
          onFocus={(e) => { console.log('TextInput.onFocus', e) }}
        />
        <TextInput secureTextEntry={true} />
        <TextInput keyboardType='numeric' />
        <TextInput keyboardType='tel' />
        <TextInput keyboardType='url' />
        <TextInput keyboardType='search' />
        <TextInput defaultValue='default value' multiline />

        <Heading level='2' size='large'>Touchable</Heading>
        <Touchable
          accessibilityLabel={'Touchable element'}
          activeHighlight='lightblue'
          activeOpacity={0.8}
          onLongPress={(e) => { console.log('Touchable.onLongPress', e) }}
          onPress={(e) => { console.log('Touchable.onPress', e) }}
          onPressIn={(e) => { console.log('Touchable.onPressIn', e) }}
          onPressOut={(e) => { console.log('Touchable.onPressOut', e) }}
        >
          <View style={styles.touchableArea}>
            <Text>Touchable area (press, long press)</Text>
          </View>
        </Touchable>

        <Heading level='2' size='large'>View</Heading>
        <Heading level='3'>Default layout</Heading>
        <View>
          {[ 1, 2, 3, 4, 5, 6 ].map((item, i) => {
            return (
              <View key={i} style={styles.box}>
                <Text>{item}</Text>
              </View>
            )
          })}
        </View>

        <Heading level='3'>Row layout</Heading>
        <View style={styles.row}>
          {[ 1, 2, 3, 4, 5, 6 ].map((item, i) => {
            return (
              <View key={i} style={styles.box}>
                <Text>{item}</Text>
              </View>
            )
          })}
        </View>

        <Heading level='3'>pointerEvents</Heading>
        <View style={styles.row}>
          {['box-none', 'box-only', 'none'].map((value, i) => {
            return (
              <View
                children={value}
                component='a'
                href='https://google.com'
                key={i}
                pointerEvents={value}
                style={styles.pointerEventsBox}
              />
            )
          })}
        </View>
      </View>
    )
  }
}

const styles = {
  root: {
    fontFamily: 'sans-serif',
    maxWidth: '600px',
    margin: '0 auto'
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  box: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    borderWidth: '1px'
  },
  boxFull: {
    width: '100%'
  },
  pointerEventsBox: {
    alignItems: 'center',
    borderWidth: '1px',
    flexGrow: '1',
    height: '100px',
    justifyContent: 'center'
  },
  touchableArea: {
    alignItems: 'center',
    borderWidth: 1,
    height: '200px',
    justifyContent: 'center'
  }
}

React.render(<Example />, document.getElementById('react-root'))
