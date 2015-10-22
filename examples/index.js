import { MediaProvider, matchMedia } from 'react-media-queries'
import App from './components/App'
import createGetter from 'react-media-queries/lib/createMediaQueryGetter'
import createListener from 'react-media-queries/lib/createMediaQueryListener'
import React, { StyleSheet } from '../src'
import ReactDOM from 'react-dom'

const mediaQueries = {
  small: '(min-width: 300px)',
  medium: '(min-width: 400px)',
  large: '(min-width: 500px)'
}
const ResponsiveApp = matchMedia()(App)

ReactDOM.render(
  <MediaProvider getMedia={createGetter(mediaQueries)} listener={createListener(mediaQueries)}>
    <ResponsiveApp />
  </MediaProvider>,
  document.getElementById('react-root')
)

document.getElementById('react-stylesheet').textContent = StyleSheet.renderToString()
