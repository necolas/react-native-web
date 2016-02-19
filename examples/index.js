import { MediaProvider, matchMedia } from 'react-media-queries'
import App from './components/App'
import createGetter from 'react-media-queries/lib/createMediaQueryGetter'
import createListener from 'react-media-queries/lib/createMediaQueryListener'
import React, { AppRegistry } from 'react-native'

const mediaQueries = {
  small: '(min-width: 300px)',
  medium: '(min-width: 400px)',
  large: '(min-width: 500px)'
}
const ResponsiveApp = matchMedia()(App)
const WrappedApp = () => (
  <MediaProvider getMedia={createGetter(mediaQueries)} listener={createListener(mediaQueries)}>
    <ResponsiveApp />
  </MediaProvider>
)

AppRegistry.registerComponent('Example', () => WrappedApp)

AppRegistry.runApplication('Example', {
  rootTag: document.getElementById('react-root')
})
