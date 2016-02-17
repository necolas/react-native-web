import { canUseDOM } from 'exenv'

const Platform = {
  OS: 'web',
  userAgent: canUseDOM ? window.navigator.userAgent : ''
}

export default Platform
