import { canUseDOM } from 'react/lib/ExecutionEnvironment'
import styles from './styles.css'

export function injectStyles(): string {
  const id = '__reactNativeWebStyles__'

  if (canUseDOM) {
    const has = document.getElementById(id)
    if (!has) {
      const dom = document.createElement('style')
      dom.id = id
      dom.innerHTML = styles
      document.head.appendChild(dom)
    }
  } else {
    return `<style id="${id}">${styles}</style>`
  }
}

export default styles.locals
