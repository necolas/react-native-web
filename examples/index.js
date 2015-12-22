import { MediaProvider, matchMedia } from 'react-media-queries'
import App from './components/App'
import createGetter from 'react-media-queries/lib/createMediaQueryGetter'
import createListener from 'react-media-queries/lib/createMediaQueryListener'
import React from '../src'

const mediaQueries = {
  small: '(min-width: 300px)',
  medium: '(min-width: 400px)',
  large: '(min-width: 500px)'
}
const ResponsiveApp = matchMedia()(App)

React.render(
  <MediaProvider getMedia={createGetter(mediaQueries)} listener={createListener(mediaQueries)}>
    <ResponsiveApp />
  </MediaProvider>,
  document.getElementById('react-root')
)
