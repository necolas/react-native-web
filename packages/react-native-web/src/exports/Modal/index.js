import * as React from 'react'
import ReactDOM from 'react-dom'
import { StyleSheet, View } from 'react-native'

const modalContext = React.createContext(null)

const dialogStyle = {
  border: 0,
  backgroundColor: 'transparent',
  height: '100%',
  width: '100%',
}

const animationDurationMs = 300

const getAnimationStyles = (internalVisible) => ({
  none: {},
  slide: {
    transform: [
      {
        translateY: internalVisible ? 0 : '100%',
      },
    ],
  },
  fade: {
    opacity: internalVisible ? 1 : 0,
  },
})

export default function Modal({
  children,
  animationType = 'none',
  visible,
  onRequestClose,
}) {
  const shouldDelayingUnmounting = !visible && animationType !== 'none'
  const modalRef = React.useRef(null)
  const [delayUnmounting, setDelayUnmounting] = React.useState(false)
  const [internalVisible, setInternalVisible] = React.useState(visible)

  React.useEffect(() => {
    if (internalVisible !== visible) {
      // show fade out / slide out animation
      if (!visible && shouldDelayingUnmounting) {
        setDelayUnmounting(true)
        setTimeout(() => {
          setDelayUnmounting(false)
        }, animationDurationMs + 100)
      }
      setInternalVisible(visible)
    }
  }, [shouldDelayingUnmounting, internalVisible, animationType, visible])

  const getFocusableNodes = React.useCallback(
    () =>
      modalRef.current
        ? Array.from(modalRef.current.querySelectorAll('[data-focusable=true]'))
        : [],
    [modalRef]
  )

  const retainFocus = React.useCallback(
    (event) => {
      let focusableNodes = getFocusableNodes()
      // nothing to focus on
      if (focusableNodes.length === 0) {
        return
      }

      // filter out hidden nodes
      focusableNodes = focusableNodes.filter((node) => {
        return node.offsetParent !== null
      })

      // focus on the right elements when user clicks tab
      if (
        modalRef.current &&
        !modalRef.current.contains(document.activeElement)
      ) {
        focusableNodes[0].focus()
      } else {
        const focusedItemIndex = focusableNodes.indexOf(document.activeElement)

        if (event.shiftKey && focusedItemIndex === 0) {
          focusableNodes[focusableNodes.length - 1].focus()
          event.preventDefault()
        }

        if (
          !event.shiftKey &&
          focusableNodes.length > 0 &&
          focusedItemIndex === focusableNodes.length - 1
        ) {
          focusableNodes[0].focus()
          event.preventDefault()
        }
      }
    },
    [getFocusableNodes]
  )

  const onKeyDown = React.useCallback(
    (event) => {
      if (event.key === 'Escape') {
        onRequestClose()
      }
      if (event.key === 'Tab') {
        retainFocus(event)
      }
    },
    [onRequestClose, retainFocus]
  )

  React.useEffect(() => {
    if (visible) {
      document.addEventListener('keydown', onKeyDown)
      return () => document.removeEventListener('keydown', onKeyDown)
    }
  }, [modalRef, getFocusableNodes, onKeyDown, visible])

  const animationStyles = getAnimationStyles(internalVisible)
  const animationStyle = animationStyles[animationType] || animationStyles.none
  const open = visible || internalVisible || delayUnmounting

  return open
    ? ReactDOM.createPortal(
        <dialog
          ref={modalRef}
          aria-role="dialog"
          aria-hidden={!open}
          aria-modal={true}
          style={dialogStyle}
          open={open}
        >
          <modalContext.Provider value={{ onRequestClose }}>
            <View style={[styles.animated, animationStyle]}>
              {open ? children : null}
            </View>
          </modalContext.Provider>
        </dialog>,
        document.body
      )
    : null
}

const styles = StyleSheet.create({
  animated: {
    height: '100%',
    transitionDuration: `${animationDurationMs}ms`,
    transitionTimingFunction: 'linear',
    overflow: 'hidden',
    transformOrigin: 'center bottom',
  },
})
