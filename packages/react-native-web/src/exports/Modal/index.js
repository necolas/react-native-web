import * as React from 'react'
import ReactDOM from 'react-dom'
import { StyleSheet, View } from 'react-native'

const modalContext = createModalContext()
const animationDurationMs = 300

const getAnimationStyles = (visible) => ({
  none: {},
  slide: {
    transform: [
      {
        translateY: visible ? 0 : '100%',
      },
    ],
  },
  fade: {
    opacity: visible ? 1 : 0,
  },
})

export default function Modal({
  animationType = 'none',
  children,
  onRequestClose,
  visible,
}) {
  const [internalVisible, setInternalVisible] = React.useState(visible)
  const shouldDelayingUnmounting = !visible && animationType !== 'none'
  const animatedRef = React.useRef(null)
  const modalRef = React.useRef(null)
  const [delayUnmounting, setDelayUnmounting] = React.useState(false)
  const open = visible || delayUnmounting || internalVisible
  const isCurrentModal = modalContext.use(open)

  // show fade out / slide out animation and prevent direct mount / unmount with the internal visibility
  React.useEffect(() => {
    if (internalVisible !== visible) {
      setInternalVisible(visible)

      // hide modal
      if (!visible) {
        // if the modal is animated we should prevent direct unmount of the modal
        if (shouldDelayingUnmounting) {
          setDelayUnmounting(true)
        }
      }
    }
  }, [
    shouldDelayingUnmounting,
    internalVisible,
    setInternalVisible,
    setDelayUnmounting,
    visible,
  ])

  // TODO: replace this with onTransitionEnd listener in React?
  // Ask Necolas if this is possible
  React.useEffect(() => {
    if (open) {
      const ar = animatedRef.current
      if (ar) {
        const onEnd = () => {
          setDelayUnmounting(false)
        }
        ar.addEventListener('transitionend', onEnd)
        return () => ar.removeEventListener('transitionend', onEnd)
      }
    }
  }, [open])

  const getFocusableNodes = React.useCallback(
    () =>
      modalRef.current
        ? Array.from(modalRef.current.querySelectorAll('[data-focusable=true]'))
        : [],
    [modalRef]
  )

  const onTabPress = React.useCallback(
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
        onTabPress(event)
      }
    },
    [onRequestClose, onTabPress]
  )

  React.useEffect(() => {
    if (visible && isCurrentModal) {
      document.addEventListener('keydown', onKeyDown)
      return () => document.removeEventListener('keydown', onKeyDown)
    }
  }, [isCurrentModal, onKeyDown, visible])

  const animationStyles = getAnimationStyles(visible)

  const animationStyle = animationStyles[animationType] || animationStyles.none

  return open
    ? ReactDOM.createPortal(
        <View
          ref={modalRef}
          aria-role="dialog"
          aria-hidden={!open || !isCurrentModal}
          aria-modal={true}
          style={[styles.dialog, { zIndex: 1000 }]}
        >
          <View
            ref={animatedRef}
            style={[
              styles.animated,
              animationStyle,
              startAnimation[animationType] || null,
            ]}
          >
            {open ? children : null}
          </View>
        </View>,
        document.body
      )
    : null
}

const styles = StyleSheet.create({
  dialog: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  animated: {
    height: '100%',
    transitionDuration: `${animationDurationMs}ms`,
    transitionTimingFunction: 'linear',
    overflow: 'hidden',
  },
  none: {},
  fadeIn: {
    animationKeyframes: [{ '0%': { opacity: 0 }, '100%': { opacity: 1 } }],
    animationDelay: 0,
    animationDuration: `${animationDurationMs}ms`,
    animationTimingFunction: 'linear',
  },
  slideIn: {
    animationKeyframes: [
      {
        '0%': {
          transform: [
            {
              translateY: '100%',
            },
          ],
        },
        '100%': {
          transform: [
            {
              translateY: 0,
            },
          ],
        },
      },
    ],
    animationDelay: 0,
    animationDuration: `${animationDurationMs}ms`,
    animationTimingFunction: 'linear',
  },
})

const startAnimation = {
  fade: styles.fadeIn,
  slide: styles.slideIn,
}

const createModalContext = () => {
  // subscribers with callbacks for external updates
  let subscribers = []
  let counter = 0
  let hiddenElements = []

  const allModalsAreClosed = () => {
    hiddenElements.forEach((element) => {
      element.setAttribute('aria-hidden', 'false')
    })
    hiddenElements = []
  }
  const firstModalIsOpened = () => {
    // hide all root elements on page for screen readers (except dialogs since these are handled internally and already
    // hidden elements)
    hiddenElements = document.querySelectorAll(
      'body > div:not([aria-role=dialog]):not([aria-hidden=true])'
    )
    hiddenElements.forEach((element) => {
      element.setAttribute('aria-hidden', 'true')
    })
  }

  const show = (setCurrentModal) => {
    counter++

    if (subscribers.length === 0) {
      firstModalIsOpened()
    }

    // onFocus all other modals
    subscribers.forEach((s) => s.setCurrentModal(false))

    // focus current modal
    setCurrentModal(true)

    // add to subscribers so we can focus or blur them based on other modals on screen
    subscribers.push({ modalIndex: counter, setCurrentModal })
    return counter
  }

  const remove = (idx) => {
    subscribers = subscribers.filter((s) => s.modalIndex !== idx)

    if (subscribers.length > 0) {
      // focus modal below the closed one
      const subscriberToFocus = subscribers[subscribers.length - 1]
      subscriberToFocus.setCurrentModal(true)
    } else {
      allModalsAreClosed()
    }
  }

  const use = (visible) => {
    const [currentModal, setCurrentModal] = React.useState(visible)
    React.useEffect(() => {
      if (visible) {
        let modalIndex = show(setCurrentModal)
        return () => remove(modalIndex)
      }
    }, [visible])
    return currentModal
  }

  return {
    use,
  }
}
