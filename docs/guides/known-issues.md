# Known issues

## Missing modules and Views

This is an initial release of React Native for Web, therefore, not all of the
views present on iOS/Android are released on Web. We are very much interested in
the community's feedback on the next set of modules and views.

Not all the modules or views for iOS/Android can be implemented on Web. In some
cases it will be necessary to use a Web counterpart or to guard the use of a
module with `Platform.OS` (e.g. `NativeModules`)

## Missing component props

There are properties that do not work across all platforms. All web-specific
props are annotated with `(web)` in the documentation.

## Platform parity

There are some known issues in React Native where APIs could be made more
consistent between platforms. For example, React Native for Web includes
`ActivityIndicator` and a horizontal `ProgressBar` for Web use, in anticipation
of the convergence between the iOS and Android components in React Native.
