import GridView from './GridView'
import Heading from './Heading'
import React from 'react'
import { Image, StyleSheet, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native'

export default class App extends React.Component {
  static propTypes = {
    style: View.propTypes.style
  }

  constructor(props) {
    super(props)
    this.state = {
      scrollEnabled: true
    }
  }

  render() {
    const finalRootStyles = [
      rootStyles.common
    ]

    return (
      <ScrollView accessibilityRole='main'>
        <View style={finalRootStyles}>
        <Heading size='xlarge'>React Native for Web</Heading>
        <Text>React Native Web takes the core components from <Text
        accessibilityRole='link' href='https://facebook.github.io/react-native/'>React
        Native</Text> and brings them to the web. These components provide
        simple building blocks – touch handling, flexbox layout,
        scroll views – from which more complex components and apps can be
        constructed.</Text>

        <Heading size='large'>Image</Heading>
        <Image
        onLayout={(e) => { console.log(e.nativeEvent.layout) }}
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

        <Heading size='large'>Text</Heading>
        <Text
          onPress={(e) => { console.log('Text.onPress', e) }}
          onLayout={(e) => { console.log(e.nativeEvent.layout) }}
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

        <Heading size='large'>TextInput</Heading>
        <TextInput
          keyboardType='default'
          onBlur={(e) => { console.log('TextInput.onBlur', e) }}
          onChange={(e) => { console.log('TextInput.onChange', e) }}
          onChangeText={(e) => { console.log('TextInput.onChangeText', e) }}
          onFocus={(e) => { console.log('TextInput.onFocus', e) }}
          onSelectionChange={(e) => { console.log('TextInput.onSelectionChange', e) }}
        />
        <TextInput secureTextEntry />
        <TextInput defaultValue='read only' editable={false} />
        <TextInput
          style={{ flex:1, height: 60, padding: 20, fontSize: 20, textAlign: 'center' }}
          keyboardType='email-address' placeholder='you@domain.com' placeholderTextColor='red'
        />
        <TextInput keyboardType='numeric' />
        <TextInput keyboardType='phone-pad' />
        <TextInput defaultValue='https://delete-me' keyboardType='url' placeholder='https://www.some-website.com' selectTextOnFocus />
        <TextInput
          defaultValue='default value'
          maxNumberOfLines={10}
          multiline
          numberOfLines={5}
        />

        <Heading size='large'>Touchable</Heading>
        <TouchableHighlight
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
        </TouchableHighlight>

        <Heading size='large'>View</Heading>
        <Heading>Default layout</Heading>
        <View>
          {[ 1, 2, 3, 4, 5, 6 ].map((item, i) => {
            return (
              <View key={i} style={styles.box}>
                <Text>{item}</Text>
              </View>
            )
          })}
        </View>

        <Heading>Row layout</Heading>
        <View style={styles.row}>
          {[ 1, 2, 3, 4, 5, 6 ].map((item, i) => {
            return (
              <View key={i} style={styles.box}>
                <Text>{item}</Text>
              </View>
            )
          })}
        </View>

        <Heading>pointerEvents</Heading>
        <GridView alley='10px'>
          {['box-none', 'box-only', 'none'].map((value, i) => {
            return (
              <View
                accessibilityRole='link'
                children={value}
                href='https://google.com'
                key={i}
                pointerEvents={value}
                style={styles.pointerEventsBox}
              />
            )
          })}
        </GridView>

        <Heading size='large'>ScrollView</Heading>
        <label>
          <input
            checked={this.state.scrollEnabled}
            onChange={() => this.setState({
              scrollEnabled: !this.state.scrollEnabled
            })}
            type='checkbox'
          /> Enable scroll
        </label>

        <Heading>Default layout</Heading>
        <View style={styles.scrollViewContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContentContainerStyle}
            onScroll={e => console.log('ScrollView.onScroll', e)}
            scrollEnabled={this.state.scrollEnabled}
            scrollEventThrottle={1} // 1 event per second
            style={styles.scrollViewStyle}
          >
            {Array.from({ length: 50 }).map((item, i) => (
              <View key={i} style={styles.box}>
                <Text>{i}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <Heading>Horizontal layout</Heading>
        <View style={styles.scrollViewContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContentContainerStyle}
            horizontal
            onScroll={e => console.log('ScrollView.onScroll', e)}
            scrollEnabled={this.state.scrollEnabled}
            scrollEventThrottle={1} // 1 event per second
            style={styles.scrollViewStyle}
          >
            {Array.from({ length: 50 }).map((item, i) => (
              <View key={i} style={[ styles.box, styles.horizontalBox ]}>
                <Text>{i}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        </View>
      </ScrollView>
    )
  }
}

const rootStyles = StyleSheet.create({
  common: {
    marginVertical: 0,
    marginHorizontal: 'auto'
  },
  mqSmall: {
    maxWidth: '400px'
  },
  mqLarge: {
    maxWidth: '600px'
  }
})

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  box: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    borderWidth: 1
  },
  horizontalBox: {
    width: '50px'
  },
  boxFull: {
    width: '100%'
  },
  pointerEventsBox: {
    alignItems: 'center',
    borderWidth: '1px',
    flexGrow: 1,
    height: '100px',
    justifyContent: 'center'
  },
  touchableArea: {
    alignItems: 'center',
    borderWidth: 1,
    height: '200px',
    justifyContent: 'center'
  },
  scrollViewContainer: {
    height: '200px'
  },
  scrollViewStyle: {
    borderWidth: '1px'
  },
  scrollViewContentContainerStyle: {
    padding: '10px'
  }
})
