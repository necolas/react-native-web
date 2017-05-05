import { bool, func, oneOf ,arrayOf , deprecatedPropType } from 'prop-types';
/**
 * Copy from react-native
 */
const ModalPropTypes = {
    /**
     * The `animationType` prop controls how the modal animates.
     *
     * - `slide` slides in from the bottom
     * - `fade` fades into view
     * - `none` appears without an animation
     *
     * Default is set to `none`.
     */
    animationType: oneOf(['none', 'slide', 'fade']),
    /**
     * The `transparent` prop determines whether your modal will fill the entire view. Setting this to `true` will render the modal over a transparent background.
     */
    transparent: bool,
    /**
     * The `hardwareAccelerated` prop controls whether to force hardware acceleration for the underlying window.
     * @platform android
     */
    hardwareAccelerated: bool,
    /**
     * The `visible` prop determines whether your modal is visible.
     */
    visible: bool,
    /**
     * The `onRequestClose` callback is called when the user taps the hardware back button.
     * @platform android
     */
    onRequestClose: func,
    /**
     * The `onShow` prop allows passing a function that will be called once the modal has been shown.
     */
    onShow: func,
    animated: deprecatedPropType(
      bool,
      'Use the `animationType` prop instead.'
    ),
    /**
     * The `supportedOrientations` prop allows the modal to be rotated to any of the specified orientations.
     * On iOS, the modal is still restricted by what's specified in your app's Info.plist's UISupportedInterfaceOrientations field.
     * @platform ios
     */
    supportedOrientations: arrayOf(oneOf(['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'])),
    /**
     * The `onOrientationChange` callback is called when the orientation changes while the modal is being displayed.
     * The orientation provided is only 'portrait' or 'landscape'. This callback is also called on initial render, regardless of the current orientation.
     * @platform ios
     */
    onOrientationChange: func,
}

export default ModalPropTypes;
