import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'

const Platform = {
  OS: 'web',
  userAgent: canUseDOM ? window.navigator.userAgent : '',
  select: (obj) => obj.web
}

module.exports = Platform
